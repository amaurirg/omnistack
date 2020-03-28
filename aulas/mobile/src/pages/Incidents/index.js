import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';   // icones já vem com expo, usaremos o mesmo fi
import { useNavigation } from '@react-navigation/native'; // igual useHistory
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';    // pega automaticamente o logo, logo@2x ou 3x...
import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    // controle de scroll infinito
    const [page, setPage] = useState(1); // inicia na página 1
    // para evitar que os dados carregados não sejam buscados novamente
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident }); // mesmo nome em Routes
    }

    async function loadIncidents() {
        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);

        // envia o número da página que está carregando para a api
        const response = await api.get('incidents', {
            params: {page}
        });
        // anexa dois vetores dentro de um para somar as páginas que já foram carregadas com as novas que carregarão conforme o scroll for subindo
        setIncidents([...incidents, ...response.data]); 
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    // função que dispara quando as variáveis do array mudarem
    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} // executada quando chegar no final da lista
                onEndReachedThreshold={0.2} // quantos % faltam para chegar no final da lista e assim poder carregar novos dados, nesse caso 20%
                // {item: incident} desestrutura para pegar um único param item que colocado dessa forma altera seu nome de item para incident
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{
                            Intl.NumberFormat('pt-BR',
                                { style: 'currency', currency: 'BRL' }
                            ).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            // necessário colocar uma arrow function para não executar quando carregar o elemento
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}