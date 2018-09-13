import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './Economia.scss';

import {Button, Checks, Spacer, Scrollbar, ComponentConnect, computeState} from "../../../components";

import HeaderMatch from '../headerMatch/HeaderMatch';
import ContentMatch from '../contentMatch/ContentMatch';
import {trackPageview} from "../../../utils/GAUtil";

class Economia extends Component {
    static propTypes = {
        onBackClick: PropTypes.func,
        onNextClick: PropTypes.func,
        onOpenModal: PropTypes.func,
        requestMatch: PropTypes.any,
    }

    componentDidMount() {
        trackPageview(`/match/${this.props.state.uf}/?passo=3`);
    }

    onHelpClick = () => {
        this.props.signalOpenModal({modal:'economia'});
    }

    onNextClick = () => {
        this.props.signalGoStep({step:'/costume'});
    }

    onBackClick = () => {
        this.props.signalSetField({path:'candidato.form.economia', value:''});
        this.props.signalGoStep({step:'/renovacao'});
    }


    getData = () => {
        const {list} = this.props;

        return list.map((v) => {
            return {label: v.text, value: v.id}
        });
    }

    render() {
        const {form, requestMatch:{loading}} = this.props;

        const {economia} = form;

        return <div className="Economia DefaultMatch">
            <HeaderMatch step={3} onBackClick={this.onBackClick} onHelpClick={this.onHelpClick}/>

            <Spacer vertical={1}/>

            <ContentMatch title={'Com qual das três afirmações abaixo sobre a economia e o bem-estar social você mais concorda?'}
                          text={'Escolha apenas 1 opção'}  onHelpClick={this.onHelpClick}>
                <Scrollbar>
                    <ComponentConnect path="candidato.form.economia">
                        <Checks track={'pergunta3'} data={this.getData()} shuffle={true} type={'economia'} scrollToBottom={true}/>
                    </ComponentConnect>
                </Scrollbar>

                <Spacer vertical={3}/>

                <Button title={'AVANÇAR'} disabled={!economia.isValid} loading={loading} onClick={this.onNextClick}/>
            </ContentMatch>
        </div>
    }
}

export default connect({
    list: state`app.config.economia`,
    form:form(state`candidato.form`),

    state: computeState,
    signalGoStep: signal`candidato.goStep`,
    requestMatch: state`candidato.requestMatch`,
    signalOpenModal: signal`app.openModal`,

    signalSetField: signal`form.setField`,
}, Economia);
