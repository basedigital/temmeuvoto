import * as React from 'react';

import PropTypes from 'prop-types';
import cls from 'classnames';

import {connect} from '@cerebral/react';
import {state} from 'cerebral/tags';

import './Spacer.scss';

class Spacer extends React.Component {
    static propTypes = {
        horizontal: PropTypes.number,
        vertical: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number,
        size: PropTypes.number,

        element: PropTypes.string,
        className: PropTypes.string
    }

    static defaultProps = {
        horizontal: 0,
        vertical: 1,
        element: 'div',
        size: 5,
    }

    render() {
        const {media, element, vertical, horizontal, left, right, top, bottom, className} = this.props;

        const size = (media.large || media.medium) ? this.props.size : this.props.size;

        let ml, mr, mt, mb;

        ml = mr = horizontal * size;
        mt = mb = vertical * size;

        if (left !== undefined) {
            ml = left * size;
        }
        if (right !== undefined) {
            mr = right * size;
        }
        if (top !== undefined) {
            mt = +top * size;
        }
        if (bottom !== undefined) {
            mb = +bottom * size;
        }

        let Elem = element;

        if (media.large || media.medium) {
            mt = (mt / 1440 * 100) + 'vw';
            ml = (ml / 1440 * 100) + 'vw';
            mb = (mb / 1440 * 100) + 'vw';
            mr = (mr / 1440 * 100) + 'vw';
        } else {
            mt = Math.round(mt)+"px";
            ml = Math.round(ml)+"px";
            mb = Math.round(mb)+"px";
            mr = Math.round(mr)+"px";
        }

        return <Elem
            style={{paddingTop: mt, paddingLeft: ml, paddingBottom: mb, paddingRight: mr}}
            className={cls('Spacer', className)}>
            {this.props.children}
        </Elem>;
    }
}

export default connect({media: state`useragent.media`}, Spacer);