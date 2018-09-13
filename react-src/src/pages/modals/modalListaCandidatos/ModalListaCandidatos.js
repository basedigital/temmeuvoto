import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalListaCandidatos extends React.PureComponent {

    componentDidMount() {
        trackPageview('interna/ajuda-lista-candidatos');
    }

    render() {
        const text = `
            <p>O foco do #TEMMEUVOTO é ajudar o eleitor na escolha dos seus candidatos aos cargos legislativos – senador, deputado federal e deputado estadual.</p>

            <p>Porém, para facilitar a tomada de decisão, optamos por disponibilizar aqui a lista de todos os cargos elelivos nas eleições de 2018, o que inclui também os candidatos ao executivo – governador e presidente. Nesses casos, disponibilizamos a lista de todos os candidatos, sem aplicação dos filtros utilizados nesta plataforma.</p>
        `;

        return <ModalText {...this.props} title={'Lista de Candidatos'} text={text}/>
    }
}

export default ModalListaCandidatos;
