import { useEffect, useRef, useState } from 'react';

import { pokeApi } from '../api';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces';

export const usePokemonPaginated = () => {

    const [ isLoading, setIsLoading ] = useState( true );
    const [ simplePokemonList, setSimplePokemonList ] = useState<SimplePokemon[]>( [] );

    const nextPageUrl = useRef( 'https://pokeapi.co/api/v2/pokemon?limit=40' );

    const loadPokemons = async () => {

        setIsLoading( true );

        const { data } = await pokeApi.get<PokemonPaginatedResponse>( nextPageUrl.current );
        nextPageUrl.current = data.next;
        mapPokemonList( data.results );

        setIsLoading( false );

    };

    const mapPokemonList = ( pokemonList: Result[] ) => {

        const newPokemonList: SimplePokemon[] = pokemonList.map( ( { name, url } ) => {

            const id = url.split( '/' )[ url.split( '/' ).length - 2 ];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//other/official-artwork/${ id }.png`;

            return { id, picture, name };

        } );

        setSimplePokemonList( p => [ ...p, ...newPokemonList ] );

    };

    useEffect( () => {
        loadPokemons();
    }, [] );

    return {
        simplePokemonList,
        isLoading,
        loadPokemons
    };

};
