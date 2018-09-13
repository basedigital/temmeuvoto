import React, {Component} from 'react';
import cls from 'classnames';

import PropTypes from 'prop-types';

import './ButtonArrow.scss';

class ButtonArrow extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string,
        onClick: PropTypes.func,

        left: PropTypes.bool,
    }

    static defaultProps = {
        left: false
    }

    render() {
        const {title, onClick, left} = this.props;

        return <div className={cls('ButtonArrow')} onClick={onClick}>
            {left && <img src={require("./images/arrow-left.png")}/>}

            <span className={'size-14'}>{title}</span>

            {!left && <img src={require("./images/arrow-right.png")}/>}
        </div>;
    }
}

export default ButtonArrow;
