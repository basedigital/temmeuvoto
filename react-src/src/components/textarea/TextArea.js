import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import './TextArea.scss';

class TextArea extends React.PureComponent {
    static propTypes = {
        placeholder:PropTypes.string,
        value:PropTypes.string,

        onChange:PropTypes.func,
        onBlur:PropTypes.func,

        error:PropTypes.string,
    }

    static defaultProps = {
    }

    render() {
        const {placeholder, value, error, maxLength} = this.props;

        return <div className={cls('TextArea', {'is-error':!!error})}> 
            <textarea value={value} placeholder={placeholder} onChange={this.props.onChange} onBlur={this.props.onBlur} maxLength={maxLength}/>
            
            <div className="count">{maxLength - (value ? value.length : 0)} caracteres</div>

            {!!error && <div className="error">{error}</div>}
        </div>
    }
}

export default TextArea;
