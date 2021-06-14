import React, {useContext, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, ImageBackground, Text, View, Alert, Keyboard} from 'react-native';
import styles from '../../styles/contact';
import {AuthContext} from '../../src/AuthProvider';
import Loader from '../../components/loader';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

const UpdatePassword = () => {
	const {user} = useContext(AuthContext);
	let [oldPassword, setOldPassword] = useState(user['password']);
	let [newPassword, setNewPassword] = useState('');
	let [confirmPassword, setConfirmPassword] = useState('');
	let [loading, setLoading] = useState(false);
	
	const update_password = () => {
	
		if (!newPassword) {
			alert('Please Enter New Password');
			return;
		}
		if (!confirmPassword) {
			alert('Please Enter Confirm Password');
			return;
		}
		if (newPassword.newPassword !== confirmPassword.confirmPassword) {
			alert('Both New Passwords do not match');
			return;
		}
		
		
		
		let data = new FormData();
		data.append('id', user['uid']);
		data.append('password', newPassword.newPassword);
		
		fetch('https://leedsng.com/api/atc_updateUserInfo.php', {
			method: 'POST',
			body: data,
		}).then((responseData) => {
			return responseData.json();
		}).then(responseJson => {
			if (responseJson['success'] == 1) {
				setOldPassword('');
				setConfirmPassword('');
				setNewPassword('');
				alert('Info updated successfully.')
			} else {
				alert('Info updated successfully.')
			}
			setLoading(false);
		}).catch(error => {
			setLoading(false);
		});
		
	};
	
	return (
		<ScrollView style={styles.container}>
			<View style={styles.inner}>
				<Text style={styles.heading}>Update Password</Text>
				<Loader loading={loading}/>
				
				
				<TextInput editable={true} style={styles.inputStyle} placeholder='New Password' value={newPassword}
						   placeholderTextColor="#a3a3a3"
						   keyboardType="default"
						   onSubmitEditing={Keyboard.dismiss}
						   blurOnSubmit={false}
						   secureTextEntry={true}
						   onChangeText={(newPassword) => setNewPassword({newPassword})} label='New Password'/>
				
				<TextInput editable={true} style={styles.inputStyle} placeholder='Confirm Password'
						   value={confirmPassword}
						   placeholderTextColor="#a3a3a3"
						   keyboardType="default"
						   onSubmitEditing={Keyboard.dismiss}
						   blurOnSubmit={false}
						   secureTextEntry={true}
						   onChangeText={(confirmPassword) => setConfirmPassword({confirmPassword})}
						   label='Confirm Password'/>
				
				<TouchableOpacity style={styles.button}
								  onPress={update_password}
				>
					<Text style={styles.submit_btn_txt}> UPDATE </Text>
				</TouchableOpacity>
			
			</View>
		</ScrollView>
	);
};

export default UpdatePassword;
