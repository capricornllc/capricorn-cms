'use strict';

/**
 * Goalsandvalue.js controller
 *
 * @description: A set of functions called "actions" for managing `Goalsandvalue`.
 */

module.exports = {

  /**
   * Retrieve goalsandvalue records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.goalsandvalue.search(ctx.query);
    } else {
      return strapi.services.goalsandvalue.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a goalsandvalue record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.goalsandvalue.fetch(ctx.params);
  },

  /**
   * Count goalsandvalue records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.goalsandvalue.count(ctx.query);
  },

  /**
   * Create a/an goalsandvalue record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.goalsandvalue.add(ctx.request.body);
  },

  /**
   * Update a/an goalsandvalue record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.goalsandvalue.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an goalsandvalue record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.goalsandvalue.remove(ctx.params);
  }
};
