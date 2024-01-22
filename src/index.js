const express = require("express");
const amqplib = require("amqplib");

const { ServerConfig, MAILER } = require("./config");
const { EmailService } = require("./services");
const apiRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("noti-queue"); // this ensures that if there is no channel with noti-queue it will create
    channel.consume("noti-queue", async (data) => {
      //console.log("consumed data is ", Buffer.from(data.content));
      // console.log("type of data", typeof Buffer.from(data.content));
      const object = JSON.parse(`${Buffer.from(data.content)}`);
      console.log("object is ", object);
      await EmailService.sendEmail({
        mailFrom: "prasanthyadav549@gmail.com",
        mailTo: object.recipientEmail,
        subject: object.subject,
        text: object.text,
      });
      channel.ack(data);
    });
  } catch (error) {
    console.log("error while consuming", error);
    throw error;
  }
}
app.listen(ServerConfig.PORT, async () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  connectQueue();
  console.log("Queue connected");
});
