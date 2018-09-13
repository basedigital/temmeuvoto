import moment from 'moment';

export function isCpf(value, form, arg) {
    value = value.split('.').join('').replace("-", "");

    if(value.length!=11){
        return false;
    }
    let Soma;
    let Resto;
    Soma = 0;
    if (value == "00000000000" ||
        value == "11111111111" ||
        value == "22222222222" ||
        value == "33333333333" ||
        value == "44444444444" ||
        value == "55555555555" ||
        value == "66666666666" ||
        value == "77777777777" ||
        value == "88888888888" ||
        value == "99999999999") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(value.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(value.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(value.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(value.substring(10, 11))) return false;

    return true;
}

export function isPhone(value, arg, get) {
    value = value.split(' ').join('').replace("-", "");
    return value.length > 9;
}

export function isRequired(value, arg, get) {
    return value ? !!value.toString().replace(/ /g, '') : false;
}

export function isDate(value, arg, get) {
    if (!value) {
        return true;
    }
    return value && value.length === 10
        ? moment(value, 'DD/MM/YYYY').isValid()
        : false;
}