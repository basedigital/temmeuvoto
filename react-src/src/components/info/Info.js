import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {Logo, Button, Spacer, getRouter} from '../';

import './Info.scss';

class Info extends React.PureComponent {
    static propTypes = {
        image:PropTypes.string,
        title:PropTypes.string,
        text:PropTypes.string,

        theme:PropTypes.string,
    }

    static defaultProps = {
        theme:'default',
    }

    onBackClick = () =>{
        getRouter().history.goBack();
    }

    render() {
        const {image, title, text, theme} = this.props;

        const color = theme === 'default' ? 'color-white' : 'color-dark';

        return <div className="Info">
            <div className="content">
                <Spacer vertical={4} />

                <Logo theme={theme}/>

                <Spacer vertical={6} />

                <img className="icon" src={image} />

                <Spacer vertical={4} />

                <div className={cls("title size-24 light", color)} dangerouslySetInnerHTML={{__html:title}}></div>

                <Spacer vertical={3} />

                <div className={cls("text size-24 light", color)} dangerouslySetInnerHTML={{__html:text}}></div>

                <Spacer vertical={6} />

                <Button title="VOLTAR" onClick={this.onBackClick} />

                <Spacer vertical={4} />
            </div>
        </div>;
    }
}

export default Info;
