import * as React from 'react';
import {render} from 'react-dom';

import App from "./App";
import './styles/main.scss';

import {AppContainer} from 'react-hot-loader';
const rootEl = document.getElementById('app');

render(<AppContainer><App/></AppContainer>, rootEl);

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(
            <AppContainer>
                <NextApp/>
            </AppContainer>,
            rootEl,
        );
    });
}