import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import InputMask from 'react-input-mask';

import './TextInput.scss';

class TextInput extends React.PureComponent {
    static propTypes = {
        placeholder:PropTypes.string,
        value:PropTypes.string,

        onChange:PropTypes.func,
        onBlur:PropTypes.func,

        error:PropTypes.string,

        mask:PropTypes.string,

        type:PropTypes.string,
    }

    static defaultProps = {
        type:'text',
    }

    render() {
        const {placeholder, value, error, type, mask} = this.props;

        const Comp = mask ? InputMask : "input";

        return <div className={cls('TextInput', {'is-error':!!error})}> 
            <Comp type={type} mask={mask} value={value} autoComplete={'off'} placeholder={placeholder} onChange={this.props.onChange} onBlur={this.props.onBlur}/>
          
            {!!error && <div className="error">{error}</div>}
        </div>
    }
}

export default TextInput;
