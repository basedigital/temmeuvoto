import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import {
    Favorite,
    Spacer,
    Loading,
    Scrollbar,
    ErrorRequest,
    Button,
    CandidatoInfo,
    getRouter, ButtonArrow, ModalBarTop
} from "../../../components";

import ContentMatch from '../contentMatch/ContentMatch';
import HeaderMatch from '../headerMatch/HeaderMatch';

import {getMemoryRouter} from "../../../utils/RouterUtils";

import './Candidato.scss';
import {
    formatNumber,
    normatizeLink,
    shareEmail,
    shareFacebook,
    shareTwitter,
    shareWhats
} from "../../../utils/AppUtils";
import {trackPageview} from "../../../utils/GAUtil";
import computeState from "../../../modules/compute/computeState";

class Candidato extends Component {
    static propTypes = {}

    constructor(props) {
        super(props);

        this.state = {modalAcoes: false};
    }

    componentDidMount() {
        this.getCandidato();
    }

    onRetry = () => {
        this.getCandidato();
    }

    getCandidato = () => {
        this.props.signalCandidato({ref_candidato: this.getParams().ref_candidato});
    }

    getParams = () => {
        return this.isPage() ? this.props : this.props.match.params;
    }

    onBackClick = () => {
        if (this.isPage()) {
            //favorito
            if (this.props.page == "1") {
                this.props.signalOpenModal({modal: 'meus-favoritos'})
            }

            try {
                getRouter().history.goBack();
            } catch (e) {
                getRouter().history.replace('/');
            }
        } else {
            getMemoryRouter().history.goBack();
        }
    }

    onVoteClick = (id) => {
        let {position} = this.getParams();

        if (this.isPage()) {
            getRouter().history.push(`/confirmar-voto/${id}/${position}`)
        } else {
            getMemoryRouter().history.push(`/confirmar-voto/${id}/${position}`)
        }
    }

    isPage = () => {
        return !!this.props.ref_candidato;
    }

    renderCurriculo = (data) => {
        const list = [
            {key: 'partido', label: 'Partido'},
            {key: 'numero', label: 'Número'},
            {key: 'data_nascimento', label: 'Data de nascimento'},
            {key: 'idade', label: 'Idade'},
            {key: 'estado_civil', label: 'Estado Civil'},
            {key: 'genero', label: 'Gênero'},
            {key: 'cor_raca', label: 'Cor/raça'},
            {key: 'naturalidade', label: 'Naturalidade'},
            {key: 'municipio_nasc', label: 'Cidade de Nascimento'},
            {key: 'escolaridade', label: 'Escolaridade'},
            {key: 'ocupacao', label: 'Ocupação/Profissão'},
            {key: 'coligacao', label: 'Coligação'},
            {key: 'social_email', label: 'E-mail'},
        ]

        return list.map((v, k) => {
            if (!data[v.key])
                return null;

            return <div className="item size-16 color-gray9a" key={k}><span
                className={'color-gray1c'}>{v.label}:</span> {data[v.key]}</div>
        })
    }

    renderBens = (data) => {
        return data.bens.map((v, k) => {
            return <div className="item size-16 color-gray9a"
                        key={k}>{v.tipo + ' - ' + 'R$ ' + formatNumber(v.valor.replace(",", ".") * 1)}</div>
        })
    }

    onShowAcoes = () => {
        this.setState({modalAcoes: true});
    }

    renderAcoes = (data) => {
        if (!data)
            return null;

        if (data.fl_reu == 0 && data.fl_investigado == 0 && data.fl_condenado == 0) {
            return <div className={'size-16 color-gray78 italic'}>Não foram encontrados processos ou inquéritos contra esse candidato referentes à crimes contra a administração pública (improbidade administrativa, corrupção, peculato, lavagem de dinheiro, formação de quadrilha, entre outros)</div>;
        } else {
            return <div>
                {(data.fl_reu == 1 || data.fl_investigado == 1) && <div className={'size-16 color-gray78 italic'}>O candidato possui processo(s).</div>}

                {data.fl_condenado == 1 && <div className={'size-16 color-gray78 italic'}>O candidato foi condenado.</div>}

                <Spacer/>

                <ButtonArrow title={'Ver evidências'} onClick={this.onShowAcoes}/>
            </div>
        }
    }

