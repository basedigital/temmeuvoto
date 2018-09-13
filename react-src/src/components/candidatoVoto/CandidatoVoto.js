import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {Button, getRouter, Spacer} from '../';

import './CandidatoVoto.scss';
import {getMemoryRouter} from "../../utils/RouterUtils";
import {getImage} from "../../utils/AppUtils";

class CandidatoVoto extends React.PureComponent {
    static propTypes = {
        data: PropTypes.any,
        position: PropTypes.any,
        hideVote: PropTypes.bool,
        hideBar: PropTypes.bool,

        // step:PropTypes.number,

        onInfoClick: PropTypes.func,
    }

    onVoteClick = () => {
        const {data: {id}, position} = this.props;

        getMemoryRouter().history.push(`/confirmar-voto/${id}/${position}`);
    }

    onInfoClick = () => {
        const {data: {id}, position} = this.props;

        if (this.props.onInfoClick) {
            this.props.onInfoClick(this.props.data);
        } else {
            getMemoryRouter().history.push(`/politico/${id}/${position}`);
        }
    }

    render() {
        const {hideVote, hideBar} = this.props;

        const {nome, partido, numero, image} = this.props.data;
        let {total, totalQ} = this.props.data;

        // let total //TOTAL DE QUESTÕES COM MATCH 100%
        // let totalQ //QUANTAS QUESTOES ELE RESPONDEU

        const totalNo = 7 - total;
        const totalYes = totalQ - totalNo;

        const perc = Math.round((total/7)*100).toFixed(0) +'%';

        return <div className={'CandidatoVoto'}>
            <div className={'content-cadidatovoto'}>
                <div className={'image'}
                     style={{backgroundImage: `url(${getImage(image)})`}}></div>

                <div className={'info'}>
                    <div className={'size-16 medium'}>{nome}</div>

                    <Spacer vertical={2}/>

                    <div className={'size-12 color-gray78'}>{partido}</div>
                    <div className={'size-10 color-gray78'}>{numero}</div>
                </div>
            </div>

            {!hideVote && !hideBar && <div className={'total size-11 medium'}>
                <div className={'total-perc size-24'}>{perc}</div>
            
                <div className={'total-text'}>{totalQ} RESPOSTAS<br/> {totalYes} {totalYes > 1 ? 'iguais' : 'igual'} | {totalNo} distinta{(totalNo) > 1 ? 's' : ''}</div>
            </div>}

            <Spacer vertical={1.5}/>

            <div className={'btns'}>
                {!hideVote && <Button title={'TEM MEU VOTO'} theme={'voto'} onClick={this.onVoteClick}/>}

                {!hideVote && <Spacer horizontal={2}/>}

                <Button title={'SAIBA MAIS'} theme={'voto'} onClick={this.onInfoClick}/>
            </div>
        </div>
    }
}

export default CandidatoVoto;
