import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import {Scrollbar, Button, Icon, Spacer, computeState, getRouter} from "../../../components";

import ContentMatch from '../contentMatch/ContentMatch';
import HeaderMatch from "./../headerMatch/HeaderMatch";

import ItemCandidato from "./itemCandidato/ItemCandidato";
import ItemEmptyCandidato from "./itemEmptyCandidato/ItemEmptyCandidato";

import {getCargos, getCargosList} from "../../../utils/AppUtils";

import './ListaCandidatos.scss';
import {trackPageview} from "../../../utils/GAUtil";

class ListaCandidato extends Component {
    static propTypes = {
        requestMatch: PropTypes.any,
        state: PropTypes.any,
    }

    onHelpClick = () => {
        this.props.signalOpenModal({modal: 'lista-candidatos'});
    }

    onFinishClick = () => {
        const {listCandidatos} = this.props;

        const list = Object.keys(listCandidatos).map((v) => listCandidatos[v].id);

        let ob = {};

        Object.keys(listCandidatos).map((v) => {
            ob[v] = listCandidatos[v].id;
        });

        let obStorage = {};

        try {
            obStorage = localStorage.candidatos ? JSON.parse(localStorage.candidatos) : {};
        } catch (e) {
        }

        localStorage.setItem('candidatos', JSON.stringify(Object.assign(obStorage, ob)));

        getRouter().history.push(`/candidatos`);
    }

    renderList = () => {
        const {listCandidatos, requestMatch: {result}, state: {uf}} = this.props;

        if (!result)
            return null;

        return getCargosList(result.data.list, uf).map((v, k) => {
            const pos = 'pos_' + v.position;

            if (listCandidatos[pos])
                return <ItemCandidato key={k} data={listCandidatos[pos]} position={v.position}/>
            else
                return <ItemEmptyCandidato key={k} data={v} position={v.position}/>
        })
    }

    getListTracking = () => {
        const {listCandidatos, requestMatch: {result}, state: {uf}} = this.props;

        if (!result)
            return null;

        const list = getCargosList(result.data.list, uf).map((v, k) => {
            const pos = 'pos_' + v.position;

            const name = v.name;

            if (listCandidatos[pos])
                return `select-${name}=1`;
            else
                return `select-${name}=0`;
        })

        return list;
    }

    onBackClick = () => {
        this.props.signalGoStep({step:'/transparencia'});
    }

    render() {
        const {listCandidatos} = this.props;

        const listTracking = this.getListTracking();

        return <div className="ListaCandidatos DefaultMatch">
            {/*<div className={'btn btn-help'} onClick={this.onHelpClick}>*/}
                {/*<Icon icon={Icon.icons.help}/>*/}
            {/*</div>*/}

            <TrackListaCandidato data={listTracking} state={this.props.state}/>

            <ContentMatch>
                <HeaderMatch step={null} onBackClick={this.onBackClick} onHelpClick={null}/>

                <div className={'size-24'}>Agora é com você.</div>

                <Spacer/>

                <div className={'size-17 color-gray78'}>Filtramos uma lista de candidatos mais alinhados com o que você
                    deseja para o Brasil. Pesquise, reflita, se informe e decida: quem tem seu voto nessas eleições?
                </div>

                <Spacer vertical={2}/>

                {/*<div className={'btn btn-help-mobile'} onClick={this.onHelpClick}>*/}
                    {/*<Icon icon={Icon.icons.help}/>*/}
                {/*</div>*/}

                <div className={'clearfix'}/>

                <Scrollbar>
                    <div className={'list'}>
                        {this.renderList()}
                    </div>

                    <Spacer vertical={3}/>

                    <div className={'text-center'}>
                        <Button title={'CONFIRMAR'} onClick={this.onFinishClick}/>
                    </div>

                    <Spacer vertical={2}/>
                </Scrollbar>

                <Spacer vertical={2}/>
            </ContentMatch>
        </div>
    }
}

function TrackListaCandidato(props) {
    if (!props.data)
        return null;

    var tracking = false;
    if (!tracking) {
        const {data, state} = props;

        const list = data.join("&").toLowerCase().replace(/ /g, "");

        trackPageview(`/match/${state.uf}/?passo=final&${list}`);
    }

    return null;
}

export default connect({
    state: computeState,

    signalGoStep: signal`candidato.goStep`,
    requestMatch: state`candidato.requestMatch`,
    signalOpenModal: signal`app.openModal`,

    listCandidatos: state`candidato.listCandidatos`,
}, ListaCandidato);
