import { useEffect, useRef, useState } from 'react';

import { pokeApi } from '../api';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces';

export const usePokemonSearch = () => {

    const [ isFetching, setIsFetching ] = useState( true );
    const [ simplePokemonList, setSimplePokemonList ] = useState<SimplePokemon[]>( [] );

    const loadPokemons = async () => {

        const { data } = await pokeApi.get<PokemonPaginatedResponse>( 'https://pokeapi.co/api/v2/pokemon?limit=1200' );
        mapPokemonList( data.results );

        setIsFetching( false );

    };

    const mapPokemonList = ( pokemonList: Result[] ) => {

        const filteredList = pokemonList.filter( ( { name } ) => !name.includes( '-' ) );

        const newPokemonList: SimplePokemon[] = filteredList.map( ( { name, url } ) => {

            const id = url.split( '/' )[ url.split( '/' ).length - 2 ];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//other/official-artwork/${ id }.png`;

            return { id, picture, name };

        } );

        setSimplePokemonList( newPokemonList );

    };

    useEffect( () => {
        loadPokemons();
    }, [] );

    return {
        simplePokemonList,
        isFetching
    };

};
