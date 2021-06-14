import React, {useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, Platform, View, StyleSheet, Text} from 'react-native';
import * as COLOR from '../../styles/constants';

const BankTransfer = ({navigation, route}) => {
	//console.log("========================================================",navigation)
	const product = route.params.product;
	return (
		<ScrollView style={{
			flex: 1,
			backgroundColor: COLOR.white,
			flexDirection: 'column',
			padding: 10,
			margin: 5,
			borderRadius: 15,
			borderWidth: 2,
		}}>
			<Text style={styles.main_heading}>Electronic Funds Transfer</Text>
			<Text style={styles.sub_heading}>Monthly Payment Sunsciption</Text>
			<Text style={styles.txt}>{product.currency} {product.localizedPrice}</Text>
			<Text style={styles.sub_heading}>Account Name</Text>
			<Text style={styles.txt}>Stanbic Ibtc Bank</Text>
			<Text style={styles.sub_heading}>Account Title</Text>
			<Text style={styles.txt}>Ascension Academy Institute Limited</Text>
			<Text style={styles.sub_heading}>Account Number</Text>
			<Text style={styles.txt}>NGN ACCOUNT 0015654691</Text>
			<Text style={styles.description}>Once payment has been made kindly send proof of your payment with details,
				(First name, Last name, Email Address) to acs.leedsng@gmail.com</Text>
			<Text style={styles.description}>Address: AFRIBANK STREET VICTORIA ISLAND, LAGOS.</Text>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	main_heading: {
		fontSize: 25,
		color: COLOR.extra_color4,
		textAlign: 'center',
		fontWeight: 'bold',
		marginVertical: 18,
	},
	sub_heading: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLOR.extra_color4,
		marginTop: 10,
	},
	txt: {
		fontSize: 20,
		fontWeight: 'bold',
		color: COLOR.extra_color2,
		marginBottom: 10,
	},
	description: {
		color: COLOR.extra_color2,
		marginVertical: 20,
		fontSize: 15,
	},
});

export default BankTransfer;
