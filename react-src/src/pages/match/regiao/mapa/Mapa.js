import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './Mapa.scss';

import {Button, Spacer} from "../../../../components";

import ContentMatch from '../../contentMatch/ContentMatch';

class Mapa extends Component {
    static propTypes = {
        state:PropTypes.any,

        onYesClick:PropTypes.func,
        onNoClick:PropTypes.func,
    }

    render() {
        const {state: {name, image}} = this.props;

        return <ContentMatch className={'Mapa'} title={'É importante que seu candidato seja da sua cidade?'}>
            <Spacer/>

            <img className={'img'} src={'images/estados/' + image}/>

            <Spacer vertical={2}/>

            <div className={'btns'}>
                <Button title={'SIM'} onClick={this.props.onYesClick}/>

                <Spacer horizontal={2}/>

                <Button title={'NÃO'} onClick={this.props.onNoClick}/>
            </div>
        </ContentMatch>
    }
}

export default connect({}, Mapa);

