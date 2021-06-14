import React, { Component, useState } from "react";
import { StyleSheet, Linking, Button, View, Text, ActivityIndicator } from "react-native";
import { WebView} from 'react-native-webview';
import PDFView from 'react-native-view-pdf';
const ActivityIndicatorElement = () => {
	//making a view to show to while loading the webpage
	return (
		<ActivityIndicator
			color="black"
			size="large"
			backgroundColor="white"
			style={styles.activityIndicatorStyle}
		/>
	);
}
const Data = (props) => {
	const [visible, setVisible] = useState(true);
	
	var target_content = decodeHTMLEntities(props.courseGoal[props.contentToShow].content);

	const resources = {
		file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
		url: target_content,
		base64: 'JVBERi0xLjMKJcfs...',
	};

	const resourceType = 'url';
	var types = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp', 'pdf'];
	var types2 = ['.com/embed/'];
	var parts = target_content.split('.');
	var extension = parts[parts.length - 1];
	if (types.indexOf(extension) !== -1) {
		return (
			
			<View style={styles.container}>
				{visible ? <ActivityIndicatorElement /> : null}
				<PDFView
					fadeInDuration={250.0}
					style={{ flex: 1 }}
					resource={resources[resourceType]}
					resourceType={resourceType}
					onLoad={() => setVisible(false)}
					onError={(error) => 	console.log('Cannot render PDF', error)}
				/>
			
			</View>
		);
		
	}
	if (target_content.indexOf(types2) !== -1) {
		return (
			<View style={styles.container}>
				{visible ? <ActivityIndicatorElement /> : null}
				<WebView
					originWhitelist={['*']}
					source={{ uri: target_content }}
					onLoadStart={() => setVisible(true)}
					onLoad={() => setVisible(false)}
					automaticallyAdjustContentInsets={true}
					injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.8, maximum-scale=0.8, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
					scalesPageToFit={true}
				/>
			</View>
		);
	}
	else {
		return (
			<View style={styles.container}>
				{visible ? <ActivityIndicatorElement /> : null}
				<WebView
					originWhitelist={['*']}
					source={{ html: decodeHTMLEntities(props.courseGoal[props.contentToShow].content) }}
					onLoadStart={() => setVisible(true)}
					onLoad={() => setVisible(false)}
					automaticallyAdjustContentInsets={true}
					injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.8, maximum-scale=0.8, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
					scalesPageToFit={true}
				/>
			</View>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		flexDirection: 'column',
		
	},
	activityIndicatorStyle: {
		flex: 1,
		marginTop:-100
	},
});

export default PDF;

