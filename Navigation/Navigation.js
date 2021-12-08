import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons';
import Store from '../Store/configureStore'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail';
import Favorite  from '../Components/Favorite';

const SearchStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SearchStackScreen() {
    return (
      <SearchStack.Navigator initialRouteName="Search">
          <SearchStack.Screen name="Search" component={Search} />
          <SearchStack.Screen name="FilmDetail" component={FilmDetail} />
      </SearchStack.Navigator>
    );
  }
  
  function SettingsScreen() {
    return (
    <FavoriteStack.Navigator initialRouteName="Favorite">
        <FavoriteStack.Screen name="Favorite" component={Favorite} />
        <FavoriteStack.Screen name="FilmDetail" component={FilmDetail} />
    </FavoriteStack.Navigator>
    );
  }

const Navigation = () => {
    return (
        <Provider store={Store}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
  
                  if (route.name === 'Home') {
                    iconName = focused ? 'ios-search-circle' : 'ios-search-circle-outline';
                  } else if (route.name === 'Favorite') {
                    iconName = focused ? 'ios-heart-circle' : 'ios-heart-circle-outline';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}
            >
              <Tab.Screen name="Home" component={SearchStackScreen} />
              <Tab.Screen name="Favorite" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    );
}

export default Navigation