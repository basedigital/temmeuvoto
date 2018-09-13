import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Spacer, ButtonArrow} from "../../../components";

import './BoxMap.scss';

class BoxMap extends React.PureComponent {
    static propTypes = {
        state: PropTypes.shape({
            id: PropTypes.any,
            name: PropTypes.string,
            uf: PropTypes.string,
        }),
        onChangeClick: PropTypes.func,
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {state: {name, image}} = this.props;

        return <div className='BoxMap'>

            <div className={'image'}>
                <img src={'images/estados/' + image}/>
            </div>

            <div className={'content'}>
                <img src={require("./images/pin.png")}/>

                <Spacer vertical={.5}/>

                <div className={'size-26 medium'}>{name}</div>

                <div className={'size-15 medium text'}>baseado na sua localização atual</div>

                <Spacer/>

                <ButtonArrow title={'Alterar'} onClick={this.props.onChangeClick}/>
            </div>

        </div>
    }
}

export default BoxMap;
