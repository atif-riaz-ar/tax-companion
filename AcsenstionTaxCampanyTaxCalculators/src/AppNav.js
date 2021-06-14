import React, {useContext} from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, ScrollView,TouchableOpacity} from 'react-native';
import UserStack from '../src/UserStack';
import ListingStack from '../src/ListingStack';
import Menu from '../src/Menu';
import SubMenu from '../src/SubMenu';
import NewsListingStack from '../src/NewsListingStack';
import UserGrid from '../screens/UserGrid';
import {AuthContext} from './AuthProvider';
import Logout from '../components/Logout';
import * as COLOR from '../styles/constants';
import * as ICON from '../components/icons';
import IncomeTaxCalculator from '../screens/temp/IncomeTaxCalculator';
import VatCalculator from '../screens/temp/VatCalculator';
import BankTransfer from '../screens/content/BankTransfer';
import Payment from '../screens/content/Payment';


const Nav = createDrawerNavigator();

const AppNav = ({}) => {
	
	const CustomDrawerBefore = props => {
		var current_tab = props.state.history.length < 2 ? 'News' : props.state.history[props.state.history.length -2].key.split('-')[0];
		return (
			<View>
				<TouchableOpacity onPress={()=> {props.navigation.navigate('User Profile')}}
				style={{
					margin: 3,
					borderRadius: 5,
					overflow: 'hidden',
					borderBottomWidth: 1,
			borderColor: COLOR.extra_color1
				}}>
					<UserGrid/>
				</TouchableOpacity>
				<ScrollView style={{marginBottom: 225,}}>
					<Menu title="News" icon="legal_news" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Videos" icon="videos" nav={props.navigation} currentTab={current_tab}/>
					<SubMenu title="Calculators" icon="calculator" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Legislation" icon="legislation" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Caselaws" icon="caselaws" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Alert" icon="alert" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Dictionary" icon="legal_dictionary" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Calendar" icon="calendar" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="SME Corner" icon="sme_corner" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Live Webinar" icon="live_webinar" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Ask an Expert" icon="contact" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Circular" icon="circular" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="PIT Calculator" icon="company_income_tax" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Tax Treaty" icon="tax_treaty" nav={props.navigation} currentTab={current_tab}/>
					<Menu title="Logout" icon="logout" nav={props.navigation} currentTab={current_tab}/>
				</ScrollView>
			</View>
		);
	};
	
	
	const {logout} = useContext(AuthContext);
	const getMyIcon = (navigation, icon) => {
		return {
			drawerIcon: () => {
				return <ICON.getIcon width={28} height={28} name={icon}
										 color={navigation.isFocused() ? COLOR.white : COLOR.primary_color}/>;
			},
		};
	};
	
	return (
		<Nav.Navigator
			initialRouteName="News"
			drawerContentOptions={{
				activeTintColor: COLOR.white,
				activeBackgroundColor: COLOR.primary_color,
				inactiveBackgroundColor: COLOR.white,
				inactiveTintColor: COLOR.primary_color,
			}}
			drawerContent={props => CustomDrawerBefore(props)}
		>
			<Nav.Screen name="User Profile" component={UserStack} options={{
				drawerLabel: '', title: null, drawerIcon: () => {
					return <UserGrid/>;
				},
			}}/>
			<Nav.Screen name="News" component={NewsListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'legal_news');
			}}/>
			<Nav.Screen name="Videos" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'videos');
			}}/>
			<Nav.Screen name="Business Tax" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'tax_law');
			}}/>
			<Nav.Screen name="Legislation" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'legislation');
			}}/>
			<Nav.Screen name="Caselaws" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'caselaws');
			}}/>
			<Nav.Screen name="Alert" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'alert');
			}}/>
			<Nav.Screen name="Dictionary" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'legal_dictionary');
			}}/>
			<Nav.Screen name="Calendar" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'calendar');
			}}/>
			<Nav.Screen name="SME Corner" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'sme_corner');
			}}/>
			<Nav.Screen name="Live Webinar" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'live_webinar');
			}}/>
			<Nav.Screen name="Bank Transfer" component={BankTransfer} options={({navigation}) => {
				return getMyIcon(navigation, 'live_webinar');
			}}/>
			<Nav.Screen name="Payment" component={Payment} options={({navigation}) => {
				return getMyIcon(navigation, 'live_webinar');
			}}/>
			<Nav.Screen name="Company Income Tax" component={IncomeTaxCalculator} options={({navigation}) => {
				return getMyIcon(navigation, 'live_webinar');
			}}/>
			<Nav.Screen name="Value Added Tax" component={VatCalculator} options={({navigation}) => {
				return getMyIcon(navigation, 'live_webinar');
			}}/>
			<Nav.Screen name="Ask an Expert" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'contact');
			}}/>
			<Nav.Screen name="Circular" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'circular');
			}}/>
			<Nav.Screen name="Tax Treaty" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'tax_treaty');
			}}/>
			<Nav.Screen name="PIT Calculator" component={ListingStack} options={({navigation}) => {
				return getMyIcon(navigation, 'calculator');
			}}/>
			<Nav.Screen name="Logout" component={Logout} options={({navigation}) => {
				return getMyIcon(navigation, 'logout');
			}}/>
		</Nav.Navigator>
	);
};

export default AppNav;
