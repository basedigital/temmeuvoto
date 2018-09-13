import React from 'react';

import PropTypes from 'prop-types';

import {state} from "cerebral/tags";
import {connect} from "@cerebral/react";

import {Scrollbar} from '../../../components/';

import './ListState.scss';

import {trackEvent} from "../../../utils/GAUtil";

class ListState extends React.PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
    }

    onClick = (state) => {
        trackEvent('fase3/localizacao', 'click', 'selecionou-cidade');

        this.props.onClick(state);
    }

    renderStates = () => {
        const {estados} = this.props.config;

        return estados.map((v) => {
            return <div className={'item size-20'} key={v.uf}
                        onClick={this.onClick.bind(this, v)}>{v.name} - {v.uf}</div>
        })
    }

    render() {
        return <div className='ListState'>
            <Scrollbar className={'list'}>
                {this.renderStates()}
            </Scrollbar>
        </div>;
    }
}

export default connect({
    config: state`app.config`,
}, ListState);
