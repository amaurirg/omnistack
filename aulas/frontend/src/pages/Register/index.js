import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {

    // armazenar os estados dos inputs iniciados em '' (vazio)
    // const [valor, função para atualizar o estado]
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    // faz a navegação através de uma função JS quando não pode colocar o Link do router-dom
    // mais abaixo, após o cadastro correto, history.push('/'); envia o usuário para a home
    const history = useHistory();   

    // handleRegister() => função responsável por fazer o cadastro do usuário
    // será chamada pelo form
    async function handleRegister(e) {
        e.preventDefault(); // para não recarregar a página, evitando o comportamento do browser
    
        const data = {name, email, whatsapp, city, uf};

        try {
            // aguarda a resposta com await e armazena em response, necessário async
            const response = await api.post('ongs', data);
            alert(`Seu ID: ${response.data.id}`);
            history.push('/');  // envia o usuário para a home
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }
    
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    {/* <input 
                    placeholder="Nome da ONG"
                    // nome da ONG
                    value={name}
                    // e.target.value representa o valor do input e será armazenado em name
                    // e é o param que a função recebe e retorna o corpo da função
                    onChange={e => setName(e.target.value)}
                    /> */}
                    <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input 
                    type="email" 
                    placeholder="E-mail" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                    placeholder="Whatsapp" 
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                        placeholder="Cidade" 
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        {/* style é tag do React onde a primeira chave é para incluiur código JS e a segunda é para o objeto JS */}
                        <input 
                        placeholder="UF" 
                        style={{ width: 80 }} 
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
