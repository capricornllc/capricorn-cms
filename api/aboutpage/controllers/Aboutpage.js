'use strict';

/**
 * Aboutpage.js controller
 *
 * @description: A set of functions called "actions" for managing `Aboutpage`.
 */

module.exports = {

  /**
   * Retrieve aboutpage records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.aboutpage.fetchAll(ctx.query);
  },

  /**
   * Retrieve a aboutpage record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.aboutpage.fetch(ctx.params);
  },

  /**
   * Count aboutpage records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.aboutpage.count(ctx.query);
  },

  /**
   * Create a/an aboutpage record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.aboutpage.add(ctx.request.body);
  },

  /**
   * Update a/an aboutpage record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.aboutpage.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an aboutpage record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.aboutpage.remove(ctx.params);
  }
};
