import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import './Check.scss';

class Check extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.any,

        checked: PropTypes.bool,

        type: PropTypes.string,
    }

    static defaultProps = {
        type: 'default',
        checked: false,
        checkText: false,
        small: false
    }

    render() {
        const {label, value, type, checked} = this.props;

        return <div className={cls('Check', 'type-' + type, {'is-selected': checked})}
                    onClick={this.props.onClick.bind(this, value, label)}>
            <div className="circle">
                <img src={require('./images/check.png')}/>
            </div>

            <div className={cls('label', 'size-17')}>{label}</div>
        </div>
    }
}

export default Check;
