import React, {useContext, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, ImageBackground, Text, View, Alert} from 'react-native';
import styles from '../../styles/contact';
import {AuthContext} from '../../src/AuthProvider';
import Loader from '../../components/loader';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import Payment from '../content/Payment';

const Contact = ({navigation, route}) => {
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
	
	let [firstName, setFirstName] = useState(user['firstname']);
	let [lastName, setLastName] = useState(user['lastname']);
	let [email, setEmail] = useState(user['email']);
	let [subject, setSubject] = useState('');
	let [description, setDescription] = useState('');
	let [loading, setLoading] = useState(false);
	
	const send_email = () => {
		if (email != '' && firstName != '' && lastName != ''
			&& subject != '' && description != '') {
			setLoading(true);
			var proceeding_data = [
				{name: 'firstname', data: firstName},
				{name: 'lastname', data: lastName},
				{name: 'email', data: email},
				{name: 'subject', data: subject},
				{name: 'message', data: description},
			];
			
			RNFetchBlob.fetch('POST', 'https://leedsng.com/api/atc_trigger_email.php', {
					'Content-Type': 'multipart/form-data',
				}, proceeding_data)
				.then((res) => {
					var jsonData = JSON.parse(res['data']);
					setLoading(false);
					if (jsonData['success'] == 1) {
						Alert.alert('Alert!', 'Message Sent');
					} else {
						Alert.alert('Alert!', 'Message not Sent try again');
					}
					setLoading(false);
				}).catch(error => {
				setLoading(false);
				Alert.alert('Alert!', 'Oops..!! Failed to send. Please try again later');
			});
		} else {
			setLoading(false);
			Alert.alert('Alert!', 'Complete the form first');
		}
	};
	
	
	return (
		<ScrollView style={styles.container}>
			<View style={styles.inner}>
				<ImageBackground source={require('../../images/logo.png')} style={styles.logo}/>
				<Text style={styles.heading}>YOU CAN SEND MESSAGE TO OUR CONSULTANTS FOR ANY QUERY</Text>
				<Loader loading={loading}/>
				<TextInput editable={false} style={styles.inputStyle} placeholder='First Name' value={firstName}
						   onChangeText={(firstName) => setFirstName({firstName})} label='First Name'/>
				<TextInput editable={false} style={styles.inputStyle} placeholder='Last Name' value={lastName}
						   onChangeText={(lastName) => setLastName({lastName})} label='Last Name'/>
				<TextInput editable={false} style={styles.inputStyle} placeholder='Email' value={email}
						   onChangeText={(email) => setEmail({email})} label='Email'/>
				<TextInput style={styles.inputStyle} placeholder='Subject' value={subject}
						   onChangeText={(subject) => setSubject({subject})} label='Subject'/>
				<TextInput style={styles.textStyle} placeholder='Message' value={description}
						   onChangeText={(description) => setDescription({description})} label='Message'
						   multiline={true}/>
				<TouchableOpacity style={styles.button} onPress={() => {
					send_email();
				}}>
					<Text style={styles.submit_btn_txt}> SUBMIT </Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default Contact;
