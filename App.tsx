import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Login from './screens/Login';
import Home from './screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Test from './test';
import {NavigationContainer} from '@react-navigation/native';
import Color from './Types/Colors';
import RegisterScreen from './screens/Register';
import {TabIcon} from './screens/TabIcon';
import OrderDetail from './screens/OrderDetail';
import Orderhistory from './screens/Order';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: Color.background,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              image={require('./images/ic_home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Borrowing"
        component={Orderhistory}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              image={require('./images/ic_home.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    // Add return statement here
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
