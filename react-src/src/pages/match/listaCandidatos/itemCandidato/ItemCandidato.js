import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './ItemCandidato.scss';

import {Spacer, ButtonArrow} from "../../../../components";
import {getMemoryRouter} from "../../../../utils/RouterUtils";
import {getImage} from "../../../../utils/AppUtils";

class ItemCandidato extends Component {
    static propTypes = {
        data: PropTypes.any,
        position: PropTypes.any,

        onClick: PropTypes.func,
    }

    onClick = () => {
        const {data: {cargo, cargo_codigo}, position, onClick} = this.props;

        if (onClick) {
            this.props.onClick(cargo, cargo_codigo, position);
        } else {
            getMemoryRouter().history.replace(`/lista-tipo-candidatos/${cargo.id}/${position}`)
        }
    }

    render() {
        const {id, nome, partido, numero, image, cargo} = this.props.data;

        return <div className={cls('ItemCandidato')} onClick={this.onClick}>
            <div className={'size-18 light text-left'}>{cargo && cargo.name ? cargo.name : cargo}</div>

            <Spacer/>

            <div className={'wrap-itemcandidato'}>
                <div className={'content-itemcandidato'}>
                    <div className={'image'} style={{backgroundImage: `url(${getImage(image)})`}}></div>

                    <Spacer horizontal={2}/>

                    <div>
                        <div className={'size-18'}>{nome}</div>
                        <Spacer vertical={1}/>
                        <div className={'size-17 color-gray78'}>{partido}</div>
                        <div className={'size-17'}>{numero}</div>
                    </div>

                    <Spacer horizontal={1}/>
                </div>

                <ButtonArrow title={'Alterar Candidato'}/>
            </div>

            <div className={'btn-change-mobile'}>
                <ButtonArrow title={'Alterar Candidato'}/>
            </div>
        </div>
    }
}

export default ItemCandidato;
