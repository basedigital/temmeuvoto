import React from 'react';

import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state} from 'cerebral/tags';

import ScrollWrapper from 'react-customized-scrollbar'

import './Scrollbar.scss';

class Scrollbar extends React.Component {
    componentDidMount() {
        // setTimeout(() => {
        //     var evt = window.document.createEvent('UIEvents');
        //     evt.initUIEvent('resize', true, false, window, 0);
        //     window.dispatchEvent(evt);
        // })

        this.interval = setInterval(this.verifyScroll, 1000);
        setTimeout(() => this.verifyScroll());
    }

    verifyScroll = () => {
        const elem = document.querySelector('.scrollbar-vertical');
        if (elem) {
            if (elem.clientHeight == 0) {
                elem.parentElement.style.visibility = 'hidden';
            } else {
                elem.parentElement.style.visibility = 'visible';
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {media} = this.props;

        if (!media.large && !media.medium) {
            return <div className={cls('Scrollbar', this.props.className)}>
                {this.props.children}
            </div>
        }

        return <ScrollWrapper wrapperClassNames={cls('Scrollbar', this.props.className)}
                              verticalTrackClassNames={"track-vertical"}
                              horizontalTrackClassNames={"track-horizontal"}
                              verticalScrollClassNames={"scrollbar-vertical"}
                              horizontalScrollClassNames={"scrollbar-horizontal"}>
            {this.props.children}
        </ScrollWrapper>
    }
}

export default connect({media: state`useragent.media`}, Scrollbar);