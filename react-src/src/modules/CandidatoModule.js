import {Module} from 'cerebral'

import {set, wait, concat, debounce} from 'cerebral/operators'
import {state, props} from 'cerebral/tags'

import {post, get, APIResponse} from "./services";
import {getMemoryRouter, getRouter} from "../utils/RouterUtils";
import {resetFormCustom} from "./FormModule";
import {getCargosList} from "../utils/AppUtils";

//teste
const goTest = process.env.NODE_ENV === 'development' ?
    [
     /*  ({state}) => {
            state.set('candidato.form.uf.value', 'RS');
            state.set('candidato.form.processo.value', 1);
            state.set('candidato.form.renovacao.value', 1);
            state.set('candidato.form.economia.value', 1);
            state.set('candidato.form.costume.value', 1);
            state.set('candidato.form.prioridade1.value', 1);
            state.set('candidato.form.prioridade2.value', 6);
        },

        prepareGoStep,

        ...get(props`url`, 'candidato.requestMatch'), {
        success: [
            () => {
                setTimeout(() => {
                    getMemoryRouter().history.replace('/lista-candidatos');
                    //getMemoryRouter().history.replace('/lista-tipo-candidatos/6'); //Deputado federal

                    //getMemoryRouter().history.replace('/lista-candidatos');

                    //getMemoryRouter().history.push('/confirmar-voto/2');
                    //getMemoryRouter().history.push('/candidato/7459');
                }, 200)
            }
        ],
        error: []
    },
        */

    ] : [];

export default Module({
    state: {
        requestMatch: APIResponse(),
        requestSearchCity: APIResponse(),
        requestSearchCityLatLng: APIResponse(),
        requestListCandidatos: APIResponse(),
        requestCandidato: APIResponse(),
        requestGetCandidatos: APIResponse(),
        requestSearchCandidato: APIResponse(),

        requestSendCadastro: APIResponse(),

        requestFavoriteCandidatos: APIResponse(),

        loading: false,
        uf: null,
        step: 0,

        listCandidatos: {},
        listMeusCandidatos: {},

        listTipoCandidatos: [],

        form: {
            uf: {
                value: null
            },
            processo: {
                value: null,
                isRequired: true,
            },
            renovacao: {
                value: null,
                isRequired: true,
            },
            prioridade1: {
                value: null,
                isRequired: true,
            },
            prioridade2: {
                value: null,
                isRequired: true,
            },
            ref_cidade: {
                value: null,
                isRequired: false,
            },
            cidade: {
                value: null,
                isRequired: false,
            },
            cidade_estado: {
                value: null,
                isRequired: false,
            },
            economia: {
                value: null,
                isRequired: true,
            },
            costume: {
                value: null,
                isRequired: true,
            },
            partido:{
                value:null,
                isRequired:false,
            }
        },

        formCad: {
            email: {
                value: '',
                validationRules: ['isRequired', 'isEmail'],
                // customErrorMessage: '',
                isRequired: true,
            },
            where: {
                value: '',
                validationRules: ['isRequired'],
                customErrorMessage: 'Selecione uma das opções',
                isRequired: true,
            },
        }
    },
    signals: {
        selectState: [
            set(state`candidato.step`, 0),
            set(state`candidato.listCandidatos`, {}),
            set(state`candidato.listTipoCandidatos`, []),

            set(state`candidato.requestMatch`, APIResponse()),
            set(state`candidato.requestSearchCity`, APIResponse()),
            set(state`candidato.requestSearchCityLatLng`, APIResponse()),
            set(state`candidato.requestListCandidatos`, APIResponse()),
            set(state`candidato.requestCandidato`, APIResponse()),

            resetFormCustom(state`candidato.form`),

            set(state`candidato.loading`, true),

            set(state`candidato.uf`, props`uf`),
            set(state`candidato.form.uf.value`, props`uf`),

            ({props}) => {
                props.url = `api/totalCandidatos/?uf=${props.uf}`
            },

            ...get(props`url`, 'candidato.requestMatch'), {
                success: [
                    wait(process.env.NODE_ENV === 'development' ? 0 : 1800),
                    set(state`candidato.loading`, false),

                    ...goTest,
                ],
                error: [
                    set(state`candidato.loading`, false),
                ]
            },
        ],
        goStep: [
            prepareGoStep,
            ...get(props`url`, 'candidato.requestMatch'), {
                success: [
                    ({props, state}) => {

                        /*let step;
                        switch (props.step) {
                            case('/processo'):
                                step = 1;
                                break;
                            case('/renovacao'):
                                step = 2;
                                break;
                            case('/economia'):
                                step = 3;
                                break;
                            case('/costume'):
                                step = 4;
                                break;
                            case('/regiao'):
                                step = 5;
                                break;
                            case('/prioridade1'):
                                step = 6;
                                break;
                            case('/prioridade2'):
                                step = 7;
                                break;
                        }

                        if (step)
                            state.set("candidato.step", step);
                        */

                        getMemoryRouter().history.replace(props.step)
                    }
                    //set(state`candidato.step`, props`step`),
                ],
                error: []
            },
        ],
        searchCityLatLng: [
            prepareSearchCityLatLng,

            ...get(props`url`, 'candidato.requestSearchCityLatLng'), {
                success: [
                    ({props, state}) => {
                        const {data} = props.response.result;

                        state.set('candidato.form.ref_cidade.value', data.id);
                        state.set('candidato.form.cidade.value', data.name);
                        state.set('candidato.form.cidade_estado.value', data.uf);
                    }
                ],
                error: []
            },
        ],
        setCity: [
            set(state`candidato.form.ref_cidade.value`, props`id`),
            set(state`candidato.form.cidade.value`, props`name`),
            set(state`candidato.form.cidade_estado.value`, props`uf`),
        ],
        searchCity: [
            debounce(500), {
                continue: [
                    prepareSearchCity,
                    ...get(props`url`, 'candidato.requestSearchCity'), {
                        success: [],
                        error: []
                    },
                ],
                discard: []
            }
        ],
        listCandidatos: [
            prepareListCandidatos,
            ...get(props`url`, 'candidato.requestListCandidatos'), {
                success: [
                    concat(state`candidato.listTipoCandidatos`, state`candidato.requestListCandidatos.result.data.list`)
                ],
                error: []
            },
        ],
        candidato: [
            prepareCandidato,
            ...get(props`url`, 'candidato.requestCandidato'), {
                success: [],
                error: []
            },
        ],
        confirmCandidato: [
            confirmCandidato
        ],
        resetListTipoCandidato: [
            set(state`candidato.listTipoCandidatos`, []),
            set(state`candidato.requestListCandidatos`, APIResponse()),
        ],
        getCandidatos: [
            prepareGetCandidatos,
            ...get(props`url`, 'candidato.requestGetCandidatos'), {
                success: [
                    ({state}) => {
                        const {list, cargos} = state.get('candidato.requestGetCandidatos.result.data');

                        let listMeusCandidatos = {};

                        getCargosList(cargos).map((cargo) => {
                            const candidato = list.filter((v) => v.cargo_codigo == cargo.id);

                            if (candidato.length > 0) {
                                if (cargo.position == 4) { //segundo senador
                                    listMeusCandidatos['pos_4'] = candidato[1] ? candidato[1] : null;
                                } else {
                                    listMeusCandidatos['pos_' + cargo.position] = candidato[0];
                                }
                            }
                        });

                        state.set('candidato.listMeusCandidatos', listMeusCandidatos);
                    }
                ],
                error: []
            },
        ],
        getFavoriteCandidatos: [
            prepareGetCandidatos,
            ...get(props`url`, 'candidato.requestFavoriteCandidatos'), {
                success: [],
                error: []
            },
        ],
        searchCandidato: [
            debounce(500), {
                continue: [
                    prepareSearchCandidato,
                    ...get(props`url`, 'candidato.requestSearchCandidato'), {
                        success: [],
                        error: [
                            set(state`candidato.requestSearchCandidato`, APIResponse()),
                        ]
                    },
                ],
                discard: []
            }
        ],
        sendCadastro: [
            prepareSendCadastro,
            ...post('api/cadastro', 'candidato.requestSendCadastro', props`variables`), {
                success: [
                    () => {
                        alert("Cadastro efetuado com sucesso!");
                    },

                    resetFormCustom(state`candidato.formCad`),
                ],
                error: [
                    ({state}) => {
                        alert(state.get('candidato.requestSendCadastro.result.error.message'));
                    }
                ]
            },
        ]
    }
});

