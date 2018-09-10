'use strict';

/**
 * Teampage.js controller
 *
 * @description: A set of functions called "actions" for managing `Teampage`.
 */

module.exports = {

  /**
   * Retrieve teampage records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.teampage.search(ctx.query);
    } else {
      return strapi.services.teampage.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a teampage record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.teampage.fetch(ctx.params);
  },

  /**
   * Count teampage records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.teampage.count(ctx.query);
  },

  /**
   * Create a/an teampage record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.teampage.add(ctx.request.body);
  },

  /**
   * Update a/an teampage record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.teampage.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an teampage record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.teampage.remove(ctx.params);
  }
};
