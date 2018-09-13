import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import './Loading.scss';

class Loading extends React.PureComponent {

    static propTypes = {
        small: PropTypes.bool,
    }

    render() {
        const {small} = this.props;

        return <div className={cls("Loading", {"is-small": this.props.small})}>
            <div className="loading"></div>
        </div>;
    }
}

export default Loading;
