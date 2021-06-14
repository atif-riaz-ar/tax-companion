import React, {useContext} from 'react';
import {StyleSheet, ImageBackground, TouchableOpacity, Linking, Text, View} from 'react-native';
import * as COLOR from '../../styles/constants';
import {AuthContext} from '../../src/AuthProvider';
import Payment from '../content/Payment';

const open_meeting = () => {
	Linking.canOpenURL('https://us04web.zoom.us/j/8365492695?pwd=WHY0YkdkRUVETVpBaVFZVXRnc2NGUT09').then(supported => {
		if (supported) {
			Linking.openURL('https://us04web.zoom.us/j/8365492695?pwd=WHY0YkdkRUVETVpBaVFZVXRnc2NGUT09');
		} else {
			//console.log('Don\'t know how to open URI: ' + 'https://us04web.zoom.us/j/8365492695?pwd=WHY0YkdkRUVETVpBaVFZVXRnc2NGUT09');
		}
	});
};

const Webinar = ({navigation, route}) => {
	const {user} = useContext(AuthContext);
	let current_date = new Date();
	let dd = user.subscription_date;
	let t = dd.split(/[- :]/);
	let subs_date = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
	
	if(current_date > subs_date) {
		navigation.navigate("Payment", {
			nav: navigation,
		})
		return (
			<View style={{flex:1,justifyContent: "center",alignItems: "center",}}>
				<Text style={{fontWeight:'bold',fontSize:15,textAlign:'center',color:'darkblue'}}>You do not have paid account to see the content.</Text>
				<TouchableOpacity onPress={()=>navigation.navigate("Payment", {
					nav:navigation
				})} >
					<Text style={{color:"darkblue", marginTop:20}}>
						SUBSCRIBE
					</Text>
				</TouchableOpacity>
			</View>
		)
	}
	
	return (
		<>
			<ImageBackground source={require('../../images/logo.png')} style={{
				width: 297,
				height: 79.2,
				alignSelf: 'center',
				marginVertical: 30,
			}} />
			<View style={styles.zoomContainer}>
				<ImageBackground style={styles.zoom} source={require('../../images/zoom.jpg')}>
					<TouchableOpacity onPress={open_meeting()}><Text> </Text></TouchableOpacity>
					<TouchableOpacity onPress={open_meeting()} style={styles.button}><Text style={styles.button}>Goto
						Webinar</Text></TouchableOpacity>
				</ImageBackground>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	zoom: {
		paddingVertical: '30%',
		paddingHorizontal: '45%',
		marginTop: 80,
		borderWidth: 3,
		borderRadius: 15,
		overflow: 'hidden',
		borderColor: COLOR.primary_color,
	},
	zoomContainer: {
		alignItems: 'center',
	},
	button: {
		position: 'absolute',
		bottom: 0,
		width: 300,
		paddingVertical: 8,
		fontSize: 20,
		textAlign: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		color: COLOR.white,
		backgroundColor: COLOR.primary_color,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
});

export default Webinar;
