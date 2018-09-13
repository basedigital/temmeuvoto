import React, {Component} from 'react';

import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import Candidato from './../match/candidato/Candidato';

import './CandidatoPage.scss';

class CandidatoPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {ref_candidato, position, page} = this.props.match.params;

        return <div key={ref_candidato} className={'CandidatoPage'}>
            <Candidato ref_candidato={ref_candidato} position={position} page={page}/>
        </div>
    }
}

export default connect({}, CandidatoPage);
