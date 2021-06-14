import React, {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = React.createContext({
	user: null,
	atcContent: null,
	appData: () => null,
	login: () => null,
	logout: () => null,
});


//auth Provider Function
const AuthProvider = ({children}) => {
	const [user, setUser] = useState('');
	const [atcContent, setAtcContent] = useState('');
	return (
		<AuthContext.Provider value={{
			user,
			atcContent,
			appData: () => {
				fetch('https://leedsng.com/api/getAllAtcData.php', {
					method: 'GET',
				}).then((tt) => {
					return tt.json();
				}).then((jj) => {
					setAtcContent(JSON.stringify(jj.contents));
				}).done();
			},
			login: () => {
				AsyncStorage.getItem('user').then((loginUser) => {
					setUser(JSON.parse(loginUser));
				});
			},
			logout: () => {
				setUser('');
				AsyncStorage.removeItem('user');
				AsyncStorage.removeItem('atcContent');
			},
		}}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
