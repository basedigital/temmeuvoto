import {Module} from 'cerebral'

import {set, wait, when} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'

import {post, get, APIResponse} from "./services";

export default Module({
    state: {
        requestInit: APIResponse(),
        config: null,

        modal: '',
        modalData: null,

        menu: false,
    },
    signals: {
        openModal: [
            set(state`app.modal`, props`modal`),
            ({props, state}) => {
                if (props.modalData) {
                    state.set('app.modalData', props.modalData);
                }
            },
        ],
        closeModal: [
            set(state`app.modal`, null),
            set(state`app.modalData`, null)
        ],

        openMenu: [
            set(state`app.menu`, true)
        ],
        closeMenu: [
            set(state`app.menu`, false)
        ],

        initApp: [
            ...get('api/config', 'app.requestInit'), {
                success: [
                    set(state`app.config`, props`response.result`)
                ],
                error: []
            }
        ]
    }
});