import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';
import {form} from '@cerebral/forms';

import './ListaTipoCandidato.scss';

import {
    Scrollbar,
    Button,
    Spacer,
    CandidatoVoto,
    Loading,
    ErrorRequest,
    Select, ComponentConnect
} from "../../../components";

import ContentMatch from '../contentMatch/ContentMatch';
import HeaderMatch from '../headerMatch/HeaderMatch';
import {getMemoryRouter} from "../../../utils/RouterUtils";
import {trackPageview} from "../../../utils/GAUtil";
import computeState from "../../../modules/compute/computeState";

class ListaTipoCandidato extends Component {
    static propTypes = {}

    constructor(props) {
        super(props);

        this.state = {gender: null, page: 0};
    }

    componentDidMount() {
        trackPageview(`/match/${this.props.state.uf}/?cargo=${this.getNomeCargo()}`);

        this.props.signalListCandidatos({ref_cargo: this.props.match.params.ref_cargo, page: 0})
    }

    getNomeCargo = () => {
        const {position, ref_cargo} = this.props.match.params;

        const listCargo = [
            {id: 1, name: "Presidente"},
            {id: 2, name: "Vice-precidente"},
            {id: 3, name: "Governador"},
            {id: 4, name: "Vice-Governador"},
            {id: 5, name: "Senador"},
            {id: 6, name: "Deputado Federal"},
            {id: 7, name: "Deputado Estadual"},
            {id: 8, name: "Deputado Distrital"},
            {id: 9, name: "1 Suplente"},
            {id: 10, name: "2 Suplunte"}]

        let cargo = listCargo.filter(v => v.id == ref_cargo)[0].name.toLowerCase().replace(" ", "-");

        //SENADOR
        if (ref_cargo == 5) {
            if (position == 3)
                cargo = cargo+"1";
            else
                cargo = cargo+"2";
        }

        return cargo;
    }

    trackTipoCandidato() {
        const cargo = this.getNomeCargo();

        const genero = !this.state.gender ? 'todos' : this.state.gender.toLowerCase();

        const partido = !this.props.partido ? 'todos' : this.props.partido;

        trackPageview(`/match/${this.props.state.uf}/?cargo=${cargo}&genero=${genero}&partido=${partido}`);
    }

    componentWillUnmount() {
        this.props.signalResetListTipoCandidato()
        this.props.setField({path: 'candidato.form.partido', value: ''});
    }

    onPartidoChange = () => {
        this.props.signalResetListTipoCandidato();

        this.setState({page: 0}, () => {
            this.props.signalListCandidatos({ref_cargo: this.props.match.params.ref_cargo, page: 0})
            setTimeout(() => {
                this.trackTipoCandidato();
            })
        })
    }

    onHelpClick = () => {
        this.props.signalOpenModal({modal: 'lista-candidatos'});
    }

    onRetry = () => {
        this.props.signalListCandidatos({ref_cargo: this.props.match.params.ref_cargo, page: this.state.page})
    }

    onNextPage = () => {
        const {requestListCandidatos: {loading}} = this.props;

        if (loading)
            return;

        const page = this.state.page + 1;

        this.setState({page: page});

        this.props.signalListCandidatos({ref_cargo: this.props.match.params.ref_cargo, page})
    }

    onBackClick = () => {
        getMemoryRouter().history.replace('/lista-candidatos');
    }

    onFilterClick = (data) => {
        this.setState({gender: data.value}, () => {
            this.trackTipoCandidato();
        });
    }

    renderFilters = () => {
        const list = [
            {label: 'Todos', value: null},
            {label: 'Homem', value: 'masculino'},
            {label: 'Mulher', value: 'feminino'}
        ];

        return list.map((v, k) => {
            return <div key={k}
                        className={cls('item-filter size-18', 'medium', {'is-selected': v.value === this.state.gender})}
                        onClick={this.onFilterClick.bind(this, v)}>{v.label}</div>
        });
    }

