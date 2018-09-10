'use strict';

/**
 * Technicalpage.js controller
 *
 * @description: A set of functions called "actions" for managing `Technicalpage`.
 */

module.exports = {

  /**
   * Retrieve technicalpage records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.technicalpage.search(ctx.query);
    } else {
      return strapi.services.technicalpage.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a technicalpage record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.technicalpage.fetch(ctx.params);
  },

  /**
   * Count technicalpage records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.technicalpage.count(ctx.query);
  },

  /**
   * Create a/an technicalpage record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.technicalpage.add(ctx.request.body);
  },

  /**
   * Update a/an technicalpage record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.technicalpage.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an technicalpage record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.technicalpage.remove(ctx.params);
  }
};
