"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common");
const { BOOKED, INITIATED, CANCELLED, PENDING } = Enums.BOOKING_STATUS;
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipientEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM({
          values: [BOOKED, CANCELLED, INITIATED, PENDING],
        }),
        allowNull: false,
        defaultValue: PENDING,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
