import React from 'react';
import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import Routes from './Routes';
import {Loading, ErrorRequest} from "./components";

class Stage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.signalInitApp();
    }

    onTryPress = () => {
        this.props.signalInitApp();
    }

    getMediaType = () => {
        const {media} = this.props;

        let mediaType = 'extraSmall'; //mobile tablet < 1024
        if (media.large) {
            mediaType = 'large'; // >= 1440
        } else if (media.medium) {
            mediaType = 'medium'; // > 1024  // < 1440
        } else if (media.small) {
            mediaType = 'small'; // > 768 < 1024 //TABLET VERTICAL
        }

        return mediaType;
    }

    render() {
        const {user, requestInit} = this.props;

        const {loading, error, status} = requestInit;

        return <div className={cls("Stage", "is-" + this.getMediaType())}>
            <div id="container-modal"></div>

            {!!loading && <div className={'loading-center'}>
                <Loading/>
            </div>}

            {status === 200 && <Routes/>}

            {!!error && <ErrorRequest onClick={this.onTryPress}/>}
        </div>;
    }
}

export default connect({
    requestInit: state`app.requestInit`,
    signalInitApp: signal`app.initApp`,
    media: state`useragent.media`
}, Stage);