import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { FadeInImage } from './';
import { SimplePokemon } from '../interfaces';
import { getBackgroundColor, capitalize } from '../utils';
import { RootStackParams } from '../navigation';

const windowWidth = Dimensions.get( 'window' ).width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ( { pokemon }: Props ) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const [ bgColor, setBgColor ] = useState( 'grey' );
    const isMounted = useRef( true );

    const getColor = async () => {
        const color = await getBackgroundColor( pokemon.picture );
        if ( isMounted.current ) {
            setBgColor( color );
        }
    };

    useEffect( () => {
        getColor();

        return () => {
            isMounted.current = false;
        };
    }, [] );

    return (
        <TouchableOpacity
            activeOpacity={ 0.9 }
            onPress={ () => navigation.navigate( 'PokemonScreen', { simplePokemon: pokemon, color: bgColor } ) }
        >
            <View style={ {
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            } }>

                <View>
                    <Text style={ styles.name } >
                        { capitalize( pokemon.name ) }
                        { '\n#' + pokemon.id }
                    </Text>
                </View>

                <View style={ styles.pokebolaContainer }>
                    <Image
                        source={ require( '../assets/pokebola-blanca.png' ) }
                        style={ styles.pokebola }
                    />
                </View>

                <FadeInImage
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create( {
    cardContainer: {
        // backgroundColor: 'grey',
        marginHorizontal: 10,
        height: 120,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
} );