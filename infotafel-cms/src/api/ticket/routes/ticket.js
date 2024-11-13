'use strict';

/**
 * ticket router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
  routes: [
    // Default routes (you can keep them if you want)
    ...createCoreRouter('api::ticket.ticket').routes,

    // Custom route for creating a ticket
    {
      method: 'POST',
      path: '/tickets', // Your custom endpoint for creating tickets
      handler: 'ticket.createTicket', // This will map to your custom controller action
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
