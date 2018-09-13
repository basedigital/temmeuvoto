import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalRenovacao extends React.PureComponent {
    componentDidMount() {
        trackPageview('interna/ajuda-renovacao');
    }

    render() {
        const text = `
            <p>A fonte de informação aqui foi o Tribunal Superior Eleitoral.</p>

            <p>Caso encontre algo errado nas informações disponibilizadas aqui, entre em contato com a gente pelo e-mail <b>contato@temmeuvoto.com</b></p>
        `;

        return <ModalText {...this.props} title={'Renovação'} text={text}/>
    }
}

export default ModalRenovacao;
