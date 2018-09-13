import React, {Component} from 'react';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './FormCad.scss';

import {
    Button,
    Spacer,
    ComponentConnect,
    TextInput,
    Select
} from "../../../components";
import {trackEvent} from "../../../utils/GAUtil";


class FormCad extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            window.scrollTo(0, 2000);
        });
    }

    onSendClick = () => {
        trackEvent('fase3/candidatos', 'form_submit', 'cadastrar/form/sucesso');

        this.props.signalSendCadastro();
    }

    onEmailChange = () => {
        if (!this.trackingEmail) {
            this.trackingEmail = true;
            trackEvent('fase3/candidatos', 'form_filled', 'cadastrar/campo_email');
        }
    }

    onSelectChange = (evt) => {
        if (!evt.target.value)
            return;

        const label = this.props.onde.filter((v) => v.id == evt.target.value)[0].name;

        trackEvent('fase3/candidatos', 'form_filled', 'cadastrar/onde_conheceu/'+label.toLowerCase().replace(/ /g, ""));
    }

    render() {
        const {formCad, requestSendCadastro} = this.props;

        return <div className={'FormCad'}>
            <div className={'box'}>
                <div>
                    <div className={'size-24 medium t3'}>CADASTRAR</div>
                    <Spacer/>
                    <div className={'size-18 light t4'}>Ao término das eleições, todas as informações
                        coletadas aqui serão divulgadas
                        para que a sociedade possa acessar, avaliar, conhecer, refletir e aprender.
                        Quer receber notícias e novidades sobre o #TemMeuVoto? Preencha seu e-mail aqui:
                    </div>
                </div>
            </div>

            <Spacer vertical={2}/>

            <div className={'form'}>
                <ComponentConnect path={'candidato.formCad.email'}>
                    <TextInput placeholder={'E-mail'} onChange={this.onEmailChange}/>
                </ComponentConnect>

                <Spacer vertical={2}/>

                <ComponentConnect path={'candidato.formCad.where'}>
                    <Select data={this.props.onde} placeholder={'Onde conheceu o #TEMMEUVOTO'} onChange={this.onSelectChange}/>
                </ComponentConnect>

                <Spacer vertical={2}/>

                <div className={'text-center'}>
                    <Button title={'ENVIAR'} disabled={!formCad.isValid} onClick={this.onSendClick}/>
                </div>
            </div>
        </div>
    }
}

export default connect({
    onde: state`app.config.onde`,

    signalSendCadastro: signal`candidato.sendCadastro`,
    requestSendCadastro: state`candidato.requestSendCadastro`,
    formCad: form(state`candidato.formCad`),
}, FormCad);
