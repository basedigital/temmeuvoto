import React, {Component} from 'react';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import cls from 'classnames';

import {Logo, Icon, Button, getRouter} from '../../components';

import Slider from "react-slick";

import './BemVindoPage.scss';
import {trackEvent} from "../../utils/GAUtil";

class BemVindoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {index: 0}
    }

    componentDidMount() {
        this.trackSlider(0)
    }

    componentWillUnmount() {

    }

    trackSlider = (index)=>{
        let label = '';
        switch(index) {
            case(0):
                label = 'bem-vindo';
                break;
            case(1):
                label = 'como-funciona';
                break;
            case(2):
                label = 'quem-somos';
                break;
            case(3):
                label = 'transparencia';
                break;
            case(4):
                label = 'vamos-comecar';
                break;
        }

        trackEvent('fase3/inicio', 'view', label);
    }

    afterChange = (index) => {
        this.trackSlider(index);

        this.setState({index});
    }

    onNextClick = () => {
        trackEvent('fase3/inicio', 'click', 'botao_comecar');

        getRouter().history.push('/localizacao');
    }
    onJumpClick= () => {
        trackEvent('fase3/inicio', 'click', 'link_pular');

        getRouter().history.push('/localizacao');
    }

    getData = () => {
        const data = [
            {
                image: require("./images/1.png"),
                imageMobile: require("./images/1-mobile.png"),
                title: 'Bem-<br/>Vindo',
                text: 'Você tem o poder de escolher quem estará à frente do Brasil nos próximos anos. Quem tem seu voto nessas eleições? A gente te ajuda a encontrar a melhor resposta.'
            },
            {
                image: require("./images/2.png"),
                imageMobile: require("./images/2-mobile.png"),
                title: 'Como <br/>Funciona',
                text: 'Reunimos aqui várias informações sobre os candidatos de 2018. Responda 7 perguntas e encontre aqueles que defendem suas ideias e propostas para nosso País.'
            },
            {
                image: require("./images/3.png"),
                imageMobile: require("./images/3-mobile.png"),
                title: 'Quem <br/>Somos',
                text: 'Somos um movimento apartidário e independente, formado por brasileiros como você, que quer ver uma mudança no cenário político do nosso País.'
            },
            {
                image: require("./images/4.png"),
                imageMobile: require("./images/4-mobile.png"),
                title: 'Trans<br/>parência',
                text: 'As informações contidas aqui são de fontes oficiais, públicas e seguras, como o TSE, STF, STJ, TRF e TJ de todos os Estados do País.'
            },
            {
                image: require("./images/5.png"),
                imageMobile: require("./images/5-mobile.png"),
                title: 'Vamos <br/>começar?',
                text: 'Agora iremos te ajudar a encontrar os 10 candidatos mais alinhados com o que você quer para o Brasil. Cabe a você se informar, refletir e decidir quem tem seu voto.',
                button: true
            },
        ]

        return data;
    }

    renderItems = () => {
        return this.getData().map((v, k) => {
            return <div key={k}
                        className={cls('ItemSlider', {'is-selected': k === this.state.index}, {'is-prev': k < this.state.index})}>
                <img src={this.isMobile() ? v.imageMobile : v.image}/>

                <div className={'ItemSlider__content'}>
                    <div className={'title'} dangerouslySetInnerHTML={{__html: v.title}}></div>
                    <div className={'text'} dangerouslySetInnerHTML={{__html: v.text}}></div>
                </div>

                {v.button && <Button theme={'dark-border'} title={'COMEÇAR'} onClick={this.onNextClick}/>}
            </div>
        });
    }

    isMobile = () => {
        const {media} = this.props;
        return !media.large && !media.medium
    }

    render() {
        const {index} = this.state;

        const settings = {
            dots: true,
            arrows: false,
            infinite: false,
            speed: 500,
            slidesToShow: this.isMobile() ? 1 : 2,
            slidesToScroll: 1,
            variableWidth: !this.isMobile(),
            afterChange: this.afterChange
        };

        return <div className="BemVindoPage">
            <Logo/>

            <Slider className={'page-' + this.state.index} {...settings}>
                {this.renderItems()}
            </Slider>

            {(index !== 4 || !this.isMobile()) && <div className={'btn-next'} onClick={this.onJumpClick}><span>PULAR</span> <Icon
                icon={Icon.icons.arrowSmallNext}></Icon></div>}

            <Button className={cls('btn-start', {'is-visible': index === 4})} theme={'dark-border'} title={'COMEÇAR'}
                    onClick={this.onNextClick}/>
        </div>
    }
}

export default connect({
    media: state`useragent.media`,
}, BemVindoPage);
