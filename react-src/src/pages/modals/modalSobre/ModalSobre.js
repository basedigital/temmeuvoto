import React from 'react';

import ModalText from './../modalText/ModalText';

import {trackPageview} from "../../../utils/GAUtil";

class ModalSobre extends React.PureComponent {

    componentDidMount() {
        trackPageview('interna/sobre');
    }

    render() {
        const text = `
            <p>#TEMMEUVOTO é uma plataforma independente que ajuda o eleitor a encontrar o candidato ou a candidata a deputado estadual, deputado federal e senador com quem mais se identifica.</p>

            <p>A ideia é unir toda a tecnologia e informação que a Era dos Dados nos fornece, para facilitar e ajudar o eleitor a encontrar seu candidato de forma fácil, rápida e confiável.</p> 

            <p>O acesso à informação é a chave para fortalecer a democracia. Afinal, conhecer bem os candidatos permite escolher com consciência o que nós, cidadãos, temos de mais valioso: o voto.</p>
        `;

        return <ModalText {...this.props} title={'Sobre'} text={text}/>
    }
}

export default ModalSobre;
