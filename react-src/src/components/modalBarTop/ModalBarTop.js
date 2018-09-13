import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {BarTop} from '../';

import './ModalBarTop.scss';

class ModalBarTop extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func,

        noAddClass: PropTypes.bool,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        if (!this.props.noAddClass)
            document.body.classList.add('is-modal-top-open');
    }


    componentWillUnmount() {
        if (document.querySelectorAll('.ModalBarTop').length <= 1) {
            document.body.classList.remove('is-modal-top-open');
        }
    }

    render() {
        const {visible, onClose} = this.props;

        if (!visible)
            return null;

        return <div className="ModalBarTop">
            <BarTop onClick={onClose}/>

            <div className={'container'}>
                {this.props.children}
            </div>
        </div>
    }
}

export default ModalBarTop;
