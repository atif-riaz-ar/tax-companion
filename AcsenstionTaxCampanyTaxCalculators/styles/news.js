import {StyleSheet} from 'react-native';
import * as COLOR from './constants';

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLOR.extra_color3,
		padding: 20,
	},
	logo: {
		width: 297,
		height: 79.2,
		alignSelf: 'center',
		marginVertical: 30,
	},
	inner: {
		backgroundColor: COLOR.white,
		padding: 20,
		marginTop: 10,
		marginBottom: 50,
		borderRadius: 15,
		borderWidth: 2,
	},
	inputStyle: {
		flex: 1,
		color: '#000',
		marginTop: 15,
		height: 40,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		paddingLeft: 15,
		paddingRight: 15,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: COLOR.black,
	},
	textStyle: {
		flex: 1,
		color: COLOR.black,
		marginTop: 15,
		height: 120,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		paddingLeft: 15,
		paddingRight: 15,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#000',
		textAlignVertical: 'top',
	},
	heading: {
		padding: 15,
		textAlign: 'center',
		fontSize: 20,
		color: COLOR.primary_color,
		fontWeight: 'bold',
	},
	submit_btn_txt: {
		backgroundColor: '#4a5b87',
		color: COLOR.white,
		height: 50,
		textAlign: 'center',
		borderRadius: 8,
		marginTop: 20,
		marginBottom: 20,
		lineHeight: 45,
		fontSize: 20,
		letterSpacing: 3,
		fontWeight: 'bold',
	},
});

export default styles;
