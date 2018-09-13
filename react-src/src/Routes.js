import React, {Component} from 'react';
import {BrowserRouter, MemoryRouter, Route, Switch, withRouter} from "react-router-dom";

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import {setRouter} from './utils/RouterUtils';

import LocalizacaoPage from "./pages/localizacao/LocalizacaoPage";
import BemVindoPage from "./pages/bemvindo/BemVindoPage";
import MatchPage from "./pages/match/MatchPage";
import MeusCandidatosPage from "./pages/meusCandidatos/MeusCandidatosPage";
import CandidatoPage from "./pages/candidato/CandidatoPage";
import ConfirmarVotoPage from "./pages/confirmarVoto/ConfirmarVotoPage";

import Modals from "./pages/modals/Modals";

import {Menu} from './components';

class Routes extends Component {
    static propTypes = {
        authenticated: PropTypes.bool,
    }

    initRouter = (elem) => {
        if (elem && elem.context) {
            setRouter(elem.context.router);
        }
    }

    render() {
        const {media, loading} = this.props;

        const basename = document.getElementsByTagName('base')[0].getAttribute('href');

        const TypeRouter = BrowserRouter;

        return <TypeRouter basename={basename}>
            <Route ref={this.initRouter}>
                <div className={'Routes'}>
                    <Menu/>

                    <div className={'container-page'}>
                        <Modals/>

                        <RouterScrollTop>
                            <Switch>
                                <Route path="/" exact component={BemVindoPage}/>

                                <Route path="/localizacao" component={LocalizacaoPage}/>

                                <Route path="/match/:uf" component={MatchPage}/>

                                <Route path="/candidatos/:candidatos" component={MeusCandidatosPage}/>

                                <Route path="/candidatos" component={MeusCandidatosPage}/>

                                <Route path="/politico/:ref_candidato/:position/:page" component={CandidatoPage}/>

                                <Route path="/politico/:ref_candidato/:position" component={CandidatoPage}/>

                                <Route path="/politico/:ref_candidato/" component={CandidatoPage}/>

                                <Route path="/confirmar-voto/:ref_candidato/:position" component={ConfirmarVotoPage}/>

                                <Route path="/" component={() => <h1>NotFound</h1>}/>
                            </Switch>
                        </RouterScrollTop>
                    </div>
                </div>
            </Route>
        </TypeRouter>;
    }
}

export default connect({media: state`useragent.media`}, Routes);

const RouterScrollTop = withRouter(class extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (!!nextProps.location && !!this.props.location && nextProps.location.pathname !== this.props.location.pathname)
            window.scrollTo(0, 0);
    }

    render() {
        return this.props.children
    }
})