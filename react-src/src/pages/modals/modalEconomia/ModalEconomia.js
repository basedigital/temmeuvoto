import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalEconomia extends React.PureComponent {

    componentDidMount() {
        trackPageview('interna/ajuda-economia');
    }

    render() {
        const text = `
            <p>Descrevemos aqui, de forma livre e simples, opções que remetem a um posicionamento conservador, intermediário ou progressista no que se refere 
à atuação do Estado na economia e no bem-estar social do País.</p>
        `;

        return <ModalText {...this.props} title={'Economia e Bem-Estar Social'} text={text}/>
    }
}

export default ModalEconomia;
