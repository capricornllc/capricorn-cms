'use strict';

/**
 * Generalsettings.js controller
 *
 * @description: A set of functions called "actions" for managing `Generalsettings`.
 */

module.exports = {

  /**
   * Retrieve generalsettings records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.generalsettings.fetchAll(ctx.query);
  },

  /**
   * Retrieve a generalsettings record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.generalsettings.fetch(ctx.params);
  },

  /**
   * Count generalsettings records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.generalsettings.count(ctx.query);
  },

  /**
   * Create a/an generalsettings record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.generalsettings.add(ctx.request.body);
  },

  /**
   * Update a/an generalsettings record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.generalsettings.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an generalsettings record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.generalsettings.remove(ctx.params);
  }
};
