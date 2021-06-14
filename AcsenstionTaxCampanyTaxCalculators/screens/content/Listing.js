import React, {useContext, useState} from 'react';
import {Image, TextInput, FlatList, TouchableOpacity, ScrollView, View, StyleSheet, Text} from 'react-native';
import {AuthContext} from '../../src/AuthProvider';
import Calculators from '../../src/Calculators';
import * as COLOR from '../../styles/constants';
import * as ICON from '../../components/icons';
import Contact from '../temp/Conact';
import Webinar from '../temp/Webinar';
import News from '../temp/News';
import PitCalculator from '../temp/PitCalculator';
import VatCalculator from '../temp/VatCalculator';
import IncomeTaxCalculator from '../temp/IncomeTaxCalculator';

const Listing = ({navigation, route}) => {
	const {atcContent} = useContext(AuthContext);
	
	const [query, setQuery] = useState('');
	var data = [];
	if (route.name === 'Tax Law') {
		data = JSON.parse(atcContent)['tax_law'];
	}
	if (route.name === 'Legislation') {
		data = JSON.parse(atcContent)['legislation'];
	}
	if (route.name === 'Videos') {
		data = JSON.parse(atcContent)['videos'];
	}
	if (route.name === 'Caselaws') {
		data = JSON.parse(atcContent)['caselaws'];
	}
	if (route.name === 'Alert') {
		data = JSON.parse(atcContent)['alert'];
	}
	if (route.name === 'Dictionary') {
		data = JSON.parse(atcContent)['dictionary'];
	}
	if (route.name === 'Calendar') {
		data = JSON.parse(atcContent)['calendar'];
	}
	if (route.name === 'Circular') {
		data = JSON.parse(atcContent)['circular'];
	}
	if (route.name === 'Tax Treaty') {
		data = JSON.parse(atcContent)['tax_treaty'];
	}
	
	if (route.name === 'Company Income Tax') {
		return <IncomeTaxCalculator />;
	}
	if (route.name === 'Value Added Tax') {
		return <VatCalculator />;
	}
	if (route.name === 'SME Corner') {
		data = JSON.parse(atcContent)['sme_corner'];
		return <Calculators navigation={navigation} data={JSON.parse(atcContent)['sme_corner']}/>;
	}
	if (route.name === 'Live Webinar') {
		return <Webinar navigation={navigation} route={route} />;
	}
	if (route.name === 'Ask an Expert') {
		return <Contact navigation={navigation} route={route} />;
	}
	if (route.name === 'News') {
		return <News />;
	}
	if (route.name === 'PIT Calculator') {
		return <PitCalculator />;
	}
	
	const [fullData, setFullData] = useState(data);
	
	const handleSearch = text => {
		let filteredData = data.filter(x => String(x.title.toLowerCase()).includes(text.toLowerCase()));
		setFullData(filteredData);
		setQuery(text);
	};
	
	if (data !== undefined) {
		return (
			<ScrollView style={{
				flex: 1,
				backgroundColor: COLOR.extra_color1,
			}}>
				<View>
					<Image style={{width: '100%'}} source={require('../../images/download.jpg')}/>
				</View>
				
				<View
					style={{
						backgroundColor: '#fff',
						padding: 5,
						marginVertical: 10,
						marginHorizontal: 12,
						borderWidth: 1,
						borderRadius: 5
					}}
				>
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						clearButtonMode="always"
						value={query}
						onChangeText={queryText => handleSearch(queryText)}
						placeholder="Search"
						style={{backgroundColor: '#fff', paddingHorizontal: 20}}
					/>
				</View>
				
				<FlatList
					data={fullData}
					keyExtractor={item => item.id}
					renderItem={({item}) => (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('Content', {
									item_title: item.title,
									item: item,
								});
							}}
							style={{
								backgroundColor: COLOR.white,
								paddingVertical: 15,
								marginVertical: 7,
								marginHorizontal: 14,
								borderRadius: 5,
								borderWidth: 1,
								borderColor: COLOR.extra_color2,
								flex: 1,
								flexDirection: 'row',
								flexWrap: 'wrap',
								alignItems: 'flex-start',
							}}
						>
							<View style={{
								width: '85%',
								height: '100%',
								justifyContent: 'center',
								paddingLeft: 20,
							}}>
								<Text style={{
									fontSize: 16,
									color: COLOR.primary_color,
									fontWeight: 'bold',
								}}>{item.title}</Text>
								<Text style={{
									fontSize: 12,
									color: COLOR.extra_color0,
									textDecorationLine: 'underline',
									textDecorationStyle: 'solid',
									textDecorationColor: COLOR.black,
									fontWeight: 'bold',
								}}>{item.date_created}</Text>
							</View>
							<View style={{
								width: '15%',
								justifyContent: 'center',
								height: '100%',
								paddingLeft: 15,
							}}>
								<ICON.getIcon width={24} height={24} name="goto" color={COLOR.primary_color}/>
							</View>
						</TouchableOpacity>
					)}
				/>
			</ScrollView>
		);
	} else {
		return (
			<ScrollView style={{
				flex: 1,
				backgroundColor: COLOR.extra_color3,
			}}>
				<View style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
					<Text style={{
						color: COLOR.white,
						fontSize: 20,
						paddingVertical: 40,
					}}>No Content Found</Text>
				</View>
			</ScrollView>
		);
	}
};

export default Listing;
