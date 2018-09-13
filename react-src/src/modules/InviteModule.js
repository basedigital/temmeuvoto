import {Module} from 'cerebral'

import {set, wait} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'

import {post, get, APIResponse} from "./services";
import {resetFormCustom} from "./FormModule";

export default Module({
    state: {
        requestInvite: APIResponse(),

        formEmail: {
            email: {
                value: null,
                validationRules: ['isRequired', 'isEmail'],
                isRequired: true,
            },
        }
    },
    signals: {
        sendInvite: [
            prepareSendInvite,
            ...post('api/sendInvite', 'invite.requestInvite', props`variables`), {
                success: [
                    () => {
                        alert("Mensagem enviada com sucesso!");
                    },

                    resetFormCustom(state`invite.formEmail`),
                    set(state`app.modal`, ''),
                    set(state`app.modalData`, null),
                ],
                error: [
                    ({state}) => {
                        alert(state.get('invite.requestInvite.result.error.message'));
                    }
                ]
            },
        ]
    }
});

function prepareSendInvite({props, forms}) {
    let data = forms.toJSON('invite.formEmail');
    data.template = props.template;
    data.url = props.url;

    props.variables = data;
}