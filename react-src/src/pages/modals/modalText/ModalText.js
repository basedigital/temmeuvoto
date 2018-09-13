import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './ModalText.scss';

import {ModalBarTop, Spacer, Scrollbar} from "../../../components";

class ModalText extends Component {
    static propTypes = {
        title: PropTypes.string,
        text: PropTypes.string,
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {title, text, onClose} = this.props;

        return <div className={'ModalText'}>
            <ModalBarTop visible={true} onClose={this.props.onClose}>

                <div className={'modaltext-title size-28'}>{title}</div>

                <Scrollbar>
                    <div className={'content-scrollbar size-15 color-gray78'}
                         dangerouslySetInnerHTML={{__html: text}}></div>
                </Scrollbar>

                <Spacer vertical={4}/>
            </ModalBarTop>
        </div>
    }
}

export default connect({
    media: state`useragent.media`,
}, ModalText);
