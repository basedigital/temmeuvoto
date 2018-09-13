import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './Cidade.scss';

import {Button, ButtonArrow, Loading, Spacer} from "../../../../components";

import ContentMatch from '../../contentMatch/ContentMatch';

class Cidade extends Component {
    static propTypes = {
        state: PropTypes.any,

        onNextClick: PropTypes.func,
        onSearchClick: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {notfound: false, loading: true};
    }

    onHelpClick = () => {
        this.props.onHelpClick();
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, {timeout: 5000});
        } else {
            this.setState({notfound: true, loading: false});
        }
    }

    geoSuccess = (position) => {
        const {latitude, longitude} = position.coords;

        this.props.signalSearchCityLatLng({lat: latitude, lng: longitude});

        this.setState({loading: false});
    }

    geoError = (error) => {
        this.setState({notfound: true, loading: false});
    }

    render() {
        const {state: {name, image}, requestSearchCityLatLng: {loading}, requestMatch} = this.props;

        const {form: {cidade, cidade_estado}} = this.props;

        return <ContentMatch className={'Cidade'} title={'Digite a cidade em que você vota.'}
                             text={'Escolha a cidade para avançar'} onHelpClick={this.onHelpClick}>

            <Spacer/>

            <div className={'content-city'}>
                <div className={'header-city'}>
                    <div>
                        <img src={require("./images/pin.png")}/>

                        <Spacer vertical={2}/>

                        <div className={'size-15 color-gray78 italic medium'}>Estado</div>

                        <div className={'size-26 medium'}>{name}</div>
                    </div>
                    <div className={'img-state'}>
                        <img src={`images/loading/${image}`}/>
                    </div>
                </div>

                <Spacer/>

                <div className={'line'}></div>

                <Spacer vertical={2}/>

                <div className={'bold size-12'}>VOCÊ ESTA EM:</div>

                <Spacer vertical={2}/>

                <div className={'input-city'} onClick={this.props.onSearchClick}>
                    {(loading || this.state.loading) && <Loading small={true}/>}

                    {cidade.value && <span className={'size-14 italic'}>{cidade.value} - {cidade_estado.value}</span>}

                    {this.state.notfound && !cidade.value && <span className={'size-14 italic'}>Selecione sua cidade</span>}
                </div>

                <Spacer vertical={2}/>

                <ButtonArrow title={'Não está neste local?'} onClick={this.props.onSearchClick}/>
            </div>

            <Spacer vertical={4}/>

            <Button title={'AVANÇAR'} disabled={!cidade.value} loading={requestMatch.loading} onClick={this.props.onNextClick}/>
        </ContentMatch>
    }
}

export default connect({
    form: form(state`candidato.form`),

    requestSearchCityLatLng: state`candidato.requestSearchCityLatLng`,
    signalSearchCityLatLng: signal`candidato.searchCityLatLng`
}, Cidade);

