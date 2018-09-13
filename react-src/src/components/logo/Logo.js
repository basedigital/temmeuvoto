import React, {Component} from 'react';

import PropTypes from 'prop-types';

import './Logo.scss';

class Logo extends React.PureComponent {
    static propTypes = {
        theme:PropTypes.string,
    }

    static defaultProps = {
        theme:'default',
    }

    render() {
        const {theme} = this.props;

        return <div className='Logo'>
            {theme === 'default' && <img src={require("./images/logo.png")}/>}

            {theme === 'dark' && <img src={require("./images/logo-dark.png")}/>}
        </div>;
    }
}

export default Logo;
