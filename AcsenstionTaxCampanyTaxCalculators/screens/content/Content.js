import React, {useState,useContext, useEffect, useLayoutEffect} from 'react';
import {ActivityIndicator, ScrollView, Platform, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import {Html5Entities} from 'html-entities';
import * as COLOR from '../../styles/constants';
import PDFView from 'react-native-view-pdf';
import Loader from '../../components/loader';
import Payment from './Payment';
import {AuthContext} from '../../src/AuthProvider';
import {useNavigation} from '@react-navigation/native';

const htmlDecode = (text) => {
	const ent = new Html5Entities();
	return ent.decode(JSON.parse(text));
};

const Content = ({ route}) => {
	const {user} = useContext(AuthContext);
	const navigation = useNavigation()
	const [status , setStatus] = useState(false)
	let current_date = new Date();
	let dd = user.subscription_date;
	let t = dd.split(/[- :]/);
	let subs_date = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

	let is_paid = 0;
	if(current_date > subs_date) {
		is_paid = route.params.item.is_paid;
	}
	
	if(is_paid == 0) {
		const content = route.params.item.content;
		const type = route.params.item.data_type;
		const [loading, setLoading] = useState(true);
		
		if (type === 'PDF') {
			const resources = {
				url: content
			};
			const resourceType = 'url';
			return (
				<View style={{ flex: 1 }}>
					<Loader loading={loading}/>
					<PDFView
						fadeInDuration={250.0}
						style={{flex: 1}}
						resource={resources[resourceType]}
						resourceType={resourceType}
						onLoad={() => setLoading(false)}
						onError={(error) => {
							//console.log('Cannot render PDF', error);
						}}
					/>
				</View>
			);
		}
		if (type === 'video') {
			return (
				<View style={styles.container}>
					<Loader loading={loading}/>
					<WebView
						originWhitelist={['*']}
						source={{uri: 'https://youtube.com/embed/' + content}}
						onLoadStart={() => setLoading(true)}
						onLoad={() => setLoading(false)}
						automaticallyAdjustContentInsets={true}
						injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.8, maximum-scale=0.8, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
						scalesPageToFit={true}
					/>
				</View>
			);
		};
		
		return (
			<View style={styles.container}>
				<Loader loading={loading}/>
				<WebView
					originWhitelist={['*']}
					source={{html: htmlDecode(content)}}
					onLoadStart={() => setLoading(true)}
					onLoad={() => setLoading(false)}
					automaticallyAdjustContentInsets={true}
					automaticallyAdjustContentInsets={true}
					automaticallyAdjustContentInsets={true}
					injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.8, maximum-scale=0.8, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
					scalesPageToFit={true}
				/>
			</View>
		);
	} else {
		navigation.navigate("Payment", {
			nav: navigation,
		})
		return (
			<View style={{flex:1,justifyContent: "center",alignItems: "center",}}>
				<Text style={{fontWeight:'bold',fontSize:15,textAlign:'center',color:'darkblue'}}>You do not have paid account to see the content.</Text>
				<TouchableOpacity onPress={()=>navigation.navigate("Payment", {
					nav:navigation
				})} >
					<Text style={{color:"darkblue", marginTop:20}}>
						SUBSCRIBE
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLOR.white,
		flexDirection: 'column',
		padding: 10,
		margin: 5,
		borderRadius: 15,
		borderWidth: 2
	},
	activityIndicatorStyle: {
		flex: 1,
		marginTop: -100,
	},
});

export default Content;
