import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	mainBody: {
		flex: 1,
		justifyContent: 'center',
		// backgroundColor: '#307ecc',
	},
	bg_image: {
		flex: 1,
		width:'100%',
		height: '100%',
		alignItems: 'center',
		position: 'absolute',
		opacity:0.2,
	},
	SectionStyle: {
		flexDirection: 'row',
		height: 40,
		marginTop: 20,
		marginLeft: 35,
		marginRight: 35,
		margin: 10,
	},
	buttonStyle: {
		backgroundColor: '#4a5b87',
		borderWidth: 0,
		color: '#FFFFFF',
		borderColor: '#7DE24E',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 35,
		marginRight: 35,
	},
	buttonStyleFB: {
		backgroundColor: '#3b66c4',
		borderWidth: 0,
		color: '#FFFFFF',
		borderColor: '#7DE24E',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 35,
		marginRight: 35,
	},
	buttonStyleGoogle: {
		backgroundColor: '#cf4332',
		borderWidth: 0,
		color: '#FFFFFF',
		borderColor: '#7DE24E',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 35,
		marginRight: 35,
	},
	buttonTextStyle: {
		color: '#FFFFFF',
		paddingVertical: 10,
		fontSize: 16,
	},
	inputStyle: {
		flex: 1,
		color: '#000',
		height: 50,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		paddingLeft: 15,
		paddingRight: 15,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#000',
	},
	registerTextStyle: {
		color: '#4a5b87',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 14,
	},
	errorTextStyle: {
		color: 'red',
		textAlign: 'center',
		fontSize: 14,
	},
	logo: {
		width: '80%',
		height: 100,
		resizeMode: 'contain',
		margin: 30,
	},
});

export default styles;