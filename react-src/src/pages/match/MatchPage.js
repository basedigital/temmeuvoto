import React, {Component} from 'react';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './MatchPage.scss';

import {Button, LoadingState, getRouter, computeState, Spacer} from "../../components";

import Home from './home/Home';
import ProcessoCondenacao from './processoCondenacao/ProcessoCondenacao';
import Renovacao from './renovacao/Renovacao';
import Prioridade1 from './prioridade1/Prioridade1';
import Prioridade2 from './prioridade2/Prioridade2';
// import Regiao from './regiao/Regiao';
import Economia from './economia/Economia';
import Costume from './costume/Costume';

import ListaCandidatos from './listaCandidatos/ListaCandidatos';
import ListaTipoCandidato from './listaTipoCandidato/ListaTipoCandidato';

import ConfirmarVoto from "./confirmarVoto/ConfirmarVoto";
import Candidato from "./candidato/Candidato";
import Transparencia  from "./transparencia/Transparencia";

import FooterMatch from './footerMatch/FooterMatch';

import {MemoryRouter, Route, withRouter, Switch} from 'react-router-dom'
import {getMemoryRouter, setMemoryRouter} from "../../utils/RouterUtils";
import {matchRoutes} from 'react-router-config';

class MatchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {loading: true};
    }

    componentDidMount() {
        const {params} = this.props.match;

        if (!params.uf)
            getRouter().replace('/localizacao');

        this.props.signalSelectState({uf: this.props.match.params.uf});

        setTimeout(() => {
            this.setState({loading:false});
        }, 400);
    }

    initMemoryRouter = (elem) => {
        if (elem && elem.context) {
            setMemoryRouter(elem.context.router);
        }
    }

    isShowFooter = () => {
        if (!getMemoryRouter())
            return false;

        const foundRoute = matchRoutes([
                {path: '/', exact: true},
                {path: '/lista-candidatos'},
                {path: '/transparencia'},
                {path: '/lista-tipo-candidatos'}],
            getMemoryRouter().history.location.pathname);

        return foundRoute.length === 0
    }

    render() {
        const {loadingState} = this.props;

        // if (loadingState || this.state.loading)
        //     return <LoadingState/>

        return <div className="MatchPage">
            <div className={'content-match'}>

                <MemoryRouter>
                    <Route ref={this.initMemoryRouter}>
                        <div className={'wrap-content-match'}>
                            {(loadingState || this.state.loading) && <LoadingState/>}

                            {(!loadingState && !this.state.loading) && <ScrollToTop>
                                <Switch>
                                    <Route exact path="/" component={Home}/>

                                    <Route path="/processo" component={ProcessoCondenacao}/>

                                    <Route path="/renovacao" component={Renovacao}/>

                                    <Route path="/economia" component={Economia}/>

                                    <Route path="/costume" component={Costume}/>

                                    {/*<Route path="/regiao" component={Regiao}/>*/}

                                    <Route path="/prioridade1" component={Prioridade1}/>

                                    <Route path="/prioridade2" component={Prioridade2}/>

                                    <Route path="/transparencia" component={Transparencia}/>

                                    <Route path="/lista-candidatos" component={ListaCandidatos}/>

                                    <Route path="/lista-tipo-candidatos/:ref_cargo/:position" component={ListaTipoCandidato}/>

                                    <Route path="/confirmar-voto/:ref_candidato/:position" component={ConfirmarVoto}/>

                                    <Route path="/politico/:ref_candidato/:position" component={Candidato}/>
                                </Switch>
                            </ScrollToTop>}
                        </div>
                    </Route>
                </MemoryRouter>
            </div>

            {this.isShowFooter() && <FooterMatch/>}
        </div>
    }
}

class WrapScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

const ScrollToTop = withRouter(WrapScrollToTop);

export default connect({
    request: state`candidato.requestMatch`,

    signalSelectState: signal`candidato.selectState`,
    loadingState: state`candidato.loading`,
}, MatchPage);
