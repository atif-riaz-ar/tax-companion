import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from './AuthProvider';
import Center from './Center';
import AppNav from './AppNav';
import AuthStack from './AuthStack';


const Routes = ({}) => {
	
	const {user, login} = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AsyncStorage.getItem('user')
			.then(userString => {
				if (userString) {
					//decode it
				}
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
			});
	}, []);
	
	if (loading) {
		return (
			<Center>
				<ActivityIndicator size="large"/>
			</Center>
		);
	}
	return (
		<NavigationContainer>
			{user ? <AppNav/> : <AuthStack/>}
		</NavigationContainer>
	);
};

export default Routes;
