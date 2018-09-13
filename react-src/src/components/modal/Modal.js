import React from 'react';

import cls from 'classnames';
import PropTypes from 'prop-types';

import './Modal.scss';

export default class Modal extends React.Component {
    modal;
    fakeModal;

    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        className: PropTypes.string,
    }

    static defaultProps = {
        visible: false
    };

    constructor(props) {
        super(props);

        this.state = {visible: props.visible};
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.visible && !nextProps.visible) {
            this.close();
        }

        //adicionado nesse formato por causa da animação de entrada/saida
        if (!this.props.visible && nextProps.visible) {
            this.setState({visible: true});
        }
    }

    componentWillUnmount() {
        this.close();
    }

    open = () => {
        let container = document.getElementById('container-modal');
        container.appendChild(this.modal);

        document.body.classList.add('is-modal-open');

        //delay animação de entrada -> next tick
        requestAnimationFrame(() => {
            this.modal.classList.add('is-visible');
        });
    };

    close = () => {
        if (this.timeout)
            clearInterval(this.timeout);

        if (document.querySelectorAll('.Modal').length === 1) {
            document.body.classList.remove('is-modal-open');
        }

        if (this.modal && this.fakeModal) {
            this.modal.classList.remove('is-visible');

            this.timeout = setTimeout(() => {
                this.fakeModal.appendChild(this.modal);
                this.setState({visible: false});
            }, 500);
        }
    };

    onKeyDown = (e) => {
        if (e.keyCode === 27) {
            e.preventDefault();
            e.stopPropagation();

            this.onClose();
        }
    }

    onClose = () => {
        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    setRef = (elem) => {
        this.modal = elem;

        if (elem)
            this.open();
    };

    setRefFake = (elem) => {
        this.fakeModal = elem;
    };

    render() {
        if (!this.state.visible) {
            return null;
        }

        return (
            <span className="fake-modal" ref={this.setRefFake}>
                <div className={cls('Modal', this.props.className)} ref={this.setRef} onKeyDown={this.onKeyDown}>
                    <div className="bg-modal" onClick={this.onClose}/>

                    <div className="content-modal">
                        {this.props.children}
                    </div>
                </div>
            </span>
        );
    }
}