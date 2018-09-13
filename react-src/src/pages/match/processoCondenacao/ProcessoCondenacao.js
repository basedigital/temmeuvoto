import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './ProcessoCondenacao.scss';

import {Button, Checks, Spacer, Scrollbar, ComponentConnect, computeState} from "../../../components";

import HeaderMatch from '../headerMatch/HeaderMatch';
import ContentMatch from '../contentMatch/ContentMatch';
import {trackPageview} from "../../../utils/GAUtil";

class ProcessoCondenacao extends Component {
    static propTypes = {
        onBackClick: PropTypes.func,
        onNextClick: PropTypes.func,
        onOpenModal: PropTypes.func,
        requestMatch: PropTypes.any,
    }

    componentDidMount() {
        trackPageview(`/match/${this.props.state.uf}/?passo=1`);
    }

    onHelpClick = () => {
        this.props.signalOpenModal({modal: 'processo-condenacao'});
    }

    onNextClick = () => {
        this.props.signalGoStep({step: '/renovacao'});
    }

    onBackClick = () => {
        this.props.signalSetField({path: 'candidato.form.processo', value: ''});
        this.props.signalGoStep({step: '/'});
    }

    render() {
        const {form, requestMatch: {loading}} = this.props;

        const {processo} = form;

        return <div className="ProcessoCondenacao DefaultMatch">
            <HeaderMatch step={1} onBackClick={this.onBackClick} onHelpClick={this.onHelpClick}/>

            <Spacer vertical={1}/>

            <ContentMatch title={'Em relação a processos e condenações:'}
                          text={'Escolha apenas 1 opção'} onHelpClick={this.onHelpClick}>
                <Scrollbar>
                    <ComponentConnect path="candidato.form.processo">
                        <Checks track={'pergunta1'} data={[
                            {label: 'Seu candidato não pode responder a nenhum processo judicial', value: 1},
                            {label: 'Não pode haver decisão contrária ao seu candidato em nenhum processo judicial', value: 2},
                            {label: 'Não me importo com isso', value: 3}
                        ]} shuffle={true} scrollToBottom={true}/>
                    </ComponentConnect>
                </Scrollbar>

                <Spacer vertical={3}/>

                <Button title={'AVANÇAR'} disabled={!processo.isValid} loading={loading}
                        onClick={this.onNextClick}/>
            </ContentMatch>
        </div>
    }
}

export default connect({
    form: form(state`candidato.form`),

    state: computeState,
    signalGoStep: signal`candidato.goStep`,
    requestMatch: state`candidato.requestMatch`,
    signalOpenModal: signal`app.openModal`,

    signalSetField: signal`form.setField`,
}, ProcessoCondenacao);
