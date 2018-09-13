import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './Home.scss';

import {Button, computeState, Spacer} from "../../../components";
import {formatNumber} from "../../../utils/AppUtils";
import {getMemoryRouter} from "../../../utils/RouterUtils";

import HeaderMatch from '../headerMatch/HeaderMatch';
import {trackPageview} from "../../../utils/GAUtil";

class Home extends Component {
    static propTypes = {
        state: PropTypes.any,
        requestMatch: PropTypes.any,
    }

    componentDidMount() {
        trackPageview(`/match/${this.props.state.uf}/?passo=0`);
    }

    getTotal = () => {
        const {requestMatch: {result}} = this.props;

        if (result) {
            let total = 0;
            result.data.list.map((v) => {
                total += v.total * 1;
            })

            return formatNumber(total);
        }

        return '-';
    }

    onNextClick = () => {
        this.props.signalGoStep({step: '/processo'});
    }

    render() {
        const {state, requestMatch: {loading}} = this.props;

        return <div className="Home">
            <HeaderMatch step={null} onBackClick={null} onHelpClick={null}/>

            <div className={'icon'}>
                <img src={require('./images/icon.png')}/>
            </div>

            <div className={'content-home'}>
                <div className={'light size-34'}>Encontramos <span
                    className={'medium'}>{this.getTotal()} candidatos</span> no
                    estado d{state.prep} {state.name}.
                </div>

                <Spacer vertical={2}/>

                <div className={'lnh-150 color-gray78 size-17'}> Responda às perguntas a seguir e encontre os candidatos
                    que defendem suas
                    ideias e propostas para o Brasil.
                </div>
            </div>

            <Button title={'AVANÇAR'} loading={loading} onClick={this.onNextClick}/>

            <Spacer vertical={2}/>
        </div>
    }
}

export default connect({
    state: computeState,

    signalGoStep: signal`candidato.goStep`,
    resetMatch: signal`candidato.resetMatch`,

    requestMatch: state`candidato.requestMatch`,
}, Home);
