import {set, wait} from 'cerebral/operators';
import {state, props} from 'cerebral/tags';
import {httpGet, httpPost, httpPut, httpPatch, httpDelete} from '@cerebral/http/operators';

export function get(url, pathname, resetState = false) {
    return [
        set(state`${pathname}.url`, url),
        ({state, props}) => startRequest(state, props, pathname, resetState),
        httpGet(url), {
            success: [
                ({state, props}) => httpSuccess(state, props, pathname),
            ],
            error: [
                ({state, props}) => httpError(state, props, pathname),
            ],
        },
        (context) => endRequest(context, pathname),
    ]
}


export function post(url, pathname, data, resetState = false) {
    return [
        set(state`${pathname}.url`, url),
        ({state, props}) => startRequest(state, props, pathname, resetState),
        ({http, path, resolve}) => {
            return http.request({
                method: 'POST',
                url: resolve.value(url),
                body: resolve.value(data),
                /*headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },*/
            }).then((response) => {
                //alert(JSON.stringify(response));
                return path.success({response});
            }).catch((error) => {
                return path.error({error});
            })
        },{
            success: [
                ({state, props}) => httpSuccess(state, props, pathname),
            ],
            error: [
                ({state, props}) => httpError(state, props, pathname),
            ]
        },
        (context) => endRequest(context, pathname),

        /*httpPost(url, data), {
            success: [
                ({state, props}) => httpSuccess(state, props, pathname),
            ],
            error: [
                ({state, props}) => httpError(state, props, pathname),
            ]
        },
        (context) => endRequest(context, pathname),
        */
    ]
}

function endRequest(context, pathname) {
    const state = context.state;
    state.set(`${pathname}.loading`, false);

    if (context.path) {
        const error = state.get(`${pathname}.error`);
        return (error) ? context.path.error() : context.path.success();
    }
}

function startRequest(state, props, pathname, resetState) {
    state.set(`${pathname}.loading`, true);
    state.set(`${pathname}.pristine`, false);

    if (resetState) {
        state.set(`${pathname}.result`, null)
    }
}

function httpSuccess(state, props, pathname) {
    state.set(`${pathname}.error`, false);
    state.set(`${pathname}.result`, props.response.result);
    state.set(`${pathname}.status`, props.response.status);
    state.set(`${pathname}.success`, true);
}

function httpError(state, props, pathname) {
    state.set(`${pathname}.error`, true);
    state.set(`${pathname}.result`, props.error.response.result);
    state.set(`${pathname}.status`, props.error.response.status || 404);
    state.set(`${pathname}.success`, false);
}

export function APIResponse(obj = {}) {
    obj.pristine = true;
    obj.loading = false; //true | false
    obj.status = null; //200 , 400 , 404 .. etc
    obj.result = null; // {json}
    obj.error = false; //true | false
    return obj;
}
