import React, {Component} from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './ContentMatch.scss';

import {Icon, Spacer} from "../../../components";

class ContentMatch extends Component {
    static propTypes = {
        title: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,

        onHelpClick: PropTypes.func,
    }
    static defaultProps = {
        className: '',
    }

    render() {
        const {title, text} = this.props;

        return <div className={cls("ContentMatch", this.props.className)}>
            {!!title && <div className={'text-center light size-24 title-contentmatch'}>{title}</div>}

            {!!title &&  <Spacer vertical={2}/>}

            <div className={'text-and-help'}>
                {!!text && <div className={'color-gray78 medium italic text-left'}>{text}</div>}

                {this.props.onHelpClick && <div className={'btn-help'} onClick={this.props.onHelpClick}>
                    <Icon icon={Icon.icons.help} />
                </div>}
            </div>

            {this.props.children}
        </div>
    }
}

export default connect({}, ContentMatch);
