import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './Transparencia.scss';

import {Button, Spacer} from "../../../components";

import HeaderMatch from '../headerMatch/HeaderMatch';

import {trackEvent, trackPageview} from "../../../utils/GAUtil";
import computeState from "../../../modules/compute/computeState";

class Transparencia extends Component {
    static propTypes = {
        state: PropTypes.any,
        requestMatch: PropTypes.any,
    }

    componentDidMount() {
        trackPageview(`/match/${this.props.state.uf}/?passo=7`);
    }

    onNextClick = () => {
        trackEvent('fase3/pesquisa', 'form_submit', 'pesquisa/finalizada');

        const {processo, renovacao, economia, costume, prioridade1, prioridade2} = this.props.form;

        let resposta1 = '';
        let resposta2 = '';
        let resposta3 = '';
        let resposta4 = '';
        let resposta5 = '';
        let resposta6 = '';

        if (window['dataLayer']) {
            window['dataLayer'].push({
                'final_resposta1': resposta1,
                'final_resposta2': resposta2,
                'final_resposta3': resposta3,
                'final_resposta4': resposta4,
                'final_resposta5': resposta5,
                'final_resposta6': resposta6,
                'event': 'finalizou-pesquisa'
            })
        }

        this.props.signalGoStep({step:'/lista-candidatos'});
    }

    onBackClick = () => {
        this.props.signalGoStep({step:'/prioridade2'});
    }

    render() {
        return <div className="Transparencia">
            <HeaderMatch step={null} onBackClick={this.onBackClick}/>

            <div className={'content-home'}>
                <div className={'lnh-150 size-17'}>
                    <p>O #TEMMEUVOTO está comprometido com a transparência dos dados que utiliza em sua plataforma. Devido ao grande volume de dados e à dificuldade de integração e automatização do Judiciário brasileiro, as informações referentes a processos e condenações dos candidatos podem conter uma margem de erro.</p>
                    <p>Caso encontre alguma informação errada no perfil de um candidato(a), reporte o erro pelo e-mail contato@temmeuvoto.com</p>
                    <p>Temos uma equipe de advogados dedicada a apurar e confirmar as informações, mas a ajuda de toda a sociedade é fundamental nesse esforço. Assim, conseguiremos promover o acesso à informação de qualidade para você escolher o que tem de mais valioso: o voto.</p>
                </div>
            </div>

            <Button title={'AVANÇAR'} onClick={this.onNextClick}/>

            <Spacer vertical={2}/>
        </div>
    }
}

export default connect({
    state: computeState,

    form:state`candidato.form`,
    config:state`app.config`,

    signalGoStep: signal`candidato.goStep`,
}, Transparencia);
