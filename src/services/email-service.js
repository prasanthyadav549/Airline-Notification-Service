const { TicketRepository } = require("../repositories");
const { MAILER } = require("../config");
const { Enums } = require("../utils/common");

const ticketRepository = new TicketRepository();
const { PENDING } = Enums.BOOKING_STATUS;
async function sendEmail(data) {
  try {
    const response = await MAILER.sendMail({
      from: data.mailFrom,
      to: data.mailTo,
      subject: data.subject,
      text: data.text,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createTicket(data) {
  try {
    const response = await ticketRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getPendingEmails() {
  try {
    const response = await ticketRepository.getPendingTickets(PENDING);
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTicket,
  getPendingEmails,
  sendEmail,
};
