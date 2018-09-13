import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalCostume extends React.PureComponent {

    componentDidMount() {
        trackPageview('interna/ajuda-costume');
    }

    render() {
        const text = `
            <p>Descrevemos aqui, de forma livre e simples, opções que remetem a um posicionamento conservador, intermediário ou progressista no que se refere aos costumes.</p>
        `;

        return <ModalText {...this.props} title={'Costumes'} text={text}/>
    }
}

export default ModalCostume;
