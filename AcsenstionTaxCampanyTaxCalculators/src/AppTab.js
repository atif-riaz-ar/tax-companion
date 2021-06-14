import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Listing from '../screens/content/Listing';

const Tab = createBottomTabNavigator();
const AppTab = ({}) => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Law Reports" component={Listing}/>
			<Tab.Screen name="Videos" component={Listing}/>
			<Tab.Screen name="Law School" component={Listing}/>
		</Tab.Navigator>
	);
};

export default AppTab;
