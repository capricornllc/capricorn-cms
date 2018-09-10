'use strict';

/**
 * Partnerpage.js controller
 *
 * @description: A set of functions called "actions" for managing `Partnerpage`.
 */

module.exports = {

  /**
   * Retrieve partnerpage records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.partnerpage.search(ctx.query);
    } else {
      return strapi.services.partnerpage.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a partnerpage record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.partnerpage.fetch(ctx.params);
  },

  /**
   * Count partnerpage records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.partnerpage.count(ctx.query);
  },

  /**
   * Create a/an partnerpage record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.partnerpage.add(ctx.request.body);
  },

  /**
   * Update a/an partnerpage record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.partnerpage.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an partnerpage record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.partnerpage.remove(ctx.params);
  }
};
