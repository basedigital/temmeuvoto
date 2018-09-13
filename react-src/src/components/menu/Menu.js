import React from 'react';

import {connect} from '@cerebral/react';
import {signal, state} from 'cerebral/tags';

import cls from 'classnames';

import {Link, withRouter} from 'react-router-dom';
import {matchRoutes} from 'react-router-config';

import {LogoResponsive} from '../';

import './Menu.scss';

class Menu extends React.Component {
    isHide = () => {
        const foundRoute = matchRoutes([{
            path: '/', exact: true,
        }], this.props.location.pathname)

        return foundRoute.length > 0
    }

    onOpenModal = (modal) => {
        this.props.signalCloseMenu();

        this.props.signalOpenModal({modal});
    }

    renderLinks = () => {
        const {modal} = this.props;

        const links = [
            {label: 'Início', modal: null, to: '/localizacao',},
            {label: 'Meus Candidatos', modal: null, to: '/candidatos'},
            {label: 'Sobre', modal: 'sobre'},
            {label: 'Como Funciona', modal: 'como-funciona'},
            {label: 'De Onde Vem os Dados', modal: 'de-onde-vem-os-dados'},
            {label: 'Quem Somos', modal: 'quem-somos'},
            {label: 'Convidar Amigos', modal: 'convidar-amigos'},
            {label: 'Tecnologia', modal: 'tecnologia'},
            {label: 'Meus Favoritos', modal: 'meus-favoritos'},
            // {label: 'Base de Dados', modal: 'base-de-dados'},
            {
                label: 'Pesquisar Candidato',
                modal: 'pesquisar-candidatos',
                icon: <img className={'icon'} src={require("./images/search.png")}/>
            },
        ]

        return links.map((v, k) => {
            const Comp = v.to ? Link : 'a';

            const isSelected = (!v.to && modal === v.modal) || (!this.props.modal && v.to && matchRoutes([{path: v.to}], this.props.location.pathname).length > 0)

            const isDisabled = (!v.to && !v.modal);

            return <Comp key={k} className={cls({'is-selected': isSelected}, {'is-disabled': isDisabled})}
                         onClick={this.onOpenModal.bind(this, v.modal)} to={v.to}>{v.label} {v.icon}</Comp>
        })
    }

    isDesktop = () => {
        const {media} = this.props;
        return media.large || media.medium;
    }

    onCloseMenu = () => {
        this.props.signalCloseMenu();
    }

    render() {
        const {modal, menu} = this.props;

        if (this.isHide())
            return null;

        return <div className={cls('Menu', {'is-open': !this.isDesktop() && menu})}>
            <div className={'content-menu'}>
                <div className={'btn-close'} onClick={this.onCloseMenu}>
                    <img src={require("./images/close.png")}/>
                </div>

                <LogoResponsive/>

                {this.renderLinks()}

                <div className={'line'}></div>

                <a className={cls('small', {'is-selected': modal === 'fale-conosco'})}
                   onClick={this.onOpenModal.bind(this, 'fale-conosco')}>Fale conosco</a>

                <a className={cls('small', {'is-selected': modal === 'politica-de-privacidade'})}
                   onClick={this.onOpenModal.bind(this, 'politica-de-privacidade')}>Política de
                    Privacidade<br/>e Termos de Uso</a>

                <a className={cls('small btn-white')} href={'https://temmeuvoto.com/candidato'} target={'_blank'}>Sou Candidato</a>

            </div>
        </div>
    }
}

export default withRouter(connect({
    media: state`useragent.media`,

    signalCloseMenu: signal`app.closeMenu`,
    menu: state`app.menu`,

    signalOpenModal: signal`app.openModal`,
    modal: state`app.modal`,
}, Menu));