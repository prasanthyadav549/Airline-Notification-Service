const CrudRepository = require("./crud-repository");
const { Ticket } = require("../models");

class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }

  async getPendingTickets(status) {
    const response = await Ticket.findAll({
      where: {
        status: status,
      },
    });
    return response;
  }
}

module.exports = TicketRepository;
