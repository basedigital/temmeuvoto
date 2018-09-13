import React from 'react';

import PropTypes from 'prop-types';

import { connect } from '@cerebral/react';
import { field } from '@cerebral/forms';

import { state, signal, props } from 'cerebral/tags';

export class ComponentConnect extends React.Component {
    static propTypes = {
        path: PropTypes.string.isRequired,

        value: PropTypes.any,
        field: PropTypes.any,

        signalSetField: PropTypes.any,
        signalTouchedField: PropTypes.any,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { path, value, signalSetField } = this.props;

        if (value) {
            signalSetField({ path, value });
        }
    }

    onBlur = (child, event) => {
        const { path, signalTouchedField } = this.props;
        signalTouchedField({ path });

        if (child.props.onBlur) {
            child.props.onBlur(event);
        }
    };

    onChange = (child, event, ...args) => {
        const { path, signalSetField } = this.props;

        const value = event && event.target ? event.target.value : event;

        signalSetField({ path, value });

        if (child.props.onChange) {
            child.props.onChange(event, ...args);
        }
    };

    render() {
        const {
            field: { touched, errorMessage, customErrorMessage, value, isValid },
        } = this.props;

        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                onChange: this.onChange.bind(this, child),
                onBlur: this.onBlur.bind(this, child),
                value,
                error: touched && !isValid ? (customErrorMessage ? customErrorMessage : errorMessage) : null,
                touched,
            });
        })[0];
    }
}

export default connect(
    {
        field: field(state`${props`path`}`),
        signalSetField: signal`form.setField`,
        signalTouchedField: signal`form.touchedField`,
    },
    ComponentConnect
);
