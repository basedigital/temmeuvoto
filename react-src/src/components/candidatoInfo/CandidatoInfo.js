import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {Button, Spacer} from '../';

import {getMemoryRouter} from "../../utils/RouterUtils";
import {getImage} from "../../utils/AppUtils";

import './CandidatoInfo.scss';

class CandidatoInfo extends React.PureComponent {
    static propTypes = {
        data: PropTypes.any,
    }

    renderNumbers = (numero) => {
        return numero.toString().split('').map((v, k) => {
            return <div className={'number'} key={k}>
                <span className={'medium'}>{v}</span>
            </div>
        })
    }

    render() {
        const {nome, partido, numero, cargo, image} = this.props.data;

        return <div className={'CandidatoInfo'}>
            <div className={'image'} style={{backgroundImage: `url(${getImage(image)})`}}></div>

            <Spacer vertical={3}/>

            <div className={'size-18 medium'}>{nome}</div>

            <Spacer vertical={2}/>

            <div className={'size-15'}>{partido}</div>

            <div className={'size-15 color-gray78 medium italic'}>Candidato a {cargo.name}</div>

            <Spacer vertical={3}/>

            <div className={'numbers'}>
                {this.renderNumbers(numero)}
            </div>
        </div>
    }
}

export default CandidatoInfo;
