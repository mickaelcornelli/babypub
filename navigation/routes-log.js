import React from 'react';
import Home from '../screen/home';
import Logout from '../screen/user/logout';
import AddPub from '../screen/pub/addPub';
import Admin from '../screen/pub/admin';
import EditPub from '../screen/pub/editPub';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';


const HomeStackNavigator = createStackNavigator({
    Home: { 
        screen: Home,
    }
  })

  const AddPubStackNavigator = createStackNavigator({
    AddPub: { 
        screen: AddPub,
    }
  })

  const AdminPubStackNavigator = createStackNavigator({
    Admin: { 
        screen: Admin,
    },
    EditPub: {
      screen: EditPub
    }
  })

  const LogoutStackNavigator = createStackNavigator({
    Logout: { 
        screen: Logout,
    }
  })
  
  const TabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: HomeStackNavigator,
            navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
                </View>
            ),
            }
        },
        AddPub: {
          screen: AddPubStackNavigator,
          navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
              <View>
              <Icon3 style={[{color: tintColor}]} size={25} name={'local-bar'} />
              </View>
          ),
          }
        },
        Admin: {
          screen: AdminPubStackNavigator,
          navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
              <View>
              <Icon style={[{color: tintColor}]} size={25} name={'ios-briefcase'} />
              </View>
          ),
          }
        },
        Logout: {
            screen: LogoutStackNavigator,
            navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                <Icon2 style={[{color: tintColor}]} size={25} name={'logout'} />
                </View>
            ),
            }
        }
    },
    {
        initialRouteName: 'Home',
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: "#17202a" },
      }
    );
    
    export default createAppContainer(TabNavigator);