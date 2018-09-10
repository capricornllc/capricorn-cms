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
    return strapi.services.teampage.fetchAll(ctx.query);
  },

  /**
   * Retrieve a teampage record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

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
