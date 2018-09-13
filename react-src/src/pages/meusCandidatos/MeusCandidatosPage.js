import React, {Component} from 'react';

import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './MeusCandidatosPage.scss';

import {
    ErrorRequest,
    Button,
    Scrollbar,
    Spacer,
    Loading,
    getRouter,
} from "../../components";

import ItemCandidato from "../match/listaCandidatos/itemCandidato/ItemCandidato";
import {getCargosList, getImage, shareEmail, shareFacebook, shareTwitter, shareWhats} from "../../utils/AppUtils";

import html2canvas from 'html2canvas';

import FormCad from './formCad/FormCad';
import ItemEmptyCandidato from "../match/listaCandidatos/itemEmptyCandidato/ItemEmptyCandidato";
import {trackEvent, trackPageview} from "../../utils/GAUtil";

class MeusCandidatosPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getCandidatos();

        if (!localStorage.uf) {
            localStorage.uf = 'SP';
        }

        trackPageview('fase3/meus-candidatos');

        window.scrollTo(0, 0);
    }

    onRetry = () => {
        this.getCandidatos();
    }

    getCandidatos = () => {
        const paramsCandidatos = this.props.match.params.candidatos;
        if (paramsCandidatos) {
            this.props.signalGetCandidatos({candidatos: paramsCandidatos, limit: 5});
            return;
        }

        let candidatos = localStorage.candidatos;

        try {
            candidatos = JSON.parse(candidatos);

            if (!!candidatos.pos_4 && !candidatos.pos_3) {
                candidatos.pos_3 = candidatos.pos_4;
                candidatos.pos_4 = null;

                localStorage.candidatos = JSON.stringify(candidatos);
            }

        } catch (e) {
            candidatos = {};
        }

        if (candidatos) {
            let listCandidatos = [];

            for(var i = 0; i < 5; i++) {
                const v = candidatos['pos_'+i];
                if (v) {
                    listCandidatos.push(v);
                }
            }

            this.props.signalGetCandidatos({candidatos: listCandidatos.join(","), limit: 5});
        } else {
            this.props.signalGetCandidatos({candidatos: '', limit: 5});
        }
    }

    onChangeCandidatoClick = (cargo, cargo_codigo, position) => {
        this.props.signalOpenModal({modal: 'pesquisar-candidatos', modalData: {cargo, cargo_codigo, position}})
    }

    renderCandidatos(cargos) {
        if (!localStorage.uf)
            return null;

        const {listMeusCandidatos} = this.props;

        return getCargosList(cargos, localStorage.uf).map((v, k) => {
            const pos = 'pos_' + v.position;


            if (listMeusCandidatos && listMeusCandidatos[pos]) {
                return <ItemCandidato key={k} data={listMeusCandidatos[pos]} position={v.position}
                                      onClick={this.onChangeCandidatoClick}/>
            } else
                return <ItemEmptyCandidato key={k} data={v} position={v.position}
                                           onClick={this.onChangeCandidatoClick}/>
        });
    }

    getCandidatosData = () => {
        const data = [];

        const {listMeusCandidatos, requestGetCandidatos: {result: {data: {cargos}}}} = this.props;

        getCargosList(cargos, localStorage.uf).map((v, k) => {
            const pos = 'pos_' + v.position;

            if (listMeusCandidatos && listMeusCandidatos[pos]) {
                data.push(listMeusCandidatos[pos]);
            }
        });

        return data;
    }

    getLinkShare = () => {
        const candidatos = this.getCandidatosData();

        if (candidatos) {
            const ids = candidatos.map((v) => v.id).join(',');
            return `https://temmeuvoto.com/share/candidatos/${ids}/1`
        } else {
            return 'https://temmeuvoto.com/';
        }
    }

    onMessageClick = () => {
        trackEvent('fase3/candidatos', 'view', 'compartilhe/email/open-form');
        shareEmail('candidatos', this.getLinkShare(), 'fase3/candidatos')
    }

    onFacebookClick = () => {
        trackEvent('fase3/candidatos', 'click', 'compartilhe/botao_facebook');
        shareFacebook(this.getLinkShare());
    }

    onTwitterClick = () => {
        trackEvent('fase3/candidatos', 'click', 'compartilhe/botao_twitter');

        const candidatos = this.getCandidatosData();

        if (candidatos) {
            const names = candidatos.map((v) => v.nome).join(',');

            const text = 'Esses são os candidatos que mais se alinham com o que eu quero para o Brasil. Eles #temmeuvoto ' + names + '. Entre aqui: www.temmeuvoto.com e descubra quais são os seus candidatos nas eleições 2018.';

            shareTwitter(text, this.getLinkShare());
        } else {
            shareTwitter('Para quem está indeciso: a plataforma www.temmeuvoto.com já está no ar trazendo informações sobre todos os candidatos. Acesse. Faça seu match. Compartilhe.', 'https://temmeuvoto.com');
        }
    }

    onPrintClick = () => {
        trackEvent('fase3/candidatos', 'click', 'imprima-lista/botao_imprimir');

        window.print();
    }

    onRestartPress = () => {
        trackEvent('fase3/candidatos', 'click', 'botao_recomecar');

        getRouter().history.replace('/localizacao');
    }

    onDownloadClick = () => {
        const print = document.body.querySelector(".print");
        print.style.display = "block";

        trackEvent('fase3/candidatos', 'click', 'imprima-lista/botao_download');

        html2canvas(print, {allowTaint: true}).then(function (canvas) {
            print.style.display = "none";

            var a = document.createElement('a');
            a.href = canvas.toDataURL("image/jpeg");
            a.target = '_blank';
            a.download = 'meus-candidatos.jpg';
            a.click();
        });
    }

    renderPrint = (cargos) => {
        const {listMeusCandidatos} = this.props;

        return <div className={'print'}>
            <img className={'bar'} src={require('./images/bar.png')}/>

            <div className={'list-print'}>
                {getCargosList(cargos, localStorage.uf).map((cargo, k) => {
                    const pos = 'pos_' + cargo.position;

                    const v = listMeusCandidatos[pos];

                    if (listMeusCandidatos && listMeusCandidatos[pos])
                        return <div className={'ItemPrint'} key={k}>
                            <div className={'cargo'}>{v.cargo}</div>

                            <div className={'content-itemprint'}>
                                <div className={'image'}><img crossOrigin="Anonymous" src={getImage(v.image)}/></div>

                                <div className={'info'}>
                                    <div className={'name medium'}>{v.nome}</div>
                                    <div className={'partido color-gray78'}>{v.partido}</div>
                                    <div className={'numero medium'}>{v.numero}</div>
                                </div>
                            </div>
                        </div>
                    else
                        return null
                })}
            </div>
        </div>
    }

    render() {
        const {requestGetCandidatos, media, formCad, requestSendCadastro, device} = this.props;

        const {loading, result, error} = requestGetCandidatos;

        if (loading) {
            return <div className={'LoadingCenter'}>
                <Loading/>
            </div>
        }

        if (error) {
            return <ErrorRequest onClick={this.onRetry}/>
        }

        if (!result) {
            return null;
        }

        const {data: {cargos}} = result;


        return <div className={'MeusCandidatosPage'}>
            {this.renderPrint(cargos)}

            <div className={'content-meuscandidatos'}>

                <Spacer vertical={4}/>

                <div className={'size-24 text-center medium t1'}>Agora é com você.</div>

                <Spacer vertical={2}/>

                <div className={'size-17 color-gray78 medium text-center t2'}>Esses são os candidatos mais alinhados ao
                    que
                    você deseja
                    para o Brasil.
                </div>

                <Spacer vertical={4}/>

                <Scrollbar>
                    <div className={'list'}>
                        <div className={'line'}></div>

                        <div className={'box'}>
                            <div>
                                <div className={'size-24 medium t3'}>Compartilhe</div>
                                <div className={'size-24 light t4'}>sua lista de candidatos</div>
                            </div>

                            <div className={'box-items'}>
                                {(device.type === 'mobile' || device.type === 'tablet') && <div>
                                    <a href={shareWhats(`Entrei no tememuvoto.com e descobri que esses candidatos têm as propostas que eu mais acredito. Eles #temmeuvoto. Entre aqui: https://temmeuvoto.com e descubra quais são os seus candidatos nas eleições 2018.`)}
                                       target={'_blank'}><img
                                        src={require("./../match/candidato/images/phone.png")}/></a>
                                </div>}

                                <div onClick={this.onMessageClick}>
                                    <img src={require("./../match/candidato/images/message.png")}/>
                                </div>

                                <div onClick={this.onTwitterClick}>
                                    <img src={require("./../match/candidato/images/twitter.png")}/>
                                </div>

                                <div onClick={this.onFacebookClick}>
                                    <img src={require("./../match/candidato/images/facebook.png")}/>
                                </div>
                            </div>
                        </div>

                        <div className={'line'}></div>

                        {(media.large || media.medium) && <div className={'box'}>
                            <div>
                                <div className={'size-24 medium t3'}>Imprima</div>
                                <div className={'size-24 light t4'}>sua lista de candidatos</div>
                            </div>

                            <div className={'box-items'}>
                                <div onClick={this.onPrintClick}>
                                    <img src={require("./images/print.png")}/>
                                </div>
                            </div>
                        </div>}

                        {(!media.large && !media.medium) && <div className={'box'}>
                            <div>
                                <div className={'size-24 medium t3'}>BAIXAR</div>
                                <div className={'size-24 light t4'}>a lista no celular</div>
                            </div>

                            <div className={'box-items'}>
                                <div onClick={this.onDownloadClick}>
                                    <img src={require("./images/download.png")}/>
                                </div>
                            </div>
                        </div>}

                        <div className={'line'}></div>

                        <div>
                            {this.renderCandidatos(cargos)}
                        </div>

                        <Spacer vertical={1}/>

                        <div className={'text-center'}>
                            <Button title={'RECOMEÇAR'} onClick={this.onRestartPress}/>
                        </div>

                        <Spacer vertical={2}/>

                        <div className={'line'}></div>

                        <FormCad/>
                    </div>
                </Scrollbar>
            </div>
        </div>
    }
}

export default connect({
    signalGetCandidatos: signal`candidato.getCandidatos`,
    signalOpenModal: signal`app.openModal`,

    listMeusCandidatos: state`candidato.listMeusCandidatos`,
    requestGetCandidatos: state`candidato.requestGetCandidatos`,

    device: state`useragent.device`,
    media: state`useragent.media`,
}, MeusCandidatosPage);
