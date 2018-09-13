import React, {Component} from 'react';

import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import ConfirmarVoto from './../match/confirmarVoto/ConfirmarVoto';

import './ConfirmarVotoPage.scss';

class ConfirmarVotoPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {ref_candidato, position} = this.props.match.params;

        return <div key={ref_candidato} className={'ConfirmarVotoPage'}>
            <ConfirmarVoto ref_candidato={ref_candidato} position={position}/>
        </div>
    }
}

export default connect({}, ConfirmarVotoPage);
