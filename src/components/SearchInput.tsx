import { StyleSheet, View, TextInput, Platform, StyleProp, ViewStyle } from 'react-native';
import React, { useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import { useDebouncedValue } from '../hooks';

interface Props {
    onDebounce: ( value: string ) => void;
    style?: StyleProp<ViewStyle>;
}

export const SearchInput = ( { style, onDebounce }: Props ) => {

    const [ textValue, setTextValue ] = useState( '' );

    const debouncedValue = useDebouncedValue( textValue );

    useEffect( () => {

        onDebounce( debouncedValue );

    }, [ debouncedValue ] );


    return (
        <View style={ {
            ...styles.container,
            ...style as any
        } }>
            <View style={ styles.textBackground }>

                <Icon
                    name='search-outline'
                    color='grey'
                    size={ 30 }
                    style={ { marginRight: 10 } }
                />

                <TextInput
                    placeholder='Search Pokemon'
                    style={ {
                        ...styles.textInput,
                        top: Platform.OS === 'ios' ? 0 : 2
                    } }
                    autoCapitalize='none'
                    autoCorrect={ false }
                    value={ textValue }
                    onChangeText={ setTextValue }
                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        // backgroundColor: 'red'
    },
    textBackground: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    textInput: {
        flex: 1,
        fontSize: 18
    }
} );