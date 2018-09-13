import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalBaseDados extends React.PureComponent {

    componentDidMount() {
        trackPageview('interna/base-de-dados');
    }

    render() {
        const text = `
            <p> Disponibilizamos nossa base de dados para que seja utilizada como fonte de informação.</p>
            
            <p>Se você é um veículo de comunicação o ou uma organização que disponibiliza informações aos cidadãos, entre em contato com a gente no e-mail <a class="link" href="mailto:contato@temmeuvoto.com">contato@temmeuvoto.com</a></p>
        `;

        return <ModalText {...this.props} title={'Base de Dados'} text={text}/>
    }
}

export default ModalBaseDados;
