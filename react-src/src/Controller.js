import { Controller, Module } from 'cerebral'
import Devtools from 'cerebral/devtools'
import FormsProvider from '@cerebral/forms'
import HttpProvider from '@cerebral/http'

import { state, props } from 'cerebral/tags';
import { toggle, set, wait } from 'cerebral/operators';

import Useragent from '@cerebral/useragent';

import AppModule from './modules/AppModule';
import FormModule from './modules/FormModule';

import { isRequired, isCpf, isDate } from './utils/CerebralUtils';

import Config from './Config';
import CandidatoModule from "./modules/CandidatoModule";
import InviteModule from "./modules/InviteModule";

const devtools = process.env.NODE_ENV == 'development' ? Devtools({ host: Config.CEREBRAL_DEBUGGER }) : null;

const rootModule = Module({
    state: {},
    signals: {},
    modules: {
        app: AppModule,
        form: FormModule,
        candidato: CandidatoModule,
        invite: InviteModule,

        useragent: Useragent({
            media: {
                extraSmall: '(min-width: 0px)',
                small: '(min-width: 768px)',
                medium: '(min-width: 1025px)',
                large: '(min-width: 1440px)'
            },

            feature: true,

            parse: {
                browser: true,
                device: true
            },

            offline: {
                checkOnLoad: false,
                interceptRequests: true,
                reconnect: {
                    initialDelay: 3,
                    delay: 1.5
                },
                requests: false
            },

            window: true
        })
    },
    providers: {
        http: HttpProvider({
            baseUrl: Config.ENDPOINT,
 
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
                'Cache-Control': 'max-age=3600, public',
            },

            withCredentials: false,
            timeout: 5000
        }),
        forms: FormsProvider({
            rules: {
                isRequired: isRequired,
                isCpf: isCpf,
                isDate: isDate,
            },

            errorMessages: {
                isRequired: () => 'Verifique o campo digitado.',
                isDate: () => 'Data inválida',
                isEmail(value) {
                    return `Verifique o seu email.`;
                },
                isCpf(value) {
                    return `CPF inválido. Digite novamente.`;
                },
                minLength(value, minLength) {
                    return `The length is ${value.length}, should be equal or more than ${minLength}`
                }
            }
        })
    }
});

export default Controller(rootModule, {
    devtools: devtools //IE11 não funciona
});