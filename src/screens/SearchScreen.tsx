import { StyleSheet, View, Platform, Text, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PokemonCard, SearchInput, Loading } from '../components';
import { usePokemonSearch } from '../hooks';
import { globalStyles } from '../theme';
import { SimplePokemon } from '../interfaces';
import { capitalize } from '../utils';

const windowWidth = Dimensions.get( 'window' ).width;

const SearchScreen = () => {

    const { top } = useSafeAreaInsets();

    const { isFetching, simplePokemonList } = usePokemonSearch();

    const [ term, setTerm ] = useState( '' );
    const [ filteredPokemons, setFilteredPokemons ] = useState<SimplePokemon[]>( [] );

    useEffect( () => {

        if ( term.trim().length === 0 ) {
            return setFilteredPokemons( [] );
        }

        if ( isNaN( Number( term ) ) ) {

            const newList = simplePokemonList.filter( pokemon => {

                const lowerCaseName = pokemon.name.toLowerCase();
                const lowerCaseTerm = term.trim().toLowerCase();

                return lowerCaseName.includes( lowerCaseTerm );

            } );
            2;
            setFilteredPokemons( newList );

        } else {

            const pokemonById = simplePokemonList.find( p => p.id === term );

            setFilteredPokemons( pokemonById ? [ pokemonById ] : [] );

        }


    }, [ term ] );


    if ( isFetching ) {
        return <Loading />;
    }

    return (
        <View style={ {
            flex: 1,
            marginHorizontal: 20
        } } >

            <SearchInput
                onDebounce={ setTerm }
                style={ {
                    position: 'absolute',
                    zIndex: 999,
                    marginTop: Platform.OS === 'ios' ? top + 10 : top + 20,
                    width: windowWidth - 40
                } }
            />

            <FlatList
                // Data
                data={ filteredPokemons }
                keyExtractor={ ( item ) => item.id }

                // Config
                showsVerticalScrollIndicator={ false }
                numColumns={ 2 }
                keyboardDismissMode='on-drag'

                // Renders
                renderItem={ ( { item } ) => <PokemonCard pokemon={ item } /> }
                ListHeaderComponent={ () => (
                    <Text
                        style={ {
                            ...globalStyles.title,
                            ...globalStyles.globalMargin,
                            paddingBottom: 10,
                            marginTop: Platform.OS === 'ios' ? 60 : 80,
                        } }
                    >
                        { capitalize( term ) }
                    </Text>
                ) }
            />

        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create( {} );