    renderModalAcoes = (data) => {
        return <div className={'ModalAcoes'}>
            <div className={'size-28 text-center t1'}>PROCESSOS E CONDENAÇÕES</div>

            <Scrollbar>
                <div className={'list'}>
                    {data.acao.map((v, k) => {
                        return <div className={'item'} key={k}>
                            {v.name && <div className={'medium size-18'}>{v.name}</div>}

                            {v.name && <Spacer/>}

                            <div className={'size-14'}>{v.description}</div>

                            {v.link && <Spacer/>}

                            {v.link && <a href={v.link} target={'_blank'}>
                                <ButtonArrow title={'VER MAIS'} onClick={null}/>
                            </a>}
                        </div>
                    })}
                </div>
            </Scrollbar>
        </div>
    }

    isExistSocial = (data) => {
        const {social_facebook, social_instagram, social_twitter, social_doacao, social_site, social_youtube} = data;

        if (!!social_facebook || !!social_instagram || !!social_twitter || !!social_doacao || !!social_site || !!social_youtube) {
            return true;
        }

        return false;
    }

    onShareEmail = () => {
        shareEmail('candidato', this.getLinkShare(), 'fase3/candidato');
    }

    onShareFacebook = () => {
        shareFacebook(this.getLinkShare());
    }

    onShareTwitter = () => {
        shareTwitter('Para quem está indeciso: a plataforma www.temmeuvoto.com já está no ar trazendo informações sobre todos os candidatos. Acesse. Faça seu match. Compartilhe.', this.getLinkShare());
    }

    getLinkShare = () => {
        return `https://temmeuvoto.com/share/politico/${this.getParams().ref_candidato}/2`;
    }

    renderPactoDemocracia = (data) => {
        const {fl_pacto_demo} = data;

        return null;

        return <div>
            <div className={'size-16 color-gray1c'}>Comprometido com as Novas Medidas Contra a Corrupção:</div>

            <Spacer vertical={.5}/>

            <div className={'size-16 color-gray78'}>{fl_pacto_demo ? 'SIM' : 'NÃO'}</div>

            <Spacer vertical={1}/>

            <div className={'size-14 color-gray1c'}>Para saber mais acesse: <a className={'color-gray78'} href={"http://www.unidoscontraacorrupcao.org.br"} target={"_blank"}>www.unidoscontraacorrupcao.org.br</a></div>

            <div className={'line'}/>

            <Spacer/>
        </div>
    }

