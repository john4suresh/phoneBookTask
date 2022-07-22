import React, { useEffect, useState, useMemo } from "react";

const MemoExample = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [filter, setFilter] = useState('');
  const [otherThing, setOtherThing] = useState('');


  useEffect(() => {
    (async function getPokemons() {
      setLoading(true);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0"
      );
      const json = await response.json();
      setPokemons(json.results);
      setLoading(false);
    })();
  }, []);

  const filteredPokemons = useMemo(() => {
    console.log("calculating filtered pokemon for filter:", filter);
    const regexp = new RegExp(filter, 'gi');
    return pokemons.filter((pokemon) => {
      console.log("Checking pokemon", pokemon.name, filter);
      return pokemon.name.match(regexp)
    })

  }, [pokemons, filter])

  console.log("Render function is logging")

  return <div>{
    loading ?
      <div>Loading pokemons......</div> :
      (
        <div>
          <input placeholder="Enter Pokemon Name" onChange={(e) => { setFilter(e.target.value) }} value={filter} />
          <input placeholder="Type any Other values" onChange={(e) => { setOtherThing(e.target.value) }} value={otherThing} />
          {/* <ul>{pokemons.filter((pokemon) => {
            console.log("Checking pokemon", pokemon.name, filter);
            return pokemon.name.match(new RegExp(filter, 'gi'))
          }).map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}</ul> */}
          <ul>
            {filteredPokemons.map((pokemon) => (
              <li key={pokemon.name}>{pokemon.name}</li>
            ))}
          </ul>
        </div>
      )
  }</div>;
};

export default MemoExample;
