import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { FullPokemon } from '../interfaces';
import { FadeInImage } from './FadeInImage';
import { capitalize } from '../utils';

interface Props {
    pokemon: FullPokemon;
}

export const PokemonDetails = ( { pokemon }: Props ) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={ false }
            style={ {
                ...StyleSheet.absoluteFillObject,
            } }
        >
            <View style={ {
                ...styles.container,
                marginTop: 370
            } }>

                {/* Types */ }
                <Text style={ styles.title }>Types</Text>

                <View style={ { flexDirection: 'row' } }>
                    {
                        pokemon.types.map( ( { type } ) => {
                            return (
                                <Text
                                    style={ {
                                        ...styles.regularText,
                                        marginRight: 10
                                    } }
                                    key={ type.name }
                                >
                                    { capitalize( type.name ) }
                                </Text>
                            );
                        } )
                    }
                </View>


            </View>

            {/* Weight */ }
            <View style={ styles.container }>
                <Text style={ styles.title }>Weight</Text>
                <Text style={ styles.regularText }>{ pokemon.weight }Kg</Text>
            </View>

            {/* Sprites */ }
            <View style={ styles.container }>
                <Text style={ styles.title }>Sprites</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={ false }
                style={ {
                    height: 85
                } }
            >
                <FadeInImage
                    uri={ pokemon.sprites.front_default }
                    style={ styles.basicSprite }
                />
                <FadeInImage
                    uri={ pokemon.sprites.back_default }
                    style={ styles.basicSprite }
                />
                <FadeInImage
                    uri={ pokemon.sprites.front_shiny }
                    style={ styles.basicSprite }
                />
                <FadeInImage
                    uri={ pokemon.sprites.back_default }
                    style={ styles.basicSprite }
                />
            </ScrollView>

            {/* Base Abilities */ }
            <View style={ styles.container }>
                <Text style={ styles.title }>Base abilities</Text>
                <View style={ { flexDirection: 'row' } }>
                    {
                        pokemon.abilities.map( ( { ability } ) => {
                            return (
                                <Text
                                    style={ {
                                        ...styles.regularText,
                                        marginRight: 10
                                    } }
                                    key={ ability.name }
                                >
                                    { capitalize( ability.name ) }
                                </Text>
                            );
                        } )
                    }
                </View>
            </View>

            {/* Moves */ }
            <View style={ styles.container }>
                <Text style={ styles.title }>Moves</Text>
                <View style={ { flexDirection: 'row', flexWrap: 'wrap' } }>
                    {
                        pokemon.moves.map( ( { move } ) => {
                            return (
                                <Text
                                    style={ {
                                        ...styles.regularText,
                                        marginRight: 10
                                    } }
                                    key={ move.name }
                                >
                                    { capitalize( move.name ) }
                                </Text>
                            );
                        } )
                    }
                </View>
            </View>

            {/* Stats */ }
            <View style={ styles.container }>
                <Text style={ styles.title }>Stats</Text>
                <View>
                    {
                        pokemon.stats.map( ( { stat, base_stat }, idx ) => {
                            return (
                                <View
                                    key={ stat.name + idx }
                                    style={ { flexDirection: 'row' } }
                                >
                                    <Text
                                        style={ {
                                            ...styles.regularText,
                                            marginRight: 10,
                                            width: 150
                                        } }
                                    >
                                        { capitalize( stat.name ) }
                                    </Text>
                                    <Text
                                        style={ {
                                            ...styles.regularText,
                                            fontWeight: 'bold',
                                        } }
                                    >
                                        { base_stat }
                                    </Text>
                                </View>
                            );
                        } )
                    }
                </View>
            </View>

            <View style={ { marginBottom: 70, alignItems: 'center' } } >
                <FadeInImage
                    uri={ pokemon.sprites.front_default }
                    style={ styles.basicSprite }
                />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create( {
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 19
    },
    basicSprite: {
        width: 100,
        height: 100,
    }
} );