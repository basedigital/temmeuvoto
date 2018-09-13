import React from 'react';

import ModalText from './../modalText/ModalText';
import {trackPageview} from "../../../utils/GAUtil";

class ModalWho extends React.PureComponent {
    componentDidMount() {
        trackPageview('interna/quem-somos');
    }

    render() {
        const text = `
            <p>Somos uma iniciativa apartidária, independente e múltipla, criada a partir da união de vários movimentos e organizações da sociedade civil, bem como do esforço individual e volunrário de centenas de profissionais.</p>
    
            <p>
                <div class="color-gray23">Organizações</div>
                <div>
                    <a href="https://www.movimentoacredito.com/" target="_blank">Acredito</a>
                    <a href="http://www.agoramovimento.com/" target="_blank">Agora!</a>
                    <a href="https://www.apoia.org/" target="_blank">Apoia</a>
                    <a href="https://base.digital" target="_blank">BASE DIGITAL</a>
                    <a href="https://mundobrasil21.com.br/" target="_blank">Brasil 21</a>
                    <a href="http://www.cause.net.br/" target="_blank">Cause</a>
                    <a href="http://www.clp.org.br/" target="_blank">Centro de Liderança Pública</a>
                    <a href="https://canaldaconvergencia.com/" target="_blank">Convergência</a>
                    <a href="https://www.digesto.com.br/" target="_blank">Digesto</a>
                    <a href="https://ideiabigdata.com/" target="_blank">IdeiaBigData</a>
                    <a href="http://www.vigieaqui.com.br/" target="_blank">Instituto ReclameAqui</a>
                    <a href="https://www.jusbrasil.com.br/" target="_blank">JusBrasil</a>
                    <a href="https://www.eusoulivres.org/" target="_blank">Livres</a>
                    <a href="http://midasmusic.com.br/" target="_blank">Midas Music</a>
                    <a href="https://www.poderdovoto.org/" target="_blank">Poder do Voto</a>
                    <a href="http://www.politize.com.br/" target="_blank">Politize</a>
                    <a href="http://www.politicos.org.br/" target="_blank">Ranking dos Políticos</a>
                    <a href="http://renovabr.org/" target="_blank">RenovaBR</a>
                    <a href="https://www.repolitica.com.br/#!/" target="_blank">Repolítica</a>
                    <a href="http://www.thymus.com.br/" target="_blank">Thymus Branding</a>
                </div>
            </p>

            <p>
                <div class="color-gray23">Profissionais</div>
                <div>Ana Carolina Aragão, André Baptista, André Barrence, André Rocha, Andrea Lopes, Andressa Pena, Dra. Ângela Neves, Antonio Claret, Camila Reis, Carlos Belisário, Carlos Michel Batista, Christian Miguel, Daniel Fonseca, Daniel Lança, Daniel Serra, Daniel Veloso, Dariely, David Meneses, Diana Castro, Diego Calegari, Diogo F. Campos, Edgard Cavalcanti, Eduardo Mufarej, Eduardo Tardelli, Erick Beyruth, Fernanda Leite, Fernando Andreazi, Flávia Matos, Gabriel Pinzetta, Gabriela Hahn, Giovanna Franklin, Giovanna Novaes, Guilherme Corsetti, Guto Marzagão, Igor Senra Magalhães, Izabella Mattar, Jair Silva, Jesus Cláudio de Almeida, João Paulo da Siveira, João Pedro Tonini, Katiucia Soares, Kell Smith, Larissa Machado, Larissa Santana, Leandro Machado, Leandro Silva, Leonardo Mendes, Lidiane Ferreira, Lincoln Shiguio, Loreta Berezutchi, Lucas Camara, Luciana Martins, Luciene Antunes, Luiz Armesto, Marcella Coelho, Marcilio Aranhos, Marco Antônio da Costa, Marco Morais, Marcos "Rasta" Schestak, Marcus Sulzbacher, Maria Amélia Sobrino, Maria Fernanda, Marilia Ramos, Maurício Motta, Mayra Portilho, Miguel Nicacio, Natali Carreira, Nicolle Mansur, Nilo Neto, OriGame, Patrícia Leme, Paulo Vainer, Peter Filgueiras, P.MC, Rachel Ferreira, Rafael Busetti, Renata Bac, Renata Barbosa, Renata Leão, Renato Pascoal, Renato Virgili, Ricardo Guimarães, Ricardo Silva, Rick Bonadio, Roberta Bruzadin, Roberto Bellezia, Rodrigo Moreira da Costa, Rodrigo Pinheiro, Roque dos Santos, Sara Hewillin, Sérgio Bousquet Filho, Sergio Pasqualino, Silvinha Shingai, Sidney Souza, Suave, Thaís Scudelletti, Thalita Pires, Thamyres Gonçalves, Thiago Benato, Thiago Endrigo, Vinícius Tavares, Victor Nosé, Vitor Lima, Viviane Torre, Wander Jovenazzo, Wesley Diogo.</div>
            </p>

        `;

        return <ModalText {...this.props} title={'Quem Somos'} text={text}/>
    }
}

export default ModalWho;
