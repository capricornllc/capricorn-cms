'use strict';

/**
 * Homepage.js controller
 *
 * @description: A set of functions called "actions" for managing `Homepage`.
 */

module.exports = {

  /**
   * Retrieve homepage records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.homepage.search(ctx.query);
    } else {
      return strapi.services.homepage.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a homepage record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.homepage.fetch(ctx.params);
  },

  /**
   * Count homepage records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.homepage.count(ctx.query);
  },

  /**
   * Create a/an homepage record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.homepage.add(ctx.request.body);
  },

  /**
   * Update a/an homepage record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.homepage.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an homepage record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.homepage.remove(ctx.params);
  }
};
