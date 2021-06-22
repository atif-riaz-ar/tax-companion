import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import * as COLOR from "../../styles/constants";
import { Html5Entities } from "html-entities";
import { WebView } from "react-native-webview";
import Loader from "../../components/loader";

const htmlDecode = (text) => {
	const ent = new Html5Entities();
	return ent.decode(JSON.parse(text));
};
const NewsContent = ({ route }) => {
	const [loading, setLoading] = useState(true);
	return (
		<>
			<Text style={{
				fontSize: 20,
				color: COLOR.primary_color,
				fontWeight: "bold",
				textAlign: "center",
				textDecorationLine: "underline",
				paddingVertical: 15,
			}}>
				{route.params.item.title}
			</Text>
			<View style={styles.container}>
				<Loader loading={loading} />
				<WebView
					originWhitelist={["*"]}
					source={{ html: htmlDecode(route.params.item.description) }}
					onLoadStart={() => setLoading(true)}
					onLoad={() => setLoading(false)}
					automaticallyAdjustContentInsets={true}
					injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.8, maximum-scale=0.8, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
					scalesPageToFit={true}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLOR.white,
		flexDirection: "column",
		padding: 15,
		borderWidth: 1,
		borderColor: COLOR.extra_color5,
		margin: 6,
		borderRadius: 10,
	},
	activityIndicatorStyle: {
		flex: 1,
		marginTop: -100,
	},
});

export default NewsContent;
