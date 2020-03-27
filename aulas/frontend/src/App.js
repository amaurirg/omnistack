import React from 'react';
import './global.css';
import Routes from './routes';  // não precisa colocar index pq o React já sabe


function App() {
  // useState começa em 0 e funciona assim: 
  // [variável (counter), função que atualiza o estado (setCounter)]
  // const [counter, setCounter] = useState(0);

  // function increment() {
  //   setCounter(counter + 1);
  // }

  return (
    // <Header title="Semana Omnistack" />
    // <div>
    //   <Header>Contador: {counter}</Header>
    //   <button onClick={increment}>Incrementar</button>
    // </div>
    <Routes />
  );
}

export default App;
