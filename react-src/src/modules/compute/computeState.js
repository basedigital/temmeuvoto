import {Compute} from 'cerebral'
import {state} from 'cerebral/tags'

export default Compute(state`app.config.estados`, state`candidato.uf`, (estados, uf) => {
    if (!uf)
        return {id:0, name:''};

    return estados.filter((v) => v.uf.toLowerCase() === uf.toLowerCase())[0];
})