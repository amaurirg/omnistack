// useEffect dispara uma função em algum determinado momento do componente
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]); // inicia vazio pq os dados virão do backend
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');  // pega o nome no navegador
    const ongName = localStorage.getItem('ongName');  // pega o nome no navegador

    // useEffect(() => {}, []); recebe dois params: 
    // () => {} a função a ser disparada para carregar os casos
    // [] executa a função toda vez que as info mudarem e vazio executará só 1 vez
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);    // retorno do backend
        })
    }, [ongId]);    // poderia ser vazio mas para o React é bom colocar a variável usada
    // em caso de mudança de valor, porém o id sempre será o mesmo nesse caso

    async function handleDeleteIncident(id) {
        try {
            api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            // filtra os incidents que são diferentes do id deletado para apagá-lo da tela imediatamente após ter sido deletado
            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();   // limpa todo localStorage do navegador
        history.push('/');      // envia o usuário para a home
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat(
                            'pt-BR',
                            {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}</p>
                        {/* ATENÇÃO: se for passado para o onClick dessa forma:
                         onClick={handleDeleteIncident(incident.id)} será executada a função e onClick receberá o retorno dela assim que o componente for mostrado em tela, deletando todos os casos. Então é necessário criar outra função como abaixo onClick={() => handleDeleteIncident(incident.id)} */}
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
