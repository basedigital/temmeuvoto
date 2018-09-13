import React, { Component } from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import { Title, Spacer } from '../';

import './ContainerForm.scss';

class ContainerForm extends React.PureComponent {
    static propTypes = {
        title: PropTypes.string,
        subtitle: PropTypes.string,
    }

    render() {
        const { title, subtitle } = this.props;

        return <div className={cls('ContainerForm')}>
            <Spacer vertical={4}/>

            <Title title={title} subtitle={subtitle} />

            <Spacer vertical={4}/>

            {this.props.children}
        </div>
    }
}

export default ContainerForm;
