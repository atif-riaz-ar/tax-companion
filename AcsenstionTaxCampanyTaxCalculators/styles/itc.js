import {StyleSheet} from 'react-native';
import * as COLOR from './constants';

const styles = StyleSheet.create({
	logo: {
		width: 200,
		height: 57.99,
		alignSelf: 'center',
		marginVertical: 10,
	},
	container: {
		paddingVertical: 15,
		paddingHorizontal: 5,
		flex: 1,
	},
	heading: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: COLOR.primary_color,
		fontSize: 15,
		paddingTop: 25,
		paddingBottom: 0,
		textDecorationLine: 'underline'
	},
	form: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: COLOR.primary_color,
		paddingHorizontal: '1%',
	},
	grid:{
		flex: 0,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		paddingTop: 5,
	},
	label: {
		textAlign: 'left',
		color: COLOR.extra_color2,
		fontSize: 13,
		paddingTop: 5,
		width: '77%',
	},
	sub_label: {
		textAlign: 'left',
		color: COLOR.extra_color2,
		fontSize: 13,
		fontWeight: 'bold',
		paddingTop: 5,
		width: '77%',
	},
	input: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: COLOR.extra_color0,
		fontSize: 15,
		padding: 0,
		width: '20%',
		marginLeft: '1%',
		backgroundColor: COLOR.extra_color1,
		borderBottomWidth: 1,
		borderBottomColor: COLOR.extra_color0
	},
	sub_result: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: COLOR.white,
		fontSize: 15,
		paddingHorizontal: 0,
		paddingVertical: 3,
		width: '20%',
		marginLeft: '1%',
		backgroundColor: COLOR.extra_color5,
		borderWidth: 1,
		borderColor: COLOR.extra_color0
	},
});

export default styles;
