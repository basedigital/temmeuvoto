import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalTecnologia extends React.PureComponent {

    componentDidMount() {
        trackPageview('interna/tecnologia');
    }

    render() {
        const text = `
            <p>A programação do #TEMMEUVOTO é feita em código aberto, dando total  transparência à plataforma.</p>
            <p>A todo momento, o usuário pode apontar informações erradas preenchidas pelos candidatos ou mesmo pelo #TEMMEUVOTO.</p>
            <p>Todos os dados consolidados, sem nenhuma identificação individual, estarão disponíveis e com livre acesso no site da plataforma após o período eleitoral.</p>
            <p>Os dados pessoais assim como a escolha dos eleitores, nunca serão repassados aos candidatos ou partidos.</p>
            <p>Todas as regras e leis de privacidade de dados estão sendo e serão rigorosamente cumpridas.</p>
        `;

        return <ModalText {...this.props} title={'Tecnologia'} text={text}/>
    }
}

export default ModalTecnologia;
