import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";
const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;
function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [tipo, setTipo] = useState("")
  const [ordem, setOrdem] = useState("")

  return (
    <>
      <GlobalStyle />
      <Header
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
        tipo={tipo}
        setTipo={setTipo}
        ordem={ordem}
        setOrdem={setOrdem}
      />
      <CardsContainer>
        {pokemons.filter((pokemon) => {
          // BUSCAR POR ID
        //return idFilter ? pokemon.id.includes(idFilter) : pokemon
          return pokemon.id.includes(idFilter) 
        })
          .filter((pokemon) => {
            // BUSCAR POR NOME
            return pokemon.name.english.toLowerCase().includes(pesquisa.toLowerCase());
          })
          .filter((pokemon) => {
            // BUSCAR POR QUALQUER TIPO
            // return tipo ? pokemon.type.includes(tipo) : pokemon

            // BUSCAR APENAS PELO PRIMEIRO TIPO
           return  pokemon.type[0].includes(tipo) 
          })
          .sort((atual, seguinte) => {
            // ORDENA OS POKEMONS EM ORDEM ALFABETICA
            if(ordem === "crescente"){
              return atual.name.english < seguinte.name.english ? -1 :1
            } else if( ordem === "decrescente") {
              return atual.name.english > seguinte.name.english ? -1 : 1
            }
          })
          .map((pokemon) => {
            // RENDERIZA OS POKEMONS NA TELA
            return (
              <PokemonCard
                cardColor={getColors(pokemon.type[0])}
                key={pokemon.id}
                pokemon={pokemon}
              />
            );
          })}
      </CardsContainer>
    </>
  );
}

export default App;
