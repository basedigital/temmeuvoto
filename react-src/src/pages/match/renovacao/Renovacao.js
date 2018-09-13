import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './Renovacao.scss';

import {Button, Checks, Spacer, Scrollbar, ComponentConnect, computeState} from "../../../components";

import HeaderMatch from '../headerMatch/HeaderMatch';
import ContentMatch from '../contentMatch/ContentMatch';
import {trackPageview} from "../../../utils/GAUtil";

class Renovacao extends Component {
    static propTypes = {
        onBackClick: PropTypes.func,
        onNextClick: PropTypes.func,
        onOpenModal: PropTypes.func,
        requestMatch: PropTypes.any,
    }

    componentDidMount() {
        trackPageview(`/match/${this.props.state.uf}/?passo=2`);
    }

    onHelpClick = () => {
        this.props.signalOpenModal({modal:'renovacao'});
    }

    onNextClick = () => {
        this.props.signalGoStep({step:'/economia'});
    }

    onBackClick = () => {
        this.props.signalSetField({path:'candidato.form.renovacao', value:''});
        this.props.signalGoStep({step:'/processo'});
    }


    render() {
        const {form, requestMatch: {loading}} = this.props;

        const {renovacao} = form;

        return <div className="Renovacao DefaultMatch">
            <HeaderMatch step={2} onBackClick={this.onBackClick} onHelpClick={this.onHelpClick}/>

            <Spacer vertical={1}/>

            <ContentMatch title={'Você quer votar em alguém que já foi eleito para algum cargo público no passado?'}
                          text={'Escolha apenas 1 opção'} onHelpClick={this.onHelpClick}>
                <Scrollbar>
                    <ComponentConnect path="candidato.form.renovacao">
                        <Checks track={'pergunta2'} data={[
                            {label: 'Não', value: 1},
                            {label: 'Sim', value: 2},
                            {label: 'Não me importo com isso', value: 3}
                        ]} shuffle={true} scrollToBottom={true}/>
                    </ComponentConnect>
                </Scrollbar>

                <Spacer vertical={2}/>

                <Button title={'AVANÇAR'} disabled={!renovacao.isValid} loading={loading}
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
}, Renovacao);
