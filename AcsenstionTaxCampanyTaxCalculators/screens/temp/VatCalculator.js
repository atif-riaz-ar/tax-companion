import React, {useState, useContext} from 'react';
import {ImageBackground, Text, TextInput, View, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../../styles/itc';
import Payment from '../content/Payment';
import {AuthContext} from '../../src/AuthProvider';
import {useNavigation} from '@react-navigation/native';


const VatCalculator = ({route}) => {
	
	const {user} = useContext(AuthContext);
	
	const navigation = useNavigation();
	
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
	
	let [turnover, setTurnover] = useState(0);
	
	let vat = parseFloat(turnover * 0.075).toFixed(1);
	
	const convertedValue = (value) => {
		let result = value == '' ? 0 : parseFloat(value);
		return result;
	}
	
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground source={require('../../images/logo.png')} style={styles.logo} />
			<ScrollView style={styles.form}>
				<Text style={styles.heading}>Value Added Tax Computation</Text>
				<View style={styles.grid}>
					<Text style={styles.label}>Turnover/Revenue</Text>
					<TextInput style={styles.input} onChangeText={turnover => setTurnover(convertedValue(turnover))} value={turnover} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Total Vat</Text>
					<Text style={styles.sub_result}>{vat}</Text>
				</View>
				
				
				<Text style={styles.heading}> </Text>
			</ScrollView>
		</SafeAreaView>
	);
};

export default VatCalculator;
