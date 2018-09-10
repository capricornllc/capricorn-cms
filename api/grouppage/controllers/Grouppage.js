'use strict';

/**
 * Grouppage.js controller
 *
 * @description: A set of functions called "actions" for managing `Grouppage`.
 */

module.exports = {

  /**
   * Retrieve grouppage records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.grouppage.search(ctx.query);
    } else {
      return strapi.services.grouppage.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a grouppage record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.grouppage.fetch(ctx.params);
  },

  /**
   * Count grouppage records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.grouppage.count(ctx.query);
  },

  /**
   * Create a/an grouppage record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.grouppage.add(ctx.request.body);
  },

  /**
   * Update a/an grouppage record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.grouppage.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an grouppage record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.grouppage.remove(ctx.params);
  }
};
