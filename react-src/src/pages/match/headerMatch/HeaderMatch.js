import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {connect} from '@cerebral/react';
import {state, signal} from 'cerebral/tags';

import './HeaderMatch.scss';

import {ButtonArrow, Icon} from "../../../components";

class HeaderMatch extends Component {
    static propTypes = {
        onBackClick: PropTypes.func,
        onHelpClick: PropTypes.func,
    }

    onMenuClick = () => {
        this.props.signalOpenMenu();
    }

    render() {
        const {step, media} = this.props;

        return <div className="HeaderMatch">
            <div className={'item-left'}>
                {(this.props.onBackClick) &&  <ButtonArrow title={'Voltar'} left={true} onClick={this.props.onBackClick}/>}
            </div>

            {step && <div className={'size-17 color-gray78'}>Passo <span className={'color-black'}>{step}</span> - 6</div>}

            <div className={'item-right'}>
                {this.props.onHelpClick && <div className={'btn btn-help'} onClick={this.props.onHelpClick}>
                    <Icon icon={Icon.icons.help} />
                </div>}

                {(!media.large && !media.medium) && <div className={'btn'} onClick={this.onMenuClick}>
                    <Icon icon={Icon.icons.menu} />
                </div>}
            </div>
        </div>
    }
}

export default connect({media: state`useragent.media`, signalOpenMenu:signal`app.openMenu`}, HeaderMatch);
