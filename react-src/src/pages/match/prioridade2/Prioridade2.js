import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './Prioridade2.scss';

import {Button, Checks, Spacer, Scrollbar, ComponentConnect, computeState} from "../../../components";

import HeaderMatch from '../headerMatch/HeaderMatch';
import ContentMatch from '../contentMatch/ContentMatch';
import {trackPageview} from "../../../utils/GAUtil";

class Prioridade2 extends Component {
    static propTypes = {
        onBackClick: PropTypes.func,
        onNextClick: PropTypes.func,
        onOpenModal: PropTypes.func,
        requestMatch: PropTypes.any,
    }

    componentDidMount() {
        trackPageview(`/match/${this.props.state.uf}/?passo=6`);
    }

    onHelpClick = () => {
        this.props.signalOpenModal({modal:'prioridade'});
    }

    onNextClick = () => {
        this.props.signalGoStep({step:'/transparencia'});
        // this.props.signalGoStep({step:'/lista-candidatos'});
    }

    onBackClick = () => {
        this.props.signalSetField({path:'candidato.form.prioridade2', value:''});
        this.props.signalGoStep({step:'/prioridade1'});
    }

    getData = () => {
        const {list} = this.props;

        return list.map((v) => {
            return {label: v.nome, value: v.id}
        });
    }

    render() {
        const {form, requestMatch: {loading}} = this.props;

        const {prioridade2} = form;

        return <div className="Prioridade2 DefaultMatch">
            <HeaderMatch step={6} onBackClick={this.onBackClick} onHelpClick={this.onHelpClick}/>

            <Spacer vertical={1}/>

            <ContentMatch title={'Dos temas abaixo, selecione sua segunda prioridade para o Brasil nos próximos 4 anos:'}
                          text={'Escolha apenas 1 opção'} onHelpClick={this.onHelpClick}>
                <Spacer/>

                <Scrollbar>
                    <ComponentConnect path="candidato.form.prioridade2">
                        <Checks track={'pergunta6'} data={this.getData()} shuffle={true} type={'prioridade'} scrollToBottom={true}></Checks>
                    </ComponentConnect>
                </Scrollbar>

                <Spacer vertical={2}/>

                <Button title={'AVANÇAR'} disabled={!prioridade2.isValid} loading={loading}
                        onClick={this.onNextClick}/>
            </ContentMatch>
        </div>
    }
}

export default connect({
    list: state`app.config.prioridade2`,
    form: form(state`candidato.form`),

    state: computeState,
    signalGoStep: signal`candidato.goStep`,
    requestMatch: state`candidato.requestMatch`,
    signalOpenModal: signal`app.openModal`,

    signalSetField: signal`form.setField`,
}, Prioridade2);
