import React, {useState} from 'react';
import {ScrollView, Dimensions, TouchableOpacity, StyleSheet, View, FlatList, Text} from 'react-native';
import * as ICON from '../components/icons';
import * as COLOR from '../styles/constants';

const window = Dimensions.get('window');

const Calculators = (props) => {
	let items = [
		{icon: 'company_income_tax', move_to: 'ListingStack', name: 'Company Income Tax', description:'Income Tax Calculator'},
		{icon: 'value_added_tax', move_to: 'ListingStack', name: 'Value Added Tax', description:'Vat Calculator'},
	];
	return (
		<View>
			<ScrollView style={styles.container}>
				<FlatList
					data={props.data}
					keyExtractor={item => item.id}
					renderItem={({item}) => (
						<TouchableOpacity
							onPress={() => {
								props.navigation.navigate('Content', {
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
		</View>
	);
};
export default Calculators;
const new_height = window.height - 255;
const grid_padding = ((new_height - 120)) / 25;
const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: new_height,
	},
	grid: {
		flex: 1,
		flexDirection: 'column',
		borderRadius: 10,
		backgroundColor: COLOR.white,
		borderColor: COLOR.primary_color,
		borderWidth: 1,
		alignItems: 'center',
		paddingVertical: grid_padding,
		marginHorizontal: 15,
		marginVertical: 6,
	},
	grid_text: {
		color: COLOR.primary_color,
		paddingTop: 10,
		width: '100%',
		textAlign: 'center',
	},
	imageThumbnail: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
	},
});
