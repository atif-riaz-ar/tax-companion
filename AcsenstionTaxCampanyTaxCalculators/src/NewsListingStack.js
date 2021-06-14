import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import * as COLOR from '../styles/constants';
import * as ICON from '../components/icons';
import {TouchableOpacity} from 'react-native';
import NewsContent from '../screens/content/NewsContent';
import NewsListing from '../screens/content/NewsListing';
import News from '../screens/temp/News';

const Stack = createStackNavigator();
const txt_style = {
	color: COLOR.white,
	textShadowColor: 'rgba(0, 0, 0, 0.5)',
	textShadowOffset: {width: -5, height: 5},
	textShadowRadius: 10,
	fontSize: 40,
	margin: 15,
};
const txt_style_menu = {
	color: COLOR.white,
	textShadowColor: 'rgba(0, 0, 0, 0.5)',
	textShadowOffset: {width: -5, height: 5},
	textShadowRadius: 10,
	fontSize: 16,
	margin: 15,
};

const ListingProps = (navigation, route) => {
	return {
		headerTitle: route.name,
		headerTitleAlign: 'center',
		headerTitleStyle: txt_style_menu,
		headerStyle: {
			backgroundColor: COLOR.primary_color,
			height: 75,
		},
		headerRight: () => {
			return (
				<TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginRight: 20}}>
					<ICON.getIcon width={24} height={24} name="menu" color={COLOR.white}/>
				</TouchableOpacity>
			);
		},
	};
};

const ContentProps = (navigation, route) => {
	
	return {
		headerTitle: `${route.name}`,
		headerTitleAlign: 'center',
		headerTitleStyle: txt_style_menu,
		headerTintColor: COLOR.white,
		headerStyle: {
			backgroundColor: COLOR.primary_color,
			height: 75,
		},
		headerRight: () => {
			return (
				<TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{marginRight: 20}}>
					<ICON.getIcon width={24} height={24} name="menu" color={COLOR.white}/>
				</TouchableOpacity>
			);
		},
	};
};

const AuthStack = ({navigation, route}) => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Tax News" options={ContentProps(navigation, route)} component={News}/>
			<Stack.Screen name="NewsListing" options={ContentProps(navigation, route)} component={NewsListing}/>
			<Stack.Screen name="NewsContent" options={ContentProps(navigation, route)} component={NewsContent}/>
		</Stack.Navigator>
	);
};

export default AuthStack;
