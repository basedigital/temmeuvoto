import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalProcessoCondenacao extends React.PureComponent {

    componentDidMount() {
        trackPageview('ajuda/processo-e-condenacao');
    }

    render() {
        const text = `
            <p>Compartilhamos aqui a base de dados do Detector de Ficha de Políticos, aplicativo realizado pelo Instituto ReclameAqui que consolida informações oficiais pulverizadas em diversas instâncias de tribunais como STF, STJ, TJs e TRFs.</p>

            <p>São considerados aqui os seguintes processos, desde que ativos e que o candidato relacionado esteja sendo investigado:</p>
           
            <p>a) Ações de improbidade administrativa;</p>
            <p>b) Ações penais que versem sobre crimes como os de corrupção, peculato, lavagem de dinheiro, formação de quadrilha, entre outros;</p>
            <p>c) Inquéritos relacionados a esses temas;</p>
            
            <p>Não foram incluídos os crimes contra a honra.</p>
            
            <p>Processos sob sigilo de Justiça não foram exibidos, uma vez que não constam na base de dados oficial dos tribunais.</p>

            <p>A consolidação de informações referente aos deputados estaduais foram feitas seguindo os mesmos parâmetros adotados pelo Instituto ReclameAqui, mas são de responsabilidade do #TemMeuVoto e encontram-se em nossa base de dados. </p>

            <p>Caso encontre algo errado nas informações disponibilizadas aqui, entre em contato com a gente pelo e-mail <b>contato@temmeuvoto.com</b></p>
        `;

        return <ModalText {...this.props} title={'Processo e condenações'} text={text}/>
    }
}

export default ModalProcessoCondenacao;
