import React, { Component } from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import './Icon.scss';

class Icon extends React.PureComponent {
    static icons = {
        help:require("./images/help.png"),
        close:require("./images/close.png"),
        logout:require("./images/logout.png"),
        arrowSmallNext:require("./images/arrow-small-next.png"),
        menu:require("./images/menu.png")
    }

    static propTypes = {
        icon:PropTypes.string
    }

    render() {
        const { icon } = this.props;

        return <div className={cls('Icon')}>
            <img src={icon}/>
        </div>
    }
}

export default Icon;
