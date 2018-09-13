import React, {Component} from 'react';
import './Bg.scss';

class Bg extends React.PureComponent {

    render() {
        return <div className='Bg'>
            {this.props.children}
        </div>;
    }
}

export default Bg;
