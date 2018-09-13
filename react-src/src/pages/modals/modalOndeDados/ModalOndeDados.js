import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalOndeDados extends React.PureComponent {

    componentDidMount() {
        trackPageview('interna/de-onde-vem-os-dados');
    }

    render() {
        const text = `
            <p> As informaçõees disponibilizadas aqui são obtidas a partir de fontes públicas oficiais, como o TSE, STF, STJ, TJs, TRFs e pelos próprios candidatos.</p>

            <p>Para a leitura de processos e condenações, utilizamos a base de dados do Instituto ReclameAqui, aplicada no app Detector de Ficha de Políticos, que utiliza reconhecimento facial para detectar os processos de corrupção e improbidade administrativa que cada político responde na justiça brasileira.</p>
            
            <p>Para os demais filtros, foram utilizados dados disponibilizados pelo TSE ou informações registradas pelos próprios candidatos em seus perfis.</p>
            
            <p>Caso encontre algo errado, entre em contato com a gente pelo e-mail contato@temmeuvoto.com</p>
        `;

        return <ModalText {...this.props} title={'De onde vem os dados'} text={text}/>
    }
}

export default ModalOndeDados;
