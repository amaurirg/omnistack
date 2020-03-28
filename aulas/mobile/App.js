import 'intl';  // importa o intl para formatar números em moeda
import 'intl/locale-data/jsonp/pt-BR';  // padrão brasileiro
import React from 'react';
import { Text, View } from 'react-native';
import Routes from './src/routes';


export default function App() {
  return (
    <Routes />
  );
}

