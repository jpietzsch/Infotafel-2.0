'use strict';

/**
 * stundenplan service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stundenplan.stundenplan');
