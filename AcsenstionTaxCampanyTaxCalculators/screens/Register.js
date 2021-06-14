import React, { useState } from 'react';

import {
	Alert,
	TextInput,
	View,
	Text,
	Image,
	KeyboardAvoidingView,
	Keyboard,
	TouchableOpacity,
	ScrollView, ImageBackground,
} from 'react-native';
import styles from '../styles/register';
import RNFetchBlob from 'rn-fetch-blob';
import Loader from '../components/loader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const Register = ({ navigation, route }) => {

	let [imageSourceData, setImageSourceData] = useState(null);
	let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
	let [userName, setUserName] = useState('');
	let [userEmail, setUserEmail] = useState('');
	let [userLname, setUserLname] = useState('');
	let [userPassword, setUserPassword] = useState('');
	let [fullImage, setFullImage] = useState(null);
	let [loading, setLoading] = useState(false);
	let [errortext, setErrortext] = useState('');
	const [response, setResponse] = useState(null);

	const handleSubmitButton = () => {
		setErrortext('');
		if (!userName) {
			alert('Please fill Name');
			return;
		}
		if (!userEmail) {
			alert('Please fill Email');
			return;
		}
		if (!userLname) {
			alert('Please fill Lname');
			return;
		}
		if (!userPassword) {
			alert('Please fill Password');
			return;
		}
		let ImagePresense = true
		if (!imageSourceData) {
			ImagePresense = false
		}
		if (!fullImage) {
			ImagePresense = false
		}

		setLoading(true);

		const formData = new FormData();
		//Add your input data
		formData.append('firstname', userName);
		formData.append('lastname', userLname);
		formData.append('email', userEmail);
		formData.append('password', userPassword);

		//Add your photo
		//this, retrive the file extension of your photo
		let iamgeSourcex = response.assets[0].uri;
		const uriPart = iamgeSourcex.split('.');
		const fileExtension = uriPart[uriPart.length - 1];

		formData.append('profilepic', {
			uri: iamgeSourcex,
			name: `photo.${fileExtension}`,
			type: `image/${fileExtension}`
		});

		//API that use fetch to input data to database via backend php script
		fetch('https://leedsng.com/api/atc_register.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: formData
		})
			.then((response) => response.json())
			.then((res) => {
				if (res.success == 1) {
					setIsRegistraionSuccess(true);
				}

				else {
					setErrortext('Registration Unsuccessful');
				}
				setLoading(false);

			})
			.catch((error) => {
				Alert.alert(error);
				setLoading(false);
			});
	};

	const selectPhoto = () => {
		const options = {
			mediaType: 'photo',
			quality: 0.4,
		};
		launchCamera(options, response => {
			if (response.didCancel) {
				//cancel
			} else if (response.error) {
				//error
			}
			else {
				let source = { uri: response.assets[0].uri };
				setResponse(response)
				setImageSourceData(source);
			}
		});
	};

	const selectPhoto_gallery = () => {
		const options = {
			mediaType: 'photo',
			quality: 0.4
		};
		launchImageLibrary(options, response => {
			if (response.didCancel) {
				//cancel
			} else if (response.error) {
				//error
			}
			else {
				let source = { uri: response.assets[0].uri };
				setResponse(response)
				setImageSourceData(source);
			}
		});
	};

	if (isRegistraionSuccess) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
				}}>
				<ImageBackground
					source={require('../images/hammer.png')}
					style={styles.bg_image}
				/>
				<Image
					source={require('../images/success.png')}
					style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
				/>

				<Text style={styles.successTextStyle}>Registration Successful.</Text>
				<TouchableOpacity
					style={styles.buttonStyle}
					activeOpacity={0.5}
					onPress={() => navigation.navigate('Login')}>
					<Text style={styles.buttonTextStyle}>Login Now</Text>
				</TouchableOpacity>
			</View>
		);
	}
	return (
		<View style={{
			flex: 1,
		}}>
			<ImageBackground
				source={require('../images/hammer.png')}
				style={styles.bg_image}
			/>
			<Loader loading={loading} />
			<ScrollView keyboardShouldPersistTaps="handled">
				<View style={{ alignItems: 'center' }}>
					<Image
						source={require('../images/logo.png')}
						style={{
							width: '80%',
							height: 100,
							resizeMode: 'contain',
							margin: 30,
						}}
					/>
				</View>
				<KeyboardAvoidingView enabled>
					<View style={styles.SectionStyle}>
						<TouchableOpacity
							style={styles.buttonStyleGoogle}
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Login')}>
							<Text style={styles.buttonTextStyle}>Already Have an Account?</Text>
						</TouchableOpacity>
					</View>
					<ScrollView>
						<Loader loading={loading} />

						<View style={styles.SectionStyle}>
							<TextInput
								style={styles.inputStyle}
								onChangeText={userName => setUserName(userName)}
								value={userName}
								placeholder="Enter Name"
								placeholderTextColor="#a3a3a3"
								autoCapitalize="words"
								returnKeyType="next"
								blurOnSubmit={false}
							/>
						</View>
						<View style={styles.SectionStyle}>
							<TextInput
								style={styles.inputStyle}
								onChangeText={userLname => setUserLname(userLname)}
								value={userLname}
								placeholder="Enter Lastname"
								placeholderTextColor="#a3a3a3"
								returnKeyType="next"
								blurOnSubmit={false}
							/>
						</View>
						<View style={styles.SectionStyle}>
							<TextInput
								style={styles.inputStyle}
								placeholder="Enter Email"
								onChangeText={userEmail => setUserEmail(userEmail)}
								value={userEmail}
								placeholderTextColor="#a3a3a3"
								autoCapitalize="none"
								keyboardType="email-address"
								returnKeyType="next"
								blurOnSubmit={false}
							/>
						</View>
						<View style={styles.SectionStyle}>
							<TextInput
								style={styles.inputStyle}
								onChangeText={userPassword => setUserPassword(userPassword)}
								value={userPassword}
								placeholder="Enter Password"
								placeholderTextColor="#a3a3a3"
								autoCapitalize="words"
								onSubmitEditing={Keyboard.dismiss}
								blurOnSubmit={false}
							/>
						</View>
						{errortext != '' ? (
							<Text style={styles.errorTextStyle}> {errortext} </Text>
						) : null}
						<Image style={styles.preview_image}
							source={imageSourceData != null ? imageSourceData :
								require('../images/na.png')}
						/>

						<TouchableOpacity style={styles.buttonStyle} onPress={selectPhoto.bind(this)}>
							<Text style={styles.buttonTextStyle}>Take Photo From Camera</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.buttonStyle} onPress={selectPhoto_gallery.bind(this)}>
							<Text style={styles.buttonTextStyle}>Upload Image From Gallery</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.buttonStyle}
							activeOpacity={0.5}
							onPress={handleSubmitButton}>
							<Text style={styles.buttonTextStyle}>REGISTER</Text>
						</TouchableOpacity>
					</ScrollView>

				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
};

export default Register;

