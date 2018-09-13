import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {Spacer} from '../';

import './Title.scss';

class Title extends React.PureComponent {
    static propTypes = {
        title:PropTypes.string,
        subtitle:PropTypes.string,
    }

    render() {
        const {title, subtitle} = this.props;

        return <div className={cls('Title')}> 
           <div className="size-36 color-grayc1 medium">{title}</div>
           <Spacer vertical={2}/>
           <div className="size-24 color-gray78 subtitle" dangerouslySetInnerHTML={{__html:subtitle}}></div>
        </div>
    }
}

export default Title;