    render() {
        const {requestCandidato: {loading, result, error}, device, media} = this.props;

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

        const {data: {id, eleito_8, social_facebook, social_instagram, social_twitter, social_doacao, social_site, social_youtube, social_email, prioridade1, prioridade2, detalhamento, detalhamento2}} = result;


        return <div className="Candidato DefaultMatch">
            <TrackCandidato data={result.data} state={this.props.state}/>

            <ModalBarTop visible={this.state.modalAcoes} noAddClass={true}
                         onClose={() => this.setState({modalAcoes: false})}>
                {this.renderModalAcoes(result.data)}
            </ModalBarTop>

            <HeaderMatch step={null} onBackClick={this.onBackClick} onHelpClick={null}/>

            {!this.state.modalAcoes && <ContentMatch>
                <Scrollbar>
                    <div className={'list'}>
                        <Spacer vertical={2}/>

                        <CandidatoInfo data={result.data}/>

                        <Spacer vertical={5}/>

                        <div className={'favorites'}>
                            <div className={'size-15 text-favorite'}>Adicionar aos favoritos para decidir depois</div>
                            <div>
                                <Favorite id={id}/>
                            </div>
                        </div>

                        <div className={'line line-mt'}/>

                        <div className={'size-16 medium'}>PROCESSOS E CONDENAÇÕES</div>
                        <Spacer vertical={.5}/>

                        {this.renderAcoes(result.data)}

                        <div className={'line'}/>

                        <div className={'size-16 medium'}>PROPOSTAS</div>
                        <Spacer vertical={.5}/>
                        <div className={'size-16 color-gray78 italic'}>Veja o que o candidato tem a dizer sobre os temas
                            de
                            seu
                            interesse.
                        </div>

                        <Spacer vertical={2}/>

                        <div className={'size-16 medium'}>{prioridade1.nome}</div>
                        {detalhamento && <Spacer vertical={.5}/>}
                        {detalhamento && <div className={'size-16 color-gray78 italic'}>{detalhamento}</div>}

                        <Spacer vertical={2}/>

                        <div className={'size-16 medium'}>{prioridade2.nome}</div>
                        {detalhamento2 && <Spacer vertical={.5}/>}
                        {detalhamento2 && <div className={'size-16 color-gray78 italic'}>{detalhamento2}</div>}

                        <div className={'line'}/>

                        <div className={'size-16 medium'}>CURRÍCULO</div>

                        {this.renderCurriculo(result.data)}

                        <div className="item size-16 color-gray9a"><span className={'color-gray1c'}>Já ocupou cargos públicos no passado: </span>{eleito_8 == 1 ? 'Sim' : 'Não'}
                        </div>

                        {!!result.data.bens && <div className={'item size-16 color-gray1c'}>Declaração de bens:</div>}

                        {this.renderBens(result.data)}

                        <div className={'line'}/>

                        {this.renderPactoDemocracia(result.data)}

                        <Spacer vertical={1}/>

                        {this.isExistSocial(result.data) && <div>
                            <div className={'size-16 color-gray1c medium'}>PERFIL SOCIAL DO CANDIDATO</div>

                            <Spacer vertical={2}/>

                            <div className={'size-16 medium color-gray78'}>ACESSE:</div>

                            <Spacer/>

                            <div className={'socials'}>
                                {!!social_site &&
                                <a href={normatizeLink(social_site, 'site')} target={'_blank'}><img src={require("./images/link.png")}/></a>}
                                {!!social_doacao && <a href={normatizeLink(social_doacao, 'site')} target={'_blank'}><img
                                    src={require("./images/message.png")}/></a>}
                                {!!social_facebook && <a href={normatizeLink(social_facebook, 'facebook')} target={'_blank'}><img
                                    src={require("./images/facebook.png")}/></a>}
                                {!!social_instagram && <a href={normatizeLink(social_instagram, 'instagram')} target={'_blank'}><img
                                    src={require("./images/instagram.png")}/></a>}
                                {!!social_twitter &&
                                <a href={normatizeLink(social_twitter, 'twitter')} target={'_blank'}><img src={require("./images/twitter.png")}/></a>}
                                {!!social_youtube &&
                                <a href={normatizeLink(social_youtube, 'youtube')} target={'_blank'}><img src={require("./images/youtube.png")}/></a>}
                            </div>

                            <Spacer vertical={1}/>

                            <div className={'line'}/>

                            <Spacer vertical={1}/>
                        </div>}

                        <div>
                            <div className={'size-16 color-gray1c medium'}>QUERO CONTRIBUIR COM<br/>A CAMPANHA DO
                                CANDIDATO
                            </div>

                            <Spacer vertical={2}/>

                            <div className={'size-16 medium color-gray78'}>COMPARTILHE:</div>

                            <Spacer/>

                            <div className={'socials'}>
                                <div onClick={this.onShareEmail}><img src={require("./images/message.png")}/></div>

                                {(device.type == 'mobile' || device.type == 'tablet') && <a href={shareWhats('Para quem está indeciso: a plataforma http://temmeuvoto.com já está no ar trazendo informações sobre todos os candidatos. É muito simples: basta responder a poucas perguntas e #temmeuvoto encontra os candidatos que mais se aproximam dos seus ideais. Acesse. Faça seu match. Compartilhe.')} target={'_blank'}><img
                                    src={require("./images/phone.png")}/></a>}

                                <div onClick={this.onShareFacebook}><img src={require("./images/facebook.png")}/></div>
                                <div onClick={this.onShareTwitter}><img src={require("./images/twitter.png")}/></div>
                            </div>
                        </div>

                        <Spacer vertical={4}/>

                        <div className={'text-center'}>
                            <Button title={'TEM MEU VOTO'} onClick={this.onVoteClick.bind(this, id)}></Button>
                        </div>

                        <Spacer vertical={2}/>
                    </div>
                </Scrollbar>
            </ContentMatch>}
        </div>
    }
}

function TrackCandidato(props) {
    var tracking = false;

    if (!tracking) {
        const {nome, partido, cargo, genero} = props.data;

        trackPageview(`/match/${props.state.uf}/?saibamais=1&cargo=${cargo.name}&genero=${genero}&partido=${partido}&nome=${nome}`)
    }

    return null;
}

export default connect({
    requestCandidato: state`candidato.requestCandidato`,

    media: state`useragent.media`,
    device: state`useragent.device`,
    state:computeState,

    signalOpenModal: signal`app.openModal`,
    signalCandidato: signal`candidato.candidato`,
}, Candidato);
