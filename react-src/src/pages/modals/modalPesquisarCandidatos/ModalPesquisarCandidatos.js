import React from 'react';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import {ModalBarTop, Loading, Scrollbar, Spacer, getRouter} from "../../../components";

import './ModalPesquisarCandidatos.scss';
import {getImage} from "../../../utils/AppUtils";

import './../../match/regiao/searchCity/SearchCity.scss';
import {trackEvent, trackPageview} from "../../../utils/GAUtil";

class ModalPesquisarCandidatos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {value: ''};
    }

    componentDidMount() {
        trackPageview('interna/pesquisar-candidatos');
    }

    componentWillUnmount() {
        this.props.signalResetRequest({path: 'candidato.requestSearchCandidato'});
    }

    onChange = (evt) => {
        if (!this.trackedChange) {
            this.trackedChange = true;
            trackEvent('fase3/pesquisar-candidatos', 'form_filled', 'campo_candidato');
        }

        this.setState({value: evt.target.value});

        const {modalData} = this.props;

        if (evt.target.value.length > 2) {
            this.props.signalSearchCandidato({search: evt.target.value, cargo_codigo: modalData ? modalData.cargo_codigo : '0'});
        }
    }

    onCandidatoClick = (v) => {
        const {modalData} = this.props;

        const position = modalData && modalData.position ? modalData.position : v.position;

        this.props.onClose();
        getRouter().history.push(`/politico/${v.id}/${position}`);
    }

    renderList = () => {
        const {requestSearchCandidato} = this.props;
        //console.log(requestSearchCandidato.result, this.state.value);

        if (!!requestSearchCandidato.result) {
            const {result: {data}} = requestSearchCandidato;

            if (data.length === 0) {
                return <div className={'size-12 text-center'}>Não encontramos nenhum candidato<br/>com o termo digitado.
                </div>
            }

            return data.map((v, k) => {
                return <div key={k} className={'item'} onClick={this.onCandidatoClick.bind(this, v)}>
                    <div className={'image'} style={{backgroundImage: `url(${getImage(v.image)})`}}></div>

                    <div className={'info'}>
                        <div className={'size-16 medium color-grayc1'}>{v.nome}</div>
                        <div className={'size-14 color-gray78'}>{v.partido}</div>
                        <div className={'size-14 color-gray78'}>{v.numero}</div>
                    </div>
                </div>
            });
        }

        return null;
    }

    render() {
        const {requestSearchCandidato: {loading}, modalData} = this.props;

        return <ModalBarTop visible={true} onClose={this.props.onClose}>
            <div className={'SearchCity ModalPesquisarCandidatos'}>
                <Spacer vertical={6}/>

                <div className={'size-20 medium text-center'}>PESQUISAR CANDIDATOS</div>

                {modalData && modalData.cargo && <Spacer />}
                {modalData && modalData.cargo && <div className={'size-14 text-center'}>{modalData.cargo}</div>}

                <Spacer vertical={2}/>

                <div className={'input'}>
                    <img src={require('./../../match/regiao/searchCity/images/icon.png')}/>
                    <input onChange={this.onChange} value={this.state.value}/>

                    {!!loading && <Loading small={true}/>}
                </div>

                <Spacer vertical={.5}/>

                <div className={'size-10 text-center'}>Digite no mínimo 3 caracteres.</div>

                <Spacer vertical={2}/>

                <Scrollbar>
                    <div className={'list'}>
                        {this.renderList()}
                    </div>
                </Scrollbar>
            </div>
        </ModalBarTop>
    }
}

export default connect({
    modalData: state`app.modalData`,

    signalResetRequest: signal`form.resetRequest`,

    signalSearchCandidato: signal`candidato.searchCandidato`,
    requestSearchCandidato: state`candidato.requestSearchCandidato`
}, ModalPesquisarCandidatos);
