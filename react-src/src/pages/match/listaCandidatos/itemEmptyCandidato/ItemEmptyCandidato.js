import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './ItemEmptyCandidato.scss';

import {Spacer, ButtonArrow} from "../../../../components";
import {getMemoryRouter} from "../../../../utils/RouterUtils";

class ItemEmptyCandidato extends Component {
    static propTypes = {
        data: PropTypes.any,
        position: PropTypes.any,

        candidato: PropTypes.any,
        onClick: PropTypes.any,
    }

    onClick = () => {
        const {data: {id, name}, position, onClick} = this.props;

        if (onClick) {
            this.props.onClick(name, id, position);
        } else {
            getMemoryRouter().history.replace(`/lista-tipo-candidatos/${id}/${position}`)
        }

    }

    isSenador2 = () => {
        const {data: {id, name}, position} = this.props;
        if (id == 5 && position == 4) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {id, name, total} = this.props.data;

        const isEmpty = false; //total * 1 === 0;

        return <div className={cls('ItemEmptyCandidato', {'is-empty': isEmpty})} onClick={this.onClick}>
            <div className={'text-left texts'}>
                <div className={'size-17 upper'}>{name}</div>
                {!isEmpty && !this.isSenador2() && <div className={'size-16 color-gray78 italic'}>Escolha um dos candidatos</div>}

                {!isEmpty && this.isSenador2() && <div className={'size-16 color-gray78 italic'}>Escolha mais um candidato<br/>(esse ano votamos em dois senadores)</div>}

                {isEmpty &&
                <div className={'size-16 color-gray78 italic'}>
                    <p>Sua busca não resultou nenhum candidato 100% alinhado com o que você deseja para o País.</p>
                    <p>Confira aqui a lista dos que mais se aproximam de seus ideais.</p>
                </div>}
            </div>

            {!isEmpty && <ButtonArrow title={'Escolher candidato'}/>}

            {isEmpty && <ButtonArrow title={'Ver lista'}/>}
        </div>
    }
}

export default ItemEmptyCandidato;
