import React, {useContext} from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {AuthContext} from '../src/AuthProvider';
import * as COLOR from '../styles/constants';

const UserGrid = props => {
	const {user, login, aldContent} = useContext(AuthContext);
	//console.log("asdasdsad", user)
	return (
		<ImageBackground
			source={{uri: user['profilepic']}}
			style={{
				width: '100%',
				height: 225,
				alignSelf: 'stretch',
				textAlign: 'center',
			}}
		>
			<View style={{backgroundColor: COLOR.primary_color, opacity: 0.7}}>
				<Image
					source={{uri: user['profilepic']}}
					style={{
						width:150,
						height: 150,
						marginTop: 10,
						borderRadius: 10,
						borderColor: COLOR.white,
						borderWidth: 2,
						alignSelf: 'center',
					}}/>
				<Text style={{
					width:'100%',
					height: 50,
					borderColor: COLOR.white,
					marginTop: 15,
					color: '#fff',
					borderTopWidth: 2,
					textAlign: 'center',
					lineHeight: 45,
					fontSize: 15
				}}>{user['firstname']} {user['lastname']}</Text>
			</View>
		</ImageBackground>
	);
};

export default UserGrid;