function prepareSendCadastro({props, forms}) {
    let data = forms.toJSON('candidato.formCad');
    props.variables = data;
}

function confirmCandidato({props, state}) {
    const listCandidatos = state.get('candidato.listCandidatos');

    if (props.saveStorage) {
        let candidatos = {};

        try {
            candidatos = localStorage.candidatos ? JSON.parse(localStorage.candidatos) : {};
        } catch (e) {

        }

        candidatos['pos_' + props.position] = props.candidato.id;

        localStorage.setItem('candidatos', JSON.stringify(candidatos));
    } else {
        listCandidatos['pos_' + props.position] = props.candidato;
        state.set('candidato.listCandidatos', listCandidatos);
    }
}

function prepareSearchCityLatLng({props, state}) {
    props.url = `api/searchCityLatLng/${props.lat}/${props.lng}/${state.get('candidato.uf')}`;
}

function prepareSearchCity({props, state}) {
    props.url = `api/searchCity/${props.search}/${state.get('candidato.uf')}`;
}

function prepareCandidato({props, state}) {
    props.url = `api/candidato/${props.ref_candidato}`;
}

function prepareListCandidatos({props, state, forms}) {
    const data = forms.toJSON('candidato.form');

    const query = Object.keys(data).filter(v => !!data[v]).map((v) => {
        return `${v}=${data[v]}`
    }).join('&');

    props.url = `api/listCandidatos/?${query}&ref_cargo=${props.ref_cargo}&page=${props.page}`;
}

function prepareGoStep({state, props, forms}) {
    const data = forms.toJSON('candidato.form');

    const query = Object.keys(data).filter(v => !!data[v]).map((v) => {
        return `${v}=${data[v]}`
    }).join('&');

    props.url = `api/totalCandidatos/?${query}`;
}

function prepareGetCandidatos({state, props}) {
    const candidatos = props.candidatos.split(",").sort().join(",");

    props.url = `api/getCandidatos/${candidatos}`;
}

function prepareSearchCandidato({props, state}) {
    props.url = `api/searchCandidato/${props.search}/${props.cargo_codigo}`;
}
