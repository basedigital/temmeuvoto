import React, {Component} from 'react';
import Controller from "./Controller";
import {Container} from '@cerebral/react'

import Stage from './Stage';

export default class App extends Component {

    render() {
        return <Container controller={Controller}>
            <Stage/>
        </Container>
    }
}