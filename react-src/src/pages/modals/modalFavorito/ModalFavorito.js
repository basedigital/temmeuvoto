import React from 'react';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import {
    ErrorRequest,
    Scrollbar,
    Spacer,
    Button,
    Loading,
    ModalBarTop,
    CandidatoVoto,
    getRouter
} from "../../../components";

import './ModalFavorito.scss';
import {trackPageview} from "../../../utils/GAUtil";

class ModalFavorito extends React.Component {

    constructor(props) {
        super(props);

        this.state = {notfound: false}
    }

    componentDidMount() {
        trackPageview('interna/meus-favoritos');

        this.fetchCandidatos();
    }

    onRetry = () => {
        this.fetchCandidatos();
    }

    fetchCandidatos = () => {
        try {
            const favorite = JSON.parse(localStorage.favorite);

            const candidatos = Object.keys(favorite).filter((v) => favorite[v]).map((v) => {
                return v;
            }).join(",");

            if (candidatos) {
                this.props.signalGetCandidatos({candidatos});
            } else {
                this.setState({notfound: true});
            }
        } catch (e) {
            this.setState({notfound: true});
        }
    }

    onInfoClick = ({id, position}) => {
        getRouter().history.push(`/politico/${id}/${position}/1`);
        this.props.onClose();
    }

    renderList = (list) => {
        const {requestGetCandidatos: {result}} = this.props;

        if (!result || !result.data || !result.data.list) {
            return <div className={'size-17 text-center'}>Nenhum candidato foi favoritado.</div>
        }

        return result.data.list.map((v, k) => {
            return <CandidatoVoto key={k} data={v} hideVote={true} onInfoClick={this.onInfoClick}/>
        })
    }

    render() {
        const {requestGetCandidatos} = this.props;

        const {loading, result, error} = requestGetCandidatos;

        if (loading) {
            return <div className={'LoadingCenter'}>
                <Loading/>
            </div>
        }

        if (error) {
            return <ErrorRequest onClick={this.onRetry}/>
        }

        return <ModalBarTop visible={true} onClose={this.props.onClose}>
            <div className={'ModalFavorito'}>
                <Spacer vertical={6}/>

                <div className={'size-20 medium text-center'}>Meus Favoritos</div>

                <Spacer vertical={2}/>

                <Scrollbar>
                    <div className={'list'}>
                        {this.renderList()}
                    </div>
                </Scrollbar>
            </div>
        </ModalBarTop>
    }
}

export default connect({
    signalGetCandidatos: signal`candidato.getFavoriteCandidatos`,

    requestGetCandidatos: state`candidato.requestFavoriteCandidatos`,

    media: state`useragent.media`,
}, ModalFavorito);
