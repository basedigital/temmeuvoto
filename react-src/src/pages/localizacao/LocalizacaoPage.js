import React, {Component} from 'react';

import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import {Button, Spacer, Loading, ModalBarTop, getRouter} from '../../components/';

import BoxMap from "./boxMap/BoxMap";
import ListState from "./listState/ListState";

import sortBy from "lodash/sortBy";
import {distance} from "../../utils/AppUtils";

import './LocalizacaoPage.scss';
import {trackEvent, trackPageview} from "../../utils/GAUtil";

class LocalizacaoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalState: false,
            loading: true,
            withGeo: null,
            state: null
        };
    }

    componentDidMount() {
        trackPageview('fase3/localizacao');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, {timeout: 5000});
        } else {
            this.setState({loading: false});
        }
    }

    geoSuccess = (position) => {
        this.setState({loading: false, withGeo: true, state: this.getState(position.coords)});
    }

    geoError = (error) => {
        this.setState({loading: false, withGeo: false});
    }

    onModalStateClick = (state) => {
        this.setState({modalState: false, state});
    }

    onStateClick = (state) => {
        this.setState({state}, () => {
            this.onNextPress();
        });
    }

    onNextPress = () => {
        trackEvent('fase3/localizacao', 'click', 'botao_avancar');

        localStorage.uf = this.state.state.uf;

        getRouter().history.push('/match/' + this.state.state.uf);
    }

    onChangeClick = () => {
        trackEvent('fase3/localizacao', 'click', 'link_alterar');

        this.setState({modalState: true});
    }

    onCloseModalState = () => {
        this.setState({modalState: false});
    }

    renderWithLatLng = () => {
        return <div>
            <BoxMap state={this.state.state} onChangeClick={this.onChangeClick}/>
            <Spacer vertical={4}/>
            <Button title={'AVANÇAR'} onClick={this.onNextPress} theme={'dark'}/>
            <Spacer vertical={2}/>
        </div>
    }

    getState = (coords) => {
        const {config: {estados}} = this.props;

        const list = sortBy(estados.map((v) => {
            return {
                ...v,
                distance: Math.abs(distance(v.lat * 1, v.lng * 1, coords.latitude * 1, coords.longitude * 1))
            };
        }), 'distance');

        return list[0];
    }

    render() {
        const {withGeo, loading, modalState} = this.state;

        return <div className={'LocalizacaoPage'}>
            <ModalBarTop visible={modalState} onClose={this.onCloseModalState}>
                <Spacer vertical={6}/>
                <div className={'size-34 medium'}>Onde você está?</div>
                <Spacer vertical={2}/>
                <ListState onClick={this.onModalStateClick}/>
            </ModalBarTop>

            <div className={cls('title', 'light', 'size-34')}><span
                className={'medium'}>Para começar,</span> identifique <br/>o
                estado onde você vota:
            </div>

            {loading && <Spacer vertical={4} horizontal={4}>
                <Loading/>
            </Spacer>}

            {!withGeo && !loading && <ListState onClick={this.onStateClick}/>}

            {withGeo && !loading && this.renderWithLatLng()}
        </div>
    }
}

export default connect({
    config: state`app.config`,
    media: state`useragent.media`,
}, LocalizacaoPage);
