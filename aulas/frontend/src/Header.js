import React from 'react';

// export default function Header(props) {
// desestruturando props e pegando children direto é feito entre {}
export default function Header({ children }) {
    // console.log(props);
    return (
        <header>
            {/* <h1>{props.title}</h1> */}
            {/* <h1>{ props.children }</h1> */}
            <h1>{ children }</h1>
        </header>
    );
}