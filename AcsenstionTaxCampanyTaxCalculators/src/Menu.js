import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as COLOR from '../styles/constants';
import * as ICON from '../components/icons';

const Menu = (props) => {
	return (
		<TouchableOpacity onPress={() => props.nav.navigate(props.title)} style={{
			flex: 1,
			flexDirection: 'row',
			backgroundColor: props.currentTab == props.title? COLOR.primary_color : COLOR.white,
			margin: 3,
			borderRadius: 5,
			borderBottomWidth: 1,
			borderColor: COLOR.extra_color1,
		}}>
			<View style={{
				flex: 0,
				margin: 10,
				width: 40
			}}>
				<ICON.getIcon
					width={28}
					height={28}
					name={props.icon}
					color={props.currentTab == props.title? COLOR.white : COLOR.primary_color}
				/>
			</View>
			<Text style={{
				flex: 1,
				fontSize: 15,
				paddingTop: 12,
				color: props.currentTab == props.title? COLOR.white : COLOR.primary_color
			}}>{props.title}</Text>
		</TouchableOpacity>
	);
};

export default Menu;
