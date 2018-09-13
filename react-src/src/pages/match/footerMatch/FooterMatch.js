import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './FooterMatch.scss';

import {ButtonArrow, computeState, Spacer} from "../../../components";
import {formatNumber, getCargos} from "../../../utils/AppUtils";
import {trackEvent} from "../../../utils/GAUtil";

class FooterMatch extends Component {
    static propTypes = {
        requestMatch: PropTypes.any,
        state: PropTypes.any,
    }

    onNextClick = () => {
        trackEvent('fase3/match', 'click', 'botao_ver');

        this.props.signalGoStep({step: '/transparencia'});
    }

    /*renderCandidatos = () => {
        const {requestMatch: {result}, state: {uf}} = this.props;

        if (result) {
            return getCargos(result.data.list, uf).map((v, k) => {
                if (!v)
                    return null;

                return <div key={k} className={'item size-15'}>
                    <div>{v.name}</div>
                    <div className={'total'}>{formatNumber(v.total)}</div>
                </div>
            })
        }

        return null;
    }*/

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

    render() {
        return <div className="FooterMatch text-center">
            <div className={'content-barcandidatos'}>
                <div className={'size-15 medium text'}>Total de candidatos 100% alinhados às suas
                    respostas: {this.getTotal()} <span className={'bold'} onClick={this.onNextClick}>VER</span></div>
                <Spacer/>
            </div>
        </div>
    }
}

export default connect({
    state: computeState,
    requestMatch: state`candidato.requestMatch`,

    signalGoStep: signal`candidato.goStep`,
}, FooterMatch);
