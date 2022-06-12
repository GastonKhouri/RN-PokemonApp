import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { HomeTab, SearchTab } from './';
import { SimplePokemon } from '../interfaces';

export type RootStackParams = {
    HomeScreen: undefined;
    SearchScreen: undefined;
    PokemonScreen: {
        simplePokemon: SimplePokemon;
        color: string;
    };
};

const Tab = createBottomTabNavigator();

export const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={ {
                headerShown: false,
                tabBarActiveTintColor: '#5856D6',
                tabBarLabelStyle: {
                    marginBottom: ( Platform.OS === 'ios' ) ? 0 : 10
                },
                tabBarStyle: {
                    height: ( Platform.OS === 'ios' ) ? 80 : 60,
                    position: 'absolute',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    borderWidth: 0,
                    elevation: 0
                }
            } }
            sceneContainerStyle={ {
                backgroundColor: 'white'
            } }
        >
            <Tab.Screen
                name="HomeTab"
                component={ HomeTab }
                options={ {
                    tabBarLabel: 'List',
                    tabBarIcon: ( { color } ) => (
                        <Icon color={ color } size={ 25 } name='list-outline' />
                    )
                } }
            />
            <Tab.Screen
                name="SearchTab"
                component={ SearchTab }
                options={ {
                    tabBarLabel: 'Search',
                    tabBarIcon: ( { color } ) => (
                        <Icon color={ color } size={ 25 } name='search-outline' />
                    )
                } }
            />
        </Tab.Navigator>
    );
};