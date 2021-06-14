import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {AuthContext} from '../src/AuthProvider';

const Logout = ({navigation, route}) => {
	const {logout} = useContext(AuthContext);
	return (
		<TouchableOpacity onPress={logout()}><Text>LOGOUT</Text></TouchableOpacity>
	);
};

export default Logout;
