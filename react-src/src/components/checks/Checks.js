import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import {Check, Spacer} from '../';

import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';
import {trackClickText} from "../../utils/GAUtil";

import './Checks.scss';

class Checks extends React.Component {
    static propTypes = {
        data: PropTypes.array,
        value: PropTypes.any,

        column: PropTypes.number,

        type: PropTypes.string,
        shuffle: PropTypes.bool,
        scrollToBottom: PropTypes.bool,

        onChange: PropTypes.func,
    }

    static defaultProps = {
        column: 1,
        small: false,
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let data = this.props.data;

        if (this.props.shuffle) {
            data = shuffle(data);
        }

        this.data = data;
    }

    onClick = (value, label) => {
        const {media, scrollToBottom} = this.props;

        this.props.onBlur();

        const sendValue = this.props.value === value ? '' : value;

        this.props.onChange(sendValue);

        if (sendValue) {
            trackClickText(label, this.props.track);
        }

        if (!media.large && !media.medium && scrollToBottom) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    renderColumn = (list) => {
        const {value, type} = this.props;
        return list.map((v) => {
            return <Check key={v.label} label={v.label} value={v.value} type={type} checked={v.value === value}
                          onClick={this.onClick}/>
        })
    }

    render() {
        const data = this.data;
        if (!data)
            return null;

        const {error, column} = this.props;

        const size = Math.ceil(data.length / column);

        const list = column > 1 ? chunk(data, size) : [data];

        return <div className={cls('Checks')}>

            <div className={"columns"}>
                {list.map((v, k) => {
                    return <div className={cls('column', {'is-float': list.length > 1})} key={k}>
                        {this.renderColumn(v)}
                    </div>
                })}
            </div>

            {!!error && <div className="error">{error}</div>}
        </div>
    }
}

export default connect({media: state`useragent.media`}, Checks);
