/**
 *
 * LeftMenuLinkContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { findIndex, get, snakeCase, isEmpty, map, sortBy } from 'lodash';

import cn from 'classnames';

import LeftMenuLink from '../LeftMenuLink';

import styles from './styles.scss';
import messages from './messages.json';

const labelTypes = {
	Aboutpages: {
    label: 'About Page',
    destination: '/plugins/content-manager/aboutpage/5c7ea4dee823a60017e14143',
  },
	Contacts: {
    label: 'Contacts',
    destination: null,
  },
	Generalsettings: {
    label: 'General Settings',
    destination: '/plugins/content-manager/generalsettings/5c7ea5c7e823a60017e14146',
  },
	Goalsandvalues: {
    label: 'Goals and Values',
    destination: null,
  },
	Grouppages: {
    label: 'Group Page',
    destination: '/plugins/content-manager/grouppage/5c7ea6a8e823a60017e14159',
  },
	Homepages: {
    label: 'Home Page',
    destination: '/plugins/content-manager/homepage/5c7ea76ce823a60017e14160',
  },
	Partnerpages: {
    label: 'Partners Page',
    destination: '/plugins/content-manager/partnerpage/5c7ea93ce823a60017e1416c',
  },
	Partners: {
    label: 'Partners',
    destination: null,
  },
	Teammembers: {
    label: 'Team Members',
    destination: null,
  },
	Teampages: {
    label: 'Team Page',
    destination: '/plugins/content-manager/teampage/5c7ea7b4e823a60017e14166?redirectUrl=/plugins/content-manager/teampage',
  },
	Technicalpages: {
    label: 'Technical Page',
    destination: '/plugins/content-manager/technicalpage/5c7ea79fe823a60017e14165?redirectUrl=/plugins/content-manager/technicalpage',
  },
	Users: {
    label: 'Users',
    destination: null,
  },
};

function LeftMenuLinkContainer({ layout, plugins }) {
	const isDev = Boolean(window.location.search.split('dev=')[1]);
  const pluginsObject = plugins.toJS();
  
  // Generate the list of sections
  const pluginsSections = Object.keys(pluginsObject).reduce((acc, current) => {
    pluginsObject[current].leftMenuSections.forEach((section = {}) => {
      if (!isEmpty(section.links)) {
        acc[snakeCase(section.name)] = {
          name: section.name,
          links: get(acc[snakeCase(section.name)], 'links', []).concat(
            section.links.map(link => {
              link.source = current;
              link.plugin = !isEmpty(pluginsObject[link.plugin])
                ? link.plugin
                : pluginsObject[current].id;

              return link;
            }),
          ),
        };
      }
    });

    return acc;
  }, {});
  
  const linkSections = Object.keys(pluginsSections).map((current, j) => {
    const contentTypesToShow = get(layout, 'contentTypesToShow');
    const contentTypes = contentTypesToShow
      ? pluginsSections[current].links.filter(
        obj => findIndex(contentTypesToShow, ['destination', obj.destination]) !== -1,
      )
      : pluginsSections[current].links;

    return (
      <div key={j}>
        <p className={styles.title}>{pluginsSections[current].name}</p>
        <ul className={styles.list}>
          {sortBy(contentTypes, 'label').map((link, i) => (
            <LeftMenuLink
              key={`${i}-${link.label}`}
              icon={link.icon || 'caret-right'}
							label={labelTypes[link.label].label}
              destination={ labelTypes[link.label].destination || `/plugins/${link.plugin}/${link.destination}` }
              source={link.source}
            />
          )).slice(0, -1)}
        </ul>
      </div>
    );
  });

  // Check if the plugins list is empty or not and display plugins by name
  const pluginsLinks = !isEmpty(pluginsObject) ? (
    map(sortBy(pluginsObject, 'name'), plugin => {
      if (plugin.id !== 'email' && plugin.id !== 'settings-manager') {
        const basePath = `/plugins/${get(plugin, 'id')}`;
        // NOTE: this should be dynamic
        const destination = plugin.id === 'content-manager' ? `${basePath}/ctm-configurations` : basePath;

        return (
          <LeftMenuLink
            key={get(plugin, 'id')}
            icon={get(plugin, 'icon') || 'plug'}
            label={get(plugin, 'name')}
            destination={destination}
          />
        );
      }
    })
  ) : (
    <li className={styles.noPluginsInstalled}>
      <FormattedMessage {...messages.noPluginsInstalled} />.
    </li>
  );

  const hasSettingsManager = get(pluginsObject, 'settings-manager', null);

  return (
    <div className={cn(styles.leftMenuLinkContainer, isDev && styles.dev)}>
      {linkSections}
      {isDev &&
      (<div>
			  <div>
          <p className={styles.title}>
            <FormattedMessage {...messages.plugins} />
          </p>
          <ul className={styles.list}>{pluginsLinks}</ul>
        </div>
        <div>
          <p className={styles.title}>
          <FormattedMessage {...messages.general} />
        </p>
          <ul className={styles.list}>
          <LeftMenuLink icon="list" label={messages.listPlugins.id} destination="/list-plugins" />
          <LeftMenuLink
            icon="shopping-basket"
            label={messages.installNewPlugin.id}
            destination="/marketplace"
          />
          {hasSettingsManager && (
            <LeftMenuLink
              icon="gear"
              label={messages.configuration.id}
              destination="/plugins/settings-manager"
            />
          )}
        </ul>
			  </div>
      </div>)}
    </div>
  );
}

LeftMenuLinkContainer.defaultProps = {
  layout: {},
};

LeftMenuLinkContainer.propTypes = {
  layout: PropTypes.object,
  plugins: PropTypes.object.isRequired,
};

export default LeftMenuLinkContainer;
