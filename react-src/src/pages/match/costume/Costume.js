import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './Costume.scss';

import {Button, Checks, Spacer, Scrollbar, ComponentConnect, computeState} from "../../../components";

import HeaderMatch from '../headerMatch/HeaderMatch';
import ContentMatch from '../contentMatch/ContentMatch';
import {trackPageview} from "../../../utils/GAUtil";

class Costume extends Component {
    static propTypes = {
        onBackClick: PropTypes.func,
        onNextClick: PropTypes.func,
        onOpenModal: PropTypes.func,
        requestMatch: PropTypes.any,
    }

    componentDidMount() {
        trackPageview(`/match/${this.props.state.uf}/?passo=4`);
    }

    onHelpClick = () => {
        this.props.signalOpenModal({modal: 'costume'});
    }

    onNextClick = () => {
        this.props.signalGoStep({step: '/prioridade1'});
        // this.props.signalGoStep({step: '/regiao'});
    }

    onBackClick = () => {
        this.props.signalSetField({path:'candidato.form.costume', value:''});
        this.props.signalGoStep({step: '/economia'});
    }

    getData = () => {
        const {list} = this.props;

        return list.map((v) => {
            return {label: v.text, value: v.id}
        });
    }

    render() {
        const {form, requestMatch: {loading}} = this.props;

        const {costume} = form;

        return <div className="Costume DefaultMatch">
            <HeaderMatch step={4} onBackClick={this.onBackClick} onHelpClick={this.onHelpClick}/>

            <Spacer vertical={1}/>

            <ContentMatch title={'Com qual das afirmações abaixo sobre a sociedade e os costumes você mais concorda?'}
                          text={'Escolha apenas 1 opção'}>
                <Scrollbar>
                    <ComponentConnect path="candidato.form.costume">
                        <Checks track={'pergunta4'} data={this.getData()} shuffle={true} scrollToBottom={true}/>
                    </ComponentConnect>
                </Scrollbar>

                <Spacer vertical={3}/>

                <Button title={'AVANÇAR'} disabled={!costume.isValid} loading={loading} onClick={this.onNextClick}/>
            </ContentMatch>
        </div>
    }
}

export default connect({
    list: state`app.config.costume`,
    form: form(state`candidato.form`),

    state: computeState,
    signalGoStep: signal`candidato.goStep`,
    requestMatch: state`candidato.requestMatch`,
    signalOpenModal: signal`app.openModal`,

    signalSetField: signal`form.setField`,
}, Costume);
