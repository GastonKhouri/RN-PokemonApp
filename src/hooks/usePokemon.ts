import { useState, useEffect } from 'react';

import { FullPokemon } from '../interfaces';
import { pokeApi } from '../api/pokeApi';

export const usePokemon = ( id: string ) => {

    const [ isLoading, setIsLoading ] = useState( true );
    const [ pokemon, setPokemon ] = useState<FullPokemon>( {} as FullPokemon );

    const loadPokemon = async () => {

        const { data } = await pokeApi.get<FullPokemon>( `https://pokeapi.co/api/v2/pokemon/${ id }` );

        setPokemon( data );
        setIsLoading( false );

    };

    useEffect( () => {
        loadPokemon();
    }, [] );

    return {
        isLoading,
        pokemon
    };

};
