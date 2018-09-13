import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalPrioridade extends React.PureComponent {

    componentDidMount() {
        trackPageview('interna/ajuda-prioridade');
    }

    render() {
        const text = `
            <p>As prioridades aqui agrupadas estão de acordo com aquelas levantadas pelas principais pesquisas de opinião do país, quando perguntam sobre as prioridades do brasileiro.</p>

            <p>Separamos em dois blocos para que os candidatos(as) possam expressar mais de uma prioridade, dando chance aos eleitores conhecerem e analisarem duas propostas concretas.</p>

            <p>Sabemos que as prioridades não são exaustivas, porém o intuito não é ter uma lista completa e sim uma lista que reflita as prioridades brasileiras.</p>
        `;

        return <ModalText {...this.props} title={'Prioridades'} text={text}/>
    }
}

export default ModalPrioridade;
