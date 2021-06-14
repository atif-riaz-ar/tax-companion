import React from 'react';
import ProfileUpdateInfo from '../screens/temp/ProfileUpdateInfo'
import UpdatePassword from '../screens/temp/UpdatePassword'
import {createStackNavigator} from '@react-navigation/stack';
import * as COLOR from '../styles/constants';
import * as ICON from '../components/icons';
import {TouchableOpacity} from 'react-native';
import ProfileUpdateImage from '../screens/temp/ProfileUpdateImage';
import UpdateProfile from "../screens/temp/UpdateProfile";

const Stack = createStackNavigator();
const txt_style_menu = {
	color: COLOR.white,
	textShadowColor: 'rgba(0, 0, 0, 0.5)',
	textShadowOffset: {width: -5, height: 5},
	textShadowRadius: 10,
	fontSize: 16,
	margin: 15,
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

const UserStack = ({navigation, route}) => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="User Profile" options={ContentProps(navigation, route)} component={UpdateProfile}/>
			<Stack.Screen name="Update User Info" options={ContentProps(navigation, route)} component={ProfileUpdateInfo}/>
			<Stack.Screen name="Update Image" options={ContentProps(navigation, route)} component={ProfileUpdateImage}/>
			<Stack.Screen name="Update Password" options={ContentProps(navigation, route)} component={UpdatePassword}/>
		</Stack.Navigator>
	);
};

export default UserStack;
