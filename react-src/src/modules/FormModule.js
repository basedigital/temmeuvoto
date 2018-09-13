import { Module } from 'cerebral';

import { set } from 'cerebral/operators';
import { setField, resetForm } from '@cerebral/forms/operators';
import { state, props } from 'cerebral/tags';
import { push, splice } from 'cerebral/operators';

import findIndex from 'lodash/findIndex';
import {APIResponse} from "./services";

export default Module({
    state: {},
    signals: {
        setField: [
            setField(state`${props`path`}`, props`value`),
            set(state`${props`path`}.focus`, true),
        ],
       
        untouchedField: [set(state`${props`path`}.touched`, false)],
       
        touchedField: [set(state`${props`path`}.touched`, true)],
       
        touchForm: [touchForm],

        toggleFieldArray: [
            ({ state, props }) => {
                if (!state.get(props.path).value) {
                    state.set(props.path + '.value', []);
                }
            },
            ({ state, props, path }) => {
                const list = state.get(props.path).value;

                const value = props.value;

                const index = !!props.key
                    ? findIndex(list, [props.key, value[props.key]])
                    : list.indexOf(value);

                if (index > -1) {
                    return path.remove({ index });
                } else {
                    return path.push();
                }
            },
            {
                remove: [splice(state`${props`path`}.value`, props`index`, 1)],
                push: [push(state`${props`path`}.value`, props`value`)],
            },
        ],

        resetRequest: [
            ({state, props}) => {
                state.set(props.path, APIResponse());
            }
        ],
        resetForm: [
            //resetForm(state`${props`path`}`),
            resetFormCustom(state`${props`path`}`),
        ],
        /*
        setFieldDefault: [
            setField(state`${props`path`}`, props`value`),
            set(state`${props`path`}.focus`, false),
            set(state`${props`path`}.isPristine`, true)
        ],
        focusField: [
            set(state`${props`path`}.focus`, props`value`)
        ],


        addValueArr: [
            ({state, props}) => {
                if (!state.get(props.path)) {
                    state.set(props.path, []);
                }
            },
            when(state`${props`path`}`, props`value`, props`key`, (list, value, key) => {
                if (key === undefined)
                    key = 'id';

                const id = value[key];
                const found = findIndex(list, [key, id])
                return found > -1 ? true : false;
            }), {
                true: [],
                false: [
                    push(state`${props`path`}`, props`value`)
                ]
            }
        ],
        removeValueArr: [
            ({state, props}) => {
                const list = state.get(props.path);

                const key = props.key || 'id'; //utilizado caso seja passado um objeto no "props.value"
                const id = props.value instanceof Object ? props.value[key] : props.value;

                const index = findIndex(list, [key, id])

                props.index = index;
            },
            splice(state`${props`path`}`, props`index`, 1)
        ]*/
    },
});

function touchForm({ state, props: { form, fields } }) {
    if (!form) {
        throw new Error(`touchForm: property "form" invalid!`);
    }

    if (!fields) {
        fields = Object.keys(state.get(form));
    }

    fields.map(v => {
        state.set(`${form}.${v}.touched`, true);
    });
}



export function resetFormCustom(formPath) {
    function resetFormTouched(_ref) {
        const state = _ref.state;
        const resolve = _ref.resolve;

        const path = resolve.path(formPath);

        state.set(path, resetObject(state.get(path)));
    }

    return [resetForm(formPath), resetFormTouched];
}

function resetObject(form) {
    return Object.keys(form).reduce(function (newForm, key) {
        if (form[key] === Object(form[key])) {
            if (Array.isArray(form[key])) {
                newForm[key] = resetArray(form[key])
            } else if ('value' in form[key]) {
                newForm[key] = Object.assign({}, form[key], {
                    focus: false,
                    touched: false,
                })
            } else {
                newForm[key] = resetObject(form[key])
            }
        }

        return newForm
    }, {})
}

function resetArray(formArray) {
    return formArray.reduce(function (newFormArray, form, index) {
        newFormArray[index] = resetObject(form);
        return newFormArray;
    }, []);
}

/*
export function setForm(state, path, data) {
    Object.keys(data).map((v) => {
        state.set(`${path}.${v}.value`, data[v]);
    });
}

export function isFormTouched(form) {
    let touched = true;

    Object.values(form).map((v) => {
        if (v.validationRules && v.validationRules.indexOf('isRequired') > -1) {
            if (!v.touched)
                touched = false;
        }
    });

    return touched;
}


*/
