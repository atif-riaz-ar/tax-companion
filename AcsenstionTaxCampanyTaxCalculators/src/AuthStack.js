import React from 'react';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Register from '../screens/Register';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = ({}) => {
	return (
		<Stack.Navigator initialRouteName='Splash' screenOptions={{
			header: () => null,
		}}>
			<Stack.Screen name='Splash' component={Splash}/>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register}/>
		</Stack.Navigator>
	);
};

export default AuthStack;
