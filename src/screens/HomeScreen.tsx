import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePokemonPaginated } from '../hooks';
import { globalStyles } from '../theme';
import { PokemonCard } from '../components';

const HomeScreen = () => {

    const { top } = useSafeAreaInsets();

    const { simplePokemonList, loadPokemons } = usePokemonPaginated();

    return (
        <>
            <Image
                source={ require( '../assets/pokebola.png' ) }
                style={ globalStyles.pokebolaBG }
            />

            <View style={ { alignItems: 'center' } }>

                <FlatList
                    // Data
                    data={ simplePokemonList }
                    keyExtractor={ ( item ) => item.id }

                    // Config
                    showsVerticalScrollIndicator={ false }
                    numColumns={ 2 }

                    // Renders
                    renderItem={ ( { item } ) => <PokemonCard pokemon={ item } /> }
                    ListHeaderComponent={ () => (
                        <Text
                            style={ {
                                ...globalStyles.title,
                                ...globalStyles.globalMargin,
                                top: top + 20,
                                marginBottom: top + 20,
                                paddingBottom: 10
                            } }
                        >
                            Pokedex
                        </Text>
                    ) }

                    // Infinite scroll
                    onEndReached={ loadPokemons }
                    onEndReachedThreshold={ 0.4 }

                    // Loading
                    ListFooterComponent={ () => (
                        <ActivityIndicator
                            style={ { height: 100, justifyContent: 'flex-start' } }
                            size={ 20 }
                            color='grey'
                        />
                    ) }
                />

            </View>
        </>
    );
};

export default HomeScreen;