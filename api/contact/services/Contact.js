'use strict';

/**
 * Contact.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all contacts.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('contact', params);
    // Select field to populate.
    const populate = Contact.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Contact
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an contact.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Contact.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Contact
      .findOne(_.pick(params, _.keys(Contact.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count contacts.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('contact', params);

    return Contact
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an contact.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Contact.associations.map(ast => ast.alias));
    const data = _.omit(values, Contact.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Contact.create(data);

    // Create relational data and return the entry.
    return Contact.updateRelations({ id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an contact.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Contact.associations.map(a => a.alias));
    const data = _.omit(values, Contact.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Contact.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Contact.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an contact.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Contact.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Contact
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Contact.associations.map(async association => {
        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  }
};
