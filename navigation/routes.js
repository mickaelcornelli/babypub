import React from 'react';
import Login from '../screen/user/login';
import Register from '../screen/user/register';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

//on crée nos deux routes qu'on insère par la suite dans le menu qu'on afficher (équivalent d'une route)
const RegisterStackNavigator = createStackNavigator({
  Register: { 
      screen: Register
  }
})

const LoginStackNavigator = createStackNavigator({
  Login: { 
      screen: Login
  },
},
{
  headerMode: 'none'
})


//ici on crée un menu de navigation avec les boutton register et login
const TabNavigator = createMaterialBottomTabNavigator(
  {
    Register: {
      screen: RegisterStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-book'} />
          </View>
        ),
      }
    },
    Login: {
      screen: LoginStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
          </View>
        ),
      }
    },
  },
  {
    //affichage par défault du template register
    initialRouteName: 'Login',
    activeColor: '#ffffff',
    inactiveColor: '#a3c2fa',
    barStyle: { backgroundColor: '#17202a' },
    tabBarLabel: {labeled: false}
  }
);

export default createAppContainer(TabNavigator);