import React, {Component} from 'react';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import ModalPrivacidade from './modalPrivacidade/ModalPrivacidade';
import ModalInvite from './modalInvite/ModalInvite';
import ModalTecnologia from './modalTecnologia/ModalTecnologia';
import ModalComoFunciona from "./modalComoFunciona/ModalComoFunciona";
import ModalOndeDados from "./modalOndeDados/ModalOndeDados";
import ModalQuemSomos from "./modalQuemSomos/ModalQuemSomos";
import ModalFavorite from "./modalFavorito/ModalFavorito";
import ModalSobre from "./modalSobre/ModalSobre";
import ModalBaseDados from "./modalBaseDados/ModalBaseDados";
import ModalContato from "./modalContato/ModalContato";

import ModalProcessoCondenacao from "./modalProcessoCondenacao/ModalProcessoCondenacao";
import ModalRenovacao from "./modalRenovacao/ModalRenovacao";
import ModalPrioridade from "./modalPrioridade/ModalPrioridade";
import ModalProximidade from "./modalProximidade/ModalProximidade";
import ModalEconomia from "./modalEconomia/ModalEconomia";
import ModalCostume from "./modalCostume/ModalCostume";
import ModalListaCandidatos from "./modalListaCandidatos/ModalListaCandidatos";
import ModalPesquisarCandidatos from "./modalPesquisarCandidatos/ModalPesquisarCandidatos";
import ModalSendEmail from "./modalSendEmail/ModalSendEmail";

class Modals extends Component {
    constructor(props) {
        super(props);
    }

    onClose = () => {
        this.props.signalCloseModal()
    }

    render() {
        const {modal} = this.props;

        switch (modal) {
            case('sobre'):
                return <ModalSobre onClose={this.onClose}/>
            case('como-funciona'):
                return <ModalComoFunciona onClose={this.onClose}/>
            case('de-onde-vem-os-dados'):
                return <ModalOndeDados onClose={this.onClose}/>
            case('quem-somos'):
                return <ModalQuemSomos onClose={this.onClose}/>
            case('convidar-amigos'):
                return <ModalInvite onClose={this.onClose}/>
            case('tecnologia'):
                return <ModalTecnologia onClose={this.onClose}/>
            case('base-de-dados'):
                return <ModalBaseDados onClose={this.onClose}/>
            case('meus-favoritos'):
                return <ModalFavorite onClose={this.onClose}/>

            case('pesquisar-candidatos'):
                return <ModalPesquisarCandidatos onClose={this.onClose}/>

            case('fale-conosco'):
                return <ModalContato onClose={this.onClose}/>
            case('politica-de-privacidade'):
                return <ModalPrivacidade onClose={this.onClose}/>

            case('processo-condenacao'):
                return <ModalProcessoCondenacao onClose={this.onClose}/>
            case('renovacao'):
                return <ModalRenovacao onClose={this.onClose}/>
            case('prioridade'):
                return <ModalPrioridade onClose={this.onClose}/>
            case('proximidade'):
                return <ModalProximidade onClose={this.onClose}/>
            case('economia'):
                return <ModalEconomia onClose={this.onClose}/>
            case('costume'):
                return <ModalCostume onClose={this.onClose}/>

            case('lista-candidatos'):
                return <ModalListaCandidatos onClose={this.onClose}/>

            case('send-email'):
                return <ModalSendEmail onClose={this.onClose}/>

            default:
                return null;
        }
    }
}

export default connect({modal: state`app.modal`, signalCloseModal: signal`app.closeModal`}, Modals);
