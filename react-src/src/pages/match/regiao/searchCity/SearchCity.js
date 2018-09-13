import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './SearchCity.scss';

import {Spacer, ModalBarTop, Scrollbar, Loading} from "../../../../components";

class SearchCity extends Component {
    static propTypes = {}

    constructor(props) {
        super(props);

        this.state = {value: ''};
    }

    componentWillUnmount() {
        this.props.signalResetRequest({path: 'candidato.requestSearchCity'});
    }

    onCloseFindModal = () => {
        this.props.onClose();
    }

    onChange = (evt) => {
        this.setState({value: evt.target.value});

        this.props.signalSearchCity({search: evt.target.value});
    }

    onCityClick = (city) => {
        const {id, name, uf} = city;

        this.props.signalSetCity({id, name, uf});

        this.props.onClose();
    }

    renderList = () => {
        const {requestSearchCity} = this.props;
        if (requestSearchCity.status === 200) {
            const {result: {data}} = requestSearchCity;

            if (data.length === 0) {
                return <div className={'size-12 text-center'}>Não encontramos nenhuma cidade<br/>com o termo digitado.
                </div>
            }

            return data.map((v, k) => {
                return <div key={k} className={'item'} onClick={this.onCityClick.bind(this, v)}>{v.name} - {v.uf}</div>
            });
        }

        return null;
    }

    render() {
        const {requestSearchCity: {loading}} = this.props;

        return <ModalBarTop noAddClass={true} visible={true} onClose={this.onCloseFindModal}>
            <div className={'SearchCity'}>
                <Spacer vertical={6}/>

                <div className={'size-20 medium text-center'}>Digite a cidade em que você vota.</div>

                <Spacer vertical={2}/>

                <div className={'input'}>
                    <img src={require('./images/icon.png')}/>
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
    signalResetRequest: signal`form.resetRequest`,

    signalSetCity: signal`candidato.setCity`,

    signalSearchCity: signal`candidato.searchCity`,
    requestSearchCity: state`candidato.requestSearchCity`
}, SearchCity);