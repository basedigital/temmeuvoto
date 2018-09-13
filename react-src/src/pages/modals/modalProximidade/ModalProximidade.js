import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalProximidade extends React.PureComponent {

    componentDidMount() {
        trackPageview('interna/ajuda-proximidade');
    }

    render() {
        const text = `
            <p>O resultado aplicado aqui refere-se as cidades que estão em um raio de até 100 km da cidade de votação descrita em sua resposta.</p>
        `;

        return <ModalText {...this.props} title={'Proximidade'} text={text}/>
    }
}

export default ModalProximidade;
