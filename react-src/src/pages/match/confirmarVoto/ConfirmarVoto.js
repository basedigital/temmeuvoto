import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './ConfirmarVoto.scss';

import {Spacer, Loading, ErrorRequest, BarTop, Button, CandidatoInfo, getRouter} from "../../../components";

import ContentMatch from '../contentMatch/ContentMatch';
import {getMemoryRouter} from "../../../utils/RouterUtils";

import toPlainObject from 'lodash/toPlainObject';
import {trackPageview} from "../../../utils/GAUtil";
import computeState from "../../../modules/compute/computeState";

class ConfirmarVoto extends Component {
    static propTypes = {}

    componentDidMount() {
        this.getCandidato();
    }

    onRetry = () => {
        this.getCandidato();
    }

    getCandidato = () => {
        this.props.signalCandidato({ref_candidato: this.getParams().ref_candidato})
    }

    isPage = () => {
        return !!this.props.ref_candidato;
    }

    getParams = () => {
        if (this.isPage())
            return this.props;
        else
            return this.props.match.params;
    }

    onCloseClick = () => {
        if (this.isPage()) {
            getRouter().history.goBack();
        } else {
            getMemoryRouter().history.goBack();
        }
    }

    onConfirmClick = () => {
        const {requestCandidato: {result}} = this.props;

        const {position} = this.getParams();

        this.props.signalConfirmCandidato({candidato: toPlainObject(result.data), position, saveStorage:this.isPage()})

        setTimeout(() => {
            if (this.isPage()) {
                getRouter().history.replace('/candidatos');
            } else {
                getMemoryRouter().history.replace('/lista-candidatos');
            }
        })
    }

    render() {
        const {requestCandidato: {loading, result, error}} = this.props;

        if (loading) {
            return <div className={'LoadingCenter'}>
                <Loading/>
            </div>
        }

        if (error) {
            return <ErrorRequest onClick={this.onRetry}/>
        }

        if (!result) {
            return null;
        }

        return <div className="ConfirmarVoto DefaultMatch">
            <BarTop onClick={this.onCloseClick}/>

            <TrackConfirmarVoto data={result.data} state={this.props.state}/>

            <ContentMatch>
                <div className={'size-28 medium'}>É este o candidato que tem seu voto?</div>

                <div className={'content-confirmarvoto'}>

                    <Spacer vertical={4}/>

                    <CandidatoInfo data={result.data}/>

                    <Spacer vertical={5}/>

                    <div className={'btns'}>
                        <Button title={'SIM'} onClick={this.onConfirmClick}></Button>
                        <Spacer horizontal={4}/>
                        <Button title={'NÃO'} onClick={this.onCloseClick}></Button>
                    </div>
                </div>
            </ContentMatch>
        </div>
    }
}

function TrackConfirmarVoto(props) {
    var tracking = false;

    if (!tracking) {
        const {nome, partido, cargo, genero} = props.data;

        trackPageview(`/match/${props.state.uf}/?temmeuvoto=1&cargo=${cargo.name}&genero=${genero}&partido=${partido}&nome=${nome}`)
    }

    return null;
}


export default connect({
    state:computeState,

    requestCandidato: state`candidato.requestCandidato`,
    signalCandidato: signal`candidato.candidato`,

    signalConfirmCandidato: signal`candidato.confirmCandidato`
}, ConfirmarVoto);
