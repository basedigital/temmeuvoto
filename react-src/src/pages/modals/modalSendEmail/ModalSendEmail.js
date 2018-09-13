import React, {Component} from 'react';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './ModalSendEmail.scss';

import {Button, ComponentConnect, ModalBarTop, Spacer, TextArea, TextInput} from "../../../components";
import {trackEvent} from "../../../utils/GAUtil";

class ModalSendEmail extends Component {
    constructor(props) {
        super(props);
    }

    onSendPress = () => {
        const {template, url, track} = this.props.modalData;

        trackEvent(track, 'form_submit', 'compartilhe/email/form/sucesso');

        this.props.signalSendInvite({template, url})
    }


    onEmailChange = () => {
        const {track} = this.props.modalData;

        if (!this.trackingEmail) {
            this.trackingEmail = true;
            trackEvent(track, 'form_filled', 'compartilhe/email/campo_email');
        }
    }

    render() {
        /*
            invite
            candidatos
            candidato
        */

        const {form} = this.props;

        return <div className={'ModalSendEmail ModalDefault'}>
            <ModalBarTop visible={true} onClose={this.props.onClose}>

                <Spacer vertical={10}/>

                <div className={'text-center size-28'}>Enviar Email</div>

                <Spacer vertical={4}/>

                <div className={'list'}>
                    <ComponentConnect path={'invite.formEmail.email'}>
                        <TextInput placeholder={'E-mail'} onChange={this.onEmailChange}/>
                    </ComponentConnect>

                    <Spacer vertical={2}/>

                    <div className={'text-center'}>
                        <Button title={'ENVIAR'} disabled={!form.isValid} onClick={this.onSendPress}/>
                    </div>
                </div>

                <Spacer vertical={4}/>
            </ModalBarTop>
        </div>
    }
}

export default connect({
    modalData: state`app.modalData`,

    signalSendInvite: signal`invite.sendInvite`,

    form: form(state`invite.formEmail`),

    media: state`useragent.media`,
}, ModalSendEmail);