    getFilteredList = () => {
        const {listTipoCandidatos, listCandidatos} = this.props;
        const {position, ref_cargo} = this.props.match.params;

        if (!listTipoCandidatos)
            return null;

        let list = listTipoCandidatos;
        if (this.state.gender) {
            list = listTipoCandidatos.filter((v) => v.genero.toLowerCase() === this.state.gender);
        }

        if (ref_cargo == 5) {
            let exclude = [];

            if (listCandidatos.pos_3) {
                exclude.push(listCandidatos.pos_3.id * 1);
            }
            if (listCandidatos.pos_4) {
                exclude.push(listCandidatos.pos_4.id * 1);
            }

            list = list.filter((v) => exclude.indexOf(v.id * 1) == -1);
        }

        return list;
    }

    renderList = (list) => {
        if (list.length === 0) {
            return <div>
                <div className={'size-17 color-gray78 text-center'}>Infelizmente os filtros aplicados não encontraram
                    nenhum(a) candidato(a)<br/> alinhado às suas ideias e proposta para o país.
                </div>
            </div>
        }

        // const {step} = this.props;
        const {position, ref_cargo} = this.props.match.params;

        return list.map((v) => {
            return <CandidatoVoto key={v.id} data={v} position={position} hideBar={(ref_cargo == 3 || ref_cargo == 1)}/>
        })
    }

    render() {
        const {requestListCandidatos, partidos, partido} = this.props;

        const {loading, error, result} = requestListCandidatos;

        if (loading && this.state.page === 0)
            return <div className={'LoadingCenter'}>
                <Loading/>
            </div>

        if (error) {
            return <ErrorRequest onClick={() => this.onRetry}/>
        }

        if (!result) {
            return null;
        }

        const {data: {cargo, list}} = result;

        const listFiltred = this.getFilteredList();

        return <div className="ListaTipoCandidato DefaultMatch">
            <HeaderMatch onBackClick={this.onBackClick} onHelpClick={this.onHelpClick}/>

            <ContentMatch>
                <Spacer vertical={2}/>

                <div className={'size-24'}>{cargo.name}</div>

                <Spacer/>

                <div className={'size-17 color-gray78 italic t3'}>Ao clicar em cada candidato abaixo você encontrará
                    suas
                    principais informações e uma descrição de suas propostas para o País.
                </div>

                <Spacer vertical={2}/>

                <div className={'filters'}>
                    {this.renderFilters()}

                    <ComponentConnect path={"candidato.form.partido"}>
                        <Select placeholder={'Todos os Partidos'} value={partido} data={partidos.map((v) => {
                            return {id: v.partido, name: v.partido}
                        })} onChange={this.onPartidoChange}/>
                    </ComponentConnect>
                </div>

                <Spacer/>

                <Scrollbar>
                    <div className={'list'}>
                        {this.renderList(listFiltred)}

                        <Spacer vertical={2}/>

                    </div>

                    {list.length === 10 && listFiltred.length > 0 && <div className={'text-center'}>
                        <Button title={'VER MAIS'} loading={loading} onClick={this.onNextPage}></Button>
                    </div>}
                </Scrollbar>

                <Spacer vertical={2}/>
            </ContentMatch>
        </div>
    }
}

export default connect({
    state: computeState,

    partido: state`candidato.form.partido.value`,

    partidos: state`app.config.partidos`,

    signalOpenModal: signal`app.openModal`,

    requestListCandidatos: state`candidato.requestListCandidatos`,

    listTipoCandidatos: state`candidato.listTipoCandidatos`,

    signalListCandidatos: signal`candidato.listCandidatos`,

    listCandidatos: state`candidato.listCandidatos`,

    // step:state`candidato.step`,

    signalResetListTipoCandidato: signal`candidato.resetListTipoCandidato`,
    setField: signal`form.setField`,
}, ListaTipoCandidato);
