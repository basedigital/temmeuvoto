import React, {Component} from 'react';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './ModalInvite.scss';

import {ModalBarTop, Spacer} from "../../../components";
import {shareEmail, shareFacebook, shareTwitter, shareWhats} from "../../../utils/AppUtils";
import {trackEvent, trackPageview} from "../../../utils/GAUtil";

class ModalInvite extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        trackPageview('interna/sobre');
    }

    onFacebookClick = () => {
        trackEvent('fase3/convidar-amigos', 'click', 'botao_facebook');

        shareFacebook('https://temmeuvoto.com/share/invite');
    }

    onTwitterClick = () => {
        trackEvent('fase3/convidar-amigos', 'click', 'botao_twitter');

        const text = 'Olha aí a plataforma que vai ajudar você a escolher os candidatos que mais se alinham com o que você quer para o Brasil: www.temmeuvoto.com  Entre. Faça seu match. Compartilhe.';
        shareTwitter(text, 'https://temmeuvoto.com/');
    }

    onMessageClick = () => {
        trackEvent('fase3/convidar-amigos', 'click', 'botao_email');

        shareEmail('invite', 'https://temmeuvoto.com/', 'fase3/convidar-amigos');
    }

    render() {
        const {device} = this.props;

        const isMobileTablet = device.type === 'mobile' || device.type === 'tablet';

        return <div className={'ModalInvite ModalDefault'}>
            <ModalBarTop visible={true} onClose={this.props.onClose}>

                <Spacer vertical={10}/>

                <div className={'text-center size-28'}>Convidar Amigos</div>

                <Spacer vertical={4}/>

                <div className={'list'}>
                    <div className={'item'} onClick={this.onFacebookClick}>
                        <img src={require("./../../match/candidato/images/facebook.png")}/>
                        <span>Facebook</span>
                    </div>

                    <Spacer vertical={3}/>

                    <div className={'item'} onClick={this.onTwitterClick}>
                        <img src={require("./../../match/candidato/images/twitter.png")}/>
                        <span>Twitter</span>
                    </div>

                    <Spacer vertical={3}/>

                    {isMobileTablet &&
                    <a className={'item'} href={shareWhats('Olha aí a plataforma que vai ajudar você a escolher os candidatos que mais se alinham com o que você quer para o Brasil: https://temmeuvoto.com\n' +
                        'Acesse. Participe. Compartilhe. Porque o voto é o que temos de mais valioso.')}>
                        <img src={require("./../../match/candidato/images/phone.png")}/>
                        <span>Whatsapp</span>
                    </a>}

                    {isMobileTablet && <Spacer vertical={3}/>}

                    <div className={'item'} onClick={this.onMessageClick}>
                        <img src={require("./../../match/candidato/images/message.png")}/>
                        <span>Mensagens</span>
                    </div>
                </div>

                <Spacer vertical={4}/>
            </ModalBarTop>
        </div>
    }
}

export default connect({
    device: state`useragent.device`,
    media: state`useragent.media`,
}, ModalInvite);
