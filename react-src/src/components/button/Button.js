import React, { Component } from 'react';
import cls from 'classnames';

import PropTypes from 'prop-types';

import './Button.scss';

class Button extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string,
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        className: PropTypes.string,

        disabled: PropTypes.bool,

        theme: PropTypes.oneOf(['dark', 'dark-border', 'voto']),
    }

    static defaultProps = {
        className: '',
        theme: 'dark'
    }

    onClick = () => {
        const { loading } = this.props;

        if (!loading) {
            this.props.onClick();
        }
    }

    render() {
        const { title, loading, className, theme, disabled, small} = this.props;

        return <div className={cls('Button', 'theme-' + theme, { 'is-loading': loading }, { 'is-disabled': disabled }, className)} onClick={this.onClick}>
            <span className={'size-12'}>{title}</span>

            {loading && <div className="loadingContent">
                <div className="loading" />
            </div>}
        </div>;
    }
}

export default Button;
