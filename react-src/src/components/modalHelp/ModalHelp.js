import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Modal, Icon, Spacer } from '../';

import './ModalHelp.scss';

class ModalHelp extends React.PureComponent {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func,

        title: PropTypes.string,
        text: PropTypes.string,
    }

    render() {
        const { visible, onClose, title, text } = this.props;

        return <Modal className="WrapModalHelp" visible={visible} onClose={onClose}>
            <div className="ModalHelp">
                <div className="btn-close" onClick={onClose}>
                    <Icon icon={Icon.icons.close} />
                </div>

                <div className="size-36 color-white medium">{title}</div>

                <Spacer vertical={4}/>

                <div className="size-32 color-white medium text" dangerouslySetInnerHTML={{__html:text}}></div>
            </div>
        </Modal>
    }
}

export default ModalHelp;
