import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './BarTop.scss';

class BarTop extends React.PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return <div className='BarTop'>
            <div className={'content-bartop'}>
                <div className={'btn'} onClick={this.props.onClick}>
                    <img src={require("./images/icon-close.png")}/>
                </div>
            </div>
        </div>;
    }
}

export default BarTop;
