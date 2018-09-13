import React from 'react';

import ModalText from './../modalText/ModalText';

import {trackPageview} from "../../../utils/GAUtil";

class ModalComoFunciona extends React.PureComponent {
    componentDidMount() {
        trackPageview('interna/como-funciona');
    }

    render() {
        const text = `
            <p>Aqui você encontra uma série de informações sobre os candidatos a deputados estaduais, deputados federais e senadores.</p>

            <p>Você responde 7 perguntas sobre o que você quer para o Brasil. A cada resposta, uma seleção dos candidatos alinhados com o que você acredita aparecerá na tela. Quando chegar em 10 candidatos finalistas, o sistema disponibilizará informações indispensáveis sobre cada um: partido, mini biografia, sites oficiais, processos e condenações (quando houver), prioridades, posição ideológica, entre outras.</p>

            <p>Caberá a você se informar, refletir e decidir quem estará à frente do Brasil nos próximos anos.</p>
        
            <p>Para facilitar, também inserimos na plataforma os dados de candidatos a Presidente e Governador, porém eles não fazem match.</p>        
        `;

        return <ModalText {...this.props} title={'Como Funciona'} text={text}/>
    }
}

export default ModalComoFunciona;
