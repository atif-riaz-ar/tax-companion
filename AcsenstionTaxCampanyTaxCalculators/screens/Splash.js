import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, View, ImageBackground, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles/splash';
import {AuthContext} from '../src/AuthProvider';

const Splash = props => {
	const {login, appData} = useContext(AuthContext);
	let [animating, setAnimating] = useState(true);
	
	appData();
	
	useEffect(() => {
		setTimeout(() => {
			AsyncStorage.getItem('user').then((user) => {
					setAnimating(false);
					if (user == null) {
						props.navigation.navigate('Login');
					} else {
						login();
					}
				},
			);
		}, 6000);
	}, []);
	
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../images/bg1.png')}
				style={styles.bg_image}
			/>
			<Image style={styles.logo} resizeMode={'contain'} source={require('../images/logo.png')}/>
			<ActivityIndicator
				animating={animating}
				color="#4a5b87"
				size="large"
				style={styles.activityIndicator}
			/>
		</View>
	);
};

export default Splash;
