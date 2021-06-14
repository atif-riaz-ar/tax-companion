import React, { useContext, useState } from 'react';
import {
	ScrollView,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	Text,
	View,
	Alert,
	Image,
	KeyboardAvoidingView, Keyboard,
} from "react-native";
import styles from '../../styles/register';
import { AuthContext } from '../../src/AuthProvider';
import Loader from '../../components/loader';
import RNFetchBlob from "rn-fetch-blob";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ProfileUpdateImage = () => {

	const { user } = useContext(AuthContext);

	let [imageSourceData, setImageSourceData] = useState(null);
	let [UID, setUID] = useState(user["uid"]);
	let [fullImage, setFullImage] = useState(null);
	let [loading, setLoading] = useState(false);
	let [errortext, setErrortext] = useState('');
	const [response, setResponse] = useState(null);


	const handleSubmitButton = () => {
		setErrortext('');
		if (!imageSourceData) {
			alert('Please Select a Profile Picture');
			return;
		}

		setLoading(true);

		const formData = new FormData();
		let iamgeSourcex = response.assets[0].uri;
		const uriPart = iamgeSourcex.split('.');
		const fileExtension = uriPart[uriPart.length - 1];

		formData.append('id', UID);
		formData.append('profilepic', {
			uri: iamgeSourcex,
			name: `photo.${fileExtension}`,
			type: `image/${fileExtension}`
		});

		//API that use fetch to input data to database via backend php script
		fetch('https://leedsng.com/api/atc_updateImage.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: formData
		})
			.then((response) => response.json())
			.then((res) => {
				console.log(res)
				if (res.success == 1) {
					alert('Successfully updated. Login again to see the changes..!!');
				} else {
					setErrortext('Update Unsuccessful');
				}
				setLoading(false);
			})
			.catch((error) => {
				alert('Failed to update..!!');
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

	return (
		<View style={{
			flex: 1,
		}}>
			<Loader loading={loading} />
			<ScrollView keyboardShouldPersistTaps="handled">
				<KeyboardAvoidingView enabled>
					<ScrollView>
						<Loader loading={loading} />

						{errortext != '' ? (
							<Text style={styles.errorTextStyle}> {errortext} </Text>
						) : null}
						<Image style={styles.preview_image}
							source={imageSourceData != null ? imageSourceData :
								require('../../images/na.png')}
						/>


						<TouchableOpacity style={styles.buttonStyle} onPress={selectPhoto.bind(this)}>
							<Text style={styles.buttonTextStyle}>Take a Photo</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonStyle} onPress={selectPhoto_gallery.bind(this)}>
							<Text style={styles.buttonTextStyle}>Upload Image from Gallery</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.buttonStyle}
							activeOpacity={0.5}
							onPress={handleSubmitButton}>
							<Text style={styles.buttonTextStyle}>Update</Text>
						</TouchableOpacity>
					</ScrollView>

				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
};

export default ProfileUpdateImage;
