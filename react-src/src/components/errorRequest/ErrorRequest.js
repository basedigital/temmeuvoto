import React from 'react';

import PropTypes from 'prop-types';

import {Button, Spacer} from '../';

import './ErrorRequest.scss';

class ErrorRequest extends React.PureComponent {
    static propTypes = {
        onClick: PropTypes.func
    }

    render() {
        return <div className="ErrorRequest">
            <div className={'content'}>
                <div className={'size-34 light'}>Aviso!</div>

                <Spacer/>

                <div className={'size-20 light'}>Houve um erro ao carregar as informações.</div>

                <Spacer vertical={2}/>

                <Button title={'Tentar Novamente'} onClick={this.props.onClick} theme={'dark'}></Button>
            </div>
        </div>;
    }
}

export default ErrorRequest;
