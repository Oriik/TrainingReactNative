import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Search from './Components/Search'
import FilmDetail from './Components/FilmDetail';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

const Stack = createStackNavigator();

export default class App extends Component {
  render(){
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator
          initialRouteName="Search">
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="FilmDetail" component={FilmDetail} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    );
  } 
}
