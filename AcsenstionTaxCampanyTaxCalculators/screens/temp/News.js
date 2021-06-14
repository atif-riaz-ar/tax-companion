import * as React from 'react';
import {StyleSheet, Dimensions, View, Image, ScrollView} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import NewsListing from '../content/NewsListing';
import * as COLOR from '../../styles/constants';

const initialLayout = {width: Dimensions.get('window').width};
export default function News({navigation, route}) {
	
	const AllRoute = () => (<NewsListing navigation={navigation} data={{type: 'all'}}/>);
	const BusinessRoute = () => (<NewsListing navigation={navigation} data={{type: 'business'}}/>);
	const PoliticsRoute = () => (<NewsListing navigation={navigation} data={{type: 'politics'}}/>);

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{key: 'first', title: 'All News'},
		{key: 'second', title: 'Business'},
		{key: 'third', title: 'Tax'},
	]);
	
	const renderScene = SceneMap({
		first: AllRoute,
		second: BusinessRoute,
		third: PoliticsRoute,
	});
	
	const renderTabBar = props => (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: COLOR.white }}
			style={{ backgroundColor: COLOR.primary_color }}
		/>
	);
	
	return (
		<>
			<View>
				<Image style={{width: '100%'}} source={require('../../images/download.jpg')}/>
			</View>
			<TabView
				navigationState={{index, routes}}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={initialLayout}
				renderTabBar={renderTabBar}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	scene: {
		flex: 1,
	},
});
