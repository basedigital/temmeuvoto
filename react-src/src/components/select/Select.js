import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import './Select.scss';

class Select extends React.PureComponent {
    static propTypes = {
        placeholder: PropTypes.string,
        value: PropTypes.string,

        onChange: PropTypes.func,
        onBlur: PropTypes.func,

        error: PropTypes.string,

        data: PropTypes.array,
    }

    static defaultProps = {}

    renderItems = () => {
        const {data} = this.props;
        return data.map((v) => (<option key={v.id} value={v.id} selected={v.id == this.props.value}>{v.name}</option>))
    }

    getLabel = () => {
        const {value, data} = this.props;
        if (!data)
            return '';

        const item = data.filter((v) => v.id == value);

        if (!value || item.length === 0)
            return '';

        return item[0].name;
    }

    onChange = (evt) => {
        this.props.onChange(evt);
        this.props.onBlur(evt);
    }

    render() {
        const {placeholder, value, error} = this.props;

        return <div className={cls('Select', {'is-error': !!error})}>
            <div className={'wrap-select'}>
                <input className="input" readOnly={true} placeholder={placeholder} value={this.getLabel()}/>

                <div className="arrow">
                    <img src={require("./images/arrow.png")}/>
                </div>

                <select onChange={this.onChange}>
                    <option value={''}>{placeholder}</option>
                    {this.renderItems()}
                </select>
            </div>

            {!!error && <div className="error">{error}</div>}
        </div>
    }
}

export default Select;
