import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state} from 'cerebral/tags';

import cls from 'classnames';

import './LoadingState.scss';
import computeState from "../../modules/compute/computeState";

class LoadingState extends React.PureComponent {
    static propTypes = {
        onComplete: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.count = 0;

        this.state = {loading: false};
    }

    handleImageLoaded = () => {
        this.count += 1;
        if (this.count >= 2) {
            this.setState({loading: true})
        }
    }

    render() {
        let {state} = this.props;

        if (!state || !state.uf)
            return null;

        const uf = state.uf.toLowerCase();

        return <div className={cls("LoadingState", {'is-start': this.state.loading})}>
            <div className={'content-loadingstate'}>
                <div className={'loading fill'}>
                    <img src={`images/loading/${uf}.png`} onLoad={this.handleImageLoaded}/>
                </div>

                <div className={'loading none'}>
                    <img src={`images/loading/${uf}2.png`} onLoad={this.handleImageLoaded}/>
                </div>
            </div>

            <div className={'size-34 light text-loading'}>Carregando lista de candidatos <br/>para o estado d{state.prep} <span
                className={'medium'}>{state.name}</span>.
            </div>
        </div>;
    }
}

export default connect({state: computeState}, LoadingState);
