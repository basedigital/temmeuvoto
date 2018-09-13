import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalContato extends React.PureComponent {

    componentDidMount() {
        trackPageview('interna/fale-conosco');
    }

    render() {
        const text = `
            <div class="text-center">
                <p>Tem alguma dúvida sobre o #TEMMEUVOTO?<br/>Gostaria de confirmar alguma informação?</p>
    
                <p>Entre em contato com a gente: <a class="link" href="mailto:contato@temmeuvoto.com">contato@temmeuvoto.com</a></p>
    
                <p>
                    <span class="medium color-gray1c">Assessoria de imprensa:</span><br/>
                    Thalita Pires<br/>
                    thalita@oficinadeimpacto.com.br<br/>
                    11 97200-0023
                </p>
            </div>
        `;

        return <ModalText {...this.props} title={'Fale-Conosco'} text={text}/>
    }
}

export default ModalContato;
