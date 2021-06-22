import React, { useState, useContext } from 'react';
import {
	TextInput,
	View,
	Text,
	ScrollView,
	Image,
	Keyboard,
	TouchableOpacity,
	KeyboardAvoidingView,
	ImageBackground,
} from 'react-native';
import styles from '../styles/login';
import { AuthContext } from '../src/AuthProvider';
import Loader from '../components/loader';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from '@react-native-community/google-signin';

const FBSDK = require('react-native-fbsdk');
const {
	LoginManager,
	LoginButton,
	AccessToken,
	GraphRequest,
	GraphRequestManager,
} = FBSDK;

const Login = ({ navigation }) => {

	let [userData, setUserData] = useState([]);
	let [userEmail, setUserEmail] = useState('');
	let [userPassword, setUserPassword] = useState('');
	let [loading, setLoading] = useState(false);
	let [errortext, setErrortext] = useState('');

	const getResponseInfo = (error, result) => {
		if (error) {
			alert('Error fetching data: ' + error.toString());
		} else {
			let data = new FormData();
			data.append('email', result.email);
			data.append('password', "FbLogin");
			data.append('profilepic', result.picture.data.url);
			data.append('name', result.name);
			SocialLoginTrigger(data);
		}
	};

	const SocialLoginTrigger = (data) => {
		setLoading(true);
		fetch('https://leedsng.com/api/atc_login_social.php', {
			method: 'POST',
			body: data,
		}).then((responseData) => {
			return responseData.json();
		}).then(responseJson => {
			if (responseJson['success'] == 1) {
				setUserData(responseJson['user']);
				const fs = RNFetchBlob.fs;
				let imagePath = null;
				RNFetchBlob.config({
					fileCache: true,
				})
					.fetch('GET', responseJson['user']['profilepic'])
					.then(resp => {
						let user = userData;
						let base64Str = resp.data;
						var imageBase64 = 'data:image/jpg' + ';base64,' + base64Str;
						const user_defined = responseJson['user']['profile_image'] = imageBase64;
						AsyncStorage.setItem('user', JSON.stringify(responseJson['user'])).then(() => {
							login();
							setLoading(false);
						},
						);
					});
			} else {
				setLoading(false);
				setErrortext('Please check your email id or password');
			}
		}).catch(error => {
			setLoading(false);
		});
	}

	const LoginWithFB = () => {
		LoginManager.logInWithPermissions(['public_profile', 'email']).then(
			function (result) {
				if (result.isCancelled) {
					alert('Login was cancelled');
				} else {
					AccessToken.getCurrentAccessToken().then((data) => {
						const processRequest = new GraphRequest(
							'/me?fields=email,name,picture.type(large)',
							null,
							getResponseInfo,
						);
						new GraphRequestManager()
							.addRequest(processRequest).start();
					});
				}
			},
			function (error) {
				//console.error(error);
				alert('Login failed with error: ' + error);
			},
		);
	};

	const { login } = useContext(AuthContext);

	const signInWithGoogle = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			let result = userInfo.user;
			console.log(userInfo)

			let data = new FormData();
			data.append('email', result.email);
			data.append('password', "FbLogin");
			data.append('profilepic', result.photo);
			data.append('name', result.name);
			SocialLoginTrigger(data);
		} catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				alert("Sign in cancelled")
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	};

	GoogleSignin.configure({
		webClientId: '1060001755009-m6esti7c4re3hude0hr6cpri8b3p6go6.apps.googleusercontent.com',
		offlineAccess: true
	});

	const handleSubmitPress = () => {
		setErrortext('');
		if (!userEmail) {
			alert('Please fill Email');
			return;
		}
		if (!userPassword) {
			alert('Please fill Password');
			return;
		}
		setLoading(true);

		var data = new FormData();
		data.append('email', userEmail);
		data.append('password', userPassword);
		data.append('isnative', 1);

		fetch('https://leedsng.com/api/atc_login.php', {
			method: 'POST',
			body: data,
		}).then((responseData) => {
			return responseData.json();
		}).then(responseJson => {
			if (responseJson['success'] == 1) {
				setUserData(responseJson['user']);
				const fs = RNFetchBlob.fs;
				let imagePath = null;
				RNFetchBlob.config({
					fileCache: true,
				})
					.fetch('GET', responseJson['user']['profilepic'])
					.then(resp => {
						let user = userData;
						let base64Str = resp.data;
						var imageBase64 = 'data:image/jpg' + ';base64,' + base64Str;
						const user_defined = responseJson['user']['profile_image'] = imageBase64;
						AsyncStorage.setItem('user', JSON.stringify(responseJson['user'])).then(() => {
							login();
							setLoading(false);
						},
						);
					});
			} else {
				setLoading(false);
				setErrortext('Please check your email id or password');
			}
		}).catch(error => {
			setLoading(false);
		});
	};

	return (
		<View style={styles.mainBody}>
			<ImageBackground
				source={require('../images/hammer.png')}
				style={styles.bg_image}
			/>
			<Loader loading={loading} />
			<ScrollView keyboardShouldPersistTaps="handled">
				<View contentContainerStyle={{ justifyContent: 'center', marginTop: 100 }}>
					<KeyboardAvoidingView enabled>
						<View style={{ alignItems: 'center' }}>
							<Image
								source={require('../images/logo.png')}
								style={styles.logo}
							/>
						</View>
						<View style={styles.SectionStyle}>
							<TextInput
								style={styles.inputStyle}
								onChangeText={userEmail => setUserEmail(userEmail)}
								value={userEmail}
								placeholder="Enter Email"
								placeholderTextColor="#a3a3a3"
								autoCapitalize="none"
								keyboardType="email-address"
								blurOnSubmit={false}
							/>
						</View>
						<View style={styles.SectionStyle}>
							<TextInput
								style={styles.inputStyle}
								placeholder="Enter Password" //12345
								onChangeText={userPassword => setUserPassword(userPassword)}
								value={userPassword}
								placeholderTextColor="#a3a3a3"
								keyboardType="default"
								onSubmitEditing={Keyboard.dismiss}
								blurOnSubmit={false}
								secureTextEntry={true}
							/>
						</View>
						{errortext != '' ? (
							<Text style={styles.errorTextStyle}> {errortext} </Text>
						) : null}
						<TouchableOpacity
							style={styles.buttonStyle}
							activeOpacity={0.5}
							onPress={handleSubmitPress}>
							<Text style={styles.buttonTextStyle}>LOGIN</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonStyleFB}
							activeOpacity={0.5}
							onPress={LoginWithFB}>
							<Text style={styles.buttonTextStyle}>LOGIN WITH FACEBOOK</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonStyleGoogle}
							activeOpacity={0.5}
							onPress={signInWithGoogle}>
							<Text style={styles.buttonTextStyle}>SIGN IN WITH GOOGLE+</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonStyle}
							activeOpacity={0.5}
							onPress={() => navigation.navigate('Register')}>
							<Text style={styles.buttonTextStyle}>CREATE ACCOUNT</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</View>
			</ScrollView>
			<View style={{ backgroundColor: '#000080' }}>
				<Text style={{ textAlign: 'center', color: "white", fontSize: 20, paddingVertical: 10 }}>
					Ascensionng.com
				</Text>
			</View>
		</View>
	);
};
export default Login;

