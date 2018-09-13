import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './Regiao.scss';

import {computeState, Spacer} from "../../../components";

import HeaderMatch from '../headerMatch/HeaderMatch';

import Mapa from './mapa/Mapa';
import Cidade from './cidade/Cidade';
import SearchCity from './searchCity/SearchCity';

class Regiao extends Component {
    static propTypes = {
        onBackClick: PropTypes.func,
        onNextClick: PropTypes.func,
        onOpenModal: PropTypes.func,
        requestMatch: PropTypes.any,
    }

    constructor(props) {
        super(props);

        this.state = {boxCity: false, searchCity: false};
    }

    onHelpClick = () => {
        this.props.signalOpenModal({modal:'proximidade'});
    }

    onNoClick = () => {
        this.props.signalSetField({path:'candidato.form.cidade', value:''});
        this.props.signalSetField({path:'candidato.form.cidade_estado', value:''});
        this.props.signalSetField({path:'candidato.form.ref_cidade', value:'-1'});
        this.props.signalGoStep({step:'/prioridade1'});
    }

    onNextClick = () => {
        this.props.signalGoStep({step:'/prioridade1'});
    }

    onBackClick = () => {
        this.props.signalSetField({path:'candidato.form.cidade', value:''});
        this.props.signalSetField({path:'candidato.form.cidade_estado', value:''});
        this.props.signalSetField({path:'candidato.form.ref_cidade', value:''});

        this.props.signalGoStep({step:'/costume'});
    }


    onShowCityClick = () => {
        this.setState({boxCity: true});
    }

    onSearchClick = () => {
        this.setState({searchCity: true});
    }

    onCloseSearchCity = () => {
        this.setState({searchCity: false});
    }

    render() {
        const {boxCity, searchCity} = this.state;

        const {form, state, requestMatch: {loading}} = this.props;

        return <div className="Regiao DefaultMatch">
            <HeaderMatch step={5} onBackClick={this.onBackClick} onHelpClick={this.onHelpClick}/>

            <Spacer vertical={1}/>

            {!boxCity && <Mapa state={state} onYesClick={this.onShowCityClick} onNoClick={this.onNoClick}/>}

            {boxCity && <Cidade state={state} requestMatch={this.props.requestMatch} onNextClick={this.onNextClick} onSearchClick={this.onSearchClick} onHelpClick={this.onHelpClick}/>}

            {searchCity && <SearchCity onClose={this.onCloseSearchCity}/>}
        </div>
    }
}

export default connect({
    list: state`app.config.regiao`,
    form: form(state`candidato.form`),

    state: computeState,
    signalGoStep: signal`candidato.goStep`,
    requestMatch: state`candidato.requestMatch`,
    signalOpenModal: signal`app.openModal`,

    signalSetField: signal`form.setField`,
}, Regiao);