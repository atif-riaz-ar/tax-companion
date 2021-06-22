import React, {useState} from 'react';
import {LayoutAnimation, Text, TouchableOpacity, View} from 'react-native';
import * as COLOR from '../styles/constants';
import * as ICON from '../components/icons';

const SubMenu = (props) => {
	const CurrentNav = props.currentTab;
	let CatSelected = false;
	if(CurrentNav == 'Company Income Tax' || CurrentNav == 'Value Added Tax'){
		CatSelected = true;
	}
	const [layoutHeight, setLayoutHeight] = useState(0);

	const updateLayout = () => {
		layoutHeight == 0 ? setLayoutHeight(null) : setLayoutHeight(0);
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
	};

	return (
		<View style={{marginBottom: 10}}>
			<TouchableOpacity onPress={updateLayout} style={{
				flex: 1,
				flexDirection: 'row',
				backgroundColor: CatSelected == true? COLOR.primary_color : COLOR.white,
				margin: 3,
				borderRadius: 5,
				borderBottomWidth: 1,
				borderColor: COLOR.extra_color1
			}}>
				<View style={{
					flex: 0,
					margin: 10,
					width: 40,
				}}>
					<ICON.getIcon
						width={28}
						height={28}
						name={props.icon}
						color={CatSelected == true ? COLOR.white : COLOR.primary_color}
					/>
				</View>
				<Text style={{flex: 1, fontSize: 15, paddingTop: 12, color: CatSelected == true ? COLOR.white : COLOR.primary_color}}>Business Tax</Text>
			</TouchableOpacity>
			<View style={{
				height: layoutHeight,
				overflow: 'hidden'
				}}>
				<TouchableOpacity onPress={() => props.nav.navigate('Company Income Tax')} style={{
					backgroundColor: CurrentNav == 'Company Income Tax' ? COLOR.primary_color : COLOR.white,
					marginLeft: 30,
					marginRight: 10,
					borderRadius: 5,
					paddingLeft: 10,
					borderBottomWidth: 1,
					borderColor: COLOR.extra_color1
				}}>
					<Text style={{
						width: 200,
						borderRadius: 4,
						padding: 5,
						fontSize: 12,
						paddingVertical: 10,
						color: CurrentNav == 'Company Income Tax' ? COLOR.white : COLOR.primary_color,
						}}>Income Tax Calculator</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => props.nav.navigate('Value Added Tax')} style={{
					backgroundColor: CurrentNav == 'Value Added Tax' ? COLOR.primary_color : COLOR.white,
					marginLeft: 30,
					marginRight: 10,
					borderRadius: 5,
					borderBottomWidth: 1,
					borderColor: COLOR.extra_color1,
					paddingLeft: 10,
				}}>
					<Text style={{
						width: 200,
						borderRadius: 4,
						padding: 5,
						fontSize: 12,
						paddingVertical: 10,
						color: CurrentNav == 'Value Added Tax' ? COLOR.white : COLOR.primary_color,
						}}>VAT Calculator</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
		;
};

export default SubMenu;
