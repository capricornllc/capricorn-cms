/*
*
* LeftMenu
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LeftMenuHeader from '../../components/LeftMenuHeader';
import LeftMenuLinkContainer from '../../components/LeftMenuLinkContainer';
import LeftMenuFooter from '../../components/LeftMenuFooter';

import styles from './styles.scss';

class LeftMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			deploying: false
		};
	}

	render() {
		return (
			<div className={styles.leftMenu}>
				<LeftMenuHeader />
				<LeftMenuLinkContainer {...this.props} />
				<button className={styles.deploy} onClick={this._handleTriggerDeploy}>
					{this.state.deploying ? (
						<div className={styles.loader} disabled={this.state.deploying}>
							<div className={styles.bar} />
						</div>
					) : (
						'Publish Website'
					)}
				</button>
				{/* <LeftMenuFooter plugins={props.plugins} version={props.version} /> */}
			</div>
		);
  }
  
  _handleTriggerDeploy = (event) => { 

    this.setState({deploying:true});
    
    setTimeout(
      function() {
        this.setState({deploying: false});
        alert('Successful deployment!');
      }
      .bind(this),
      122500
  );

    event.preventDefault();
    fetch('https://api.netlify.com/build_hooks/5b96bae6c96592797266cffb', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
    });
  };
}

LeftMenu.defaultProps = {
	version: '3'
};

LeftMenu.propTypes = {
	plugins: PropTypes.object.isRequired,
	version: PropTypes.string
};

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

export default connect(mapDispatchToProps)(LeftMenu);
