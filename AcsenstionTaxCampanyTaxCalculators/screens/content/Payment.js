import {
	Alert,
	TouchableOpacity,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
	SafeAreaView
} from "react-native";
import * as RNIap from "react-native-iap";
import React, { Component } from "react";
import * as COLOR from "../../styles/constants";
import RNFetchBlob from "rn-fetch-blob";
import { AuthContext } from "../../src/AuthProvider";


const itemSubs = Platform.select({
	ios: [
		"three.atif.subs.cnsm.mnth.atc",
		"one.atif.subs.cnsm.mnth.atc",
		"six.atif.subs.cnsm.mnth.atc",
		"twelve.atif.subs.cnsm.mnth.atc",
	],
	android: [
		"com.tax.subs.1month.atc.mw",
		"com.tax.subs.3month.atc.mw",
		"com.tax.subs.6month.atc.mw",
		"com.tax.subs.12month.atc.mw",
	],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLOR.white,
		flexDirection: "column",
		padding: 10,
		margin: 5,
		borderRadius: 15,
		borderWidth: 2,
	},
});

class Payment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			productList: [],
			receipt: "",
			availableItemsMessage: "",
			navigation: props.navigation,
			route: props.route,
		};
	}

	async componentDidMount(): void {
		this.getItems();
		try {
			const result = await RNIap.initConnection();
			await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
			//console.log('result', result);
		} catch (err) {
			Alert.alert("Payment Error:", err.message);
			//console.warn(err.code, err.message);
		}

		purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
			async (purchase: InAppPurchase | SubscriptionPurchase) => {
				const receipt = purchase.transactionReceipt;
				if (receipt) {
					try {
						// if (Platform.OS === 'ios') {
						//   finishTransactionIOS(purchase.transactionId);
						// } else if (Platform.OS === 'android') {
						//   // If consumable (can be purchased again)
						//   consumePurchaseAndroid(purchase.purchaseToken);
						//   // If not consumable
						//   acknowledgePurchaseAndroid(purchase.purchaseToken);
						// }
						const ackResult = await finishTransaction(purchase);
					} catch (ackErr) {
						//console.warn("ackErr", ackErr);
					}

					this.setState({ receipt }, () => this.goNext());
				}
			},
		);

		purchaseErrorSubscription = RNIap.purchaseErrorListener(
			(error: PurchaseError) => {
				Alert.alert("Payment Status: Failed to proceed payment.");
			},
		);
	}

	componentWillUnmount(): void {
		if (purchaseUpdateSubscription) {
			purchaseUpdateSubscription.remove();
			purchaseUpdateSubscription = null;
		}
		if (purchaseErrorSubscription) {
			purchaseErrorSubscription.remove();
			purchaseErrorSubscription = null;
		}
		RNIap.endConnection();
	}

	goNext = (): void => {
		Alert.alert("Receipt", this.state.receipt);
	};

	getItems = async (): void => {
		try {
			// const products = await RNIap.getProducts(itemSkus);
			const products = await RNIap.getSubscriptions(itemSubs);
			products.sort(function (a, b) {
				return a.price - b.price;
			})


			//console.log("hjmujkuiluilul", products)

			this.setState({ productList: products });
		} catch (err) {
			//console.warn(err.code, err.message);
		}
	};

	getSubscriptions = async (): void => {
		try {
			const products = await RNIap.getSubscriptions(itemSubs);
			this.setState({ productList: products });
		} catch (err) {
			console.warn(err.code, err.message);
		}
	};

	getAvailablePurchases = async (): void => {
		try {
			const purchases = await RNIap.getAvailablePurchases();
			if (purchases && purchases.length > 0) {
				this.setState({
					availableItemsMessage: `Got ${purchases.length} items.`,
					receipt: purchases[0].transactionReceipt,
				});
			}
		} catch (err) {
			console.warn(err.code, err.message);
			Alert.alert(err.message);
		}
	};

	requestPurchase = async (sku): void => {
		try {
			RNIap.requestPurchase(sku);
		} catch (err) {
			console.warn(err.code, err.message);
		}
	};

	requestSubscription = async (sku): void => {
		try {
			RNIap.requestSubscription(sku).then(() => {
				var data = new FormData();
				const { user } = useContext(AuthContext);
				data.append("id", user["uid"]);
				data.append("firstname", user["firstname"]);
				data.append("lastname", user["lastname"]);
				data.append("email", user["email"]);
				data.append("is_paid", sku);

				RNFetchBlob.fetch("POST", "https://leedsng.com/api/atc_updateSubscription.php", {
					"Content-Type": "multipart/form-data",
				}, data)
					.then((res) => {
						var jsonData = JSON.parse(res["data"]);
						if (jsonData["success"] == 1) {
							alert("Login again to access paid content. Thank you.");
						} else {
							alert("Unsuccessful");
						}
					}).catch(error => {
						alert("Unknown error");
						setLoading(false);
					});
			});
		} catch (err) {
			Alert.alert("You are not subscribed. You can try again later.");
		}
	};

	render(): React.ReactElement {
		const { productList, receipt, availableItemsMessage } = this.state;
		const receipt100 = receipt.substring(0, 100);

		return (
			<SafeAreaView>
				<ScrollView style={{ alignSelf: "stretch" }}>
					<Text style={{
						textAlign: "center",
						color: COLOR.primary_color,
						fontSize: 20,
						fontWeight: "bold",
						marginVertical: 20,
						marginHorizontal: 10,
					}}>
						CHOOSE A PACKAGE FOR PAID CONTENT
				</Text>
					{productList.map((product, i) => {

						let new_title = '';
						let new_description = '';
						if (Platform.OS === 'ios') {
							let title = {
								"three.atif.subs.cnsm.mnth.atc": "Three Month Subscription",
								"one.atif.subs.cnsm.mnth.atc": "One Month Subscription",
								"six.atif.subs.cnsm.mnth.atc": "Six Month Subscription",
								"twelve.atif.subs.cnsm.mnth.atc": "One Year Subscription",
							}
							let description = {
								"three.atif.subs.cnsm.mnth.atc": "You will be able to access for 3 months",
								"one.atif.subs.cnsm.mnth.atc": "You will be able to access for a month",
								"six.atif.subs.cnsm.mnth.atc": "You will be able to access for six months",
								"twelve.atif.subs.cnsm.mnth.atc": "You will be able to access paid content for a year",
							}
							new_title = title[product.productId];
							new_description = description[product.productId];
						} else if (Platform.OS === 'android') {
							new_title = product.title;
							new_description = product.description
						}

						return (

							<TouchableOpacity style={styles.container} onPress={() => {
								Alert.alert(
									"Purchase Option",
									"How would you like a purchase subscription",
									[
										{
											text: "FUNDS TRANSFER",
											onPress: () => {
												return this.state.navigation.navigate("Bank Transfer", {
													product: product,
												});
											},
										},
										{
											text: Platform.OS === 'ios' ? "APP STORE" : "PLAY STORE",
											onPress: () => {
												this.requestSubscription(product.productId);
											},
										},
									],
									{ cancelable: true },
								);
							}}>
								<View
									key={i}
									style={{
										flexDirection: "column",
										marginTop: 10,
										marginBottom: 10,
										padding: 10,
										paddingLeft: 15,
										borderLeftWidth: 3,
										borderRightWidth: 3,
										borderRadius: 10,
										borderColor: COLOR.primary_color,
										backgroundColor: COLOR.extra_color1,
									}}>
									<Text style={{
										color: COLOR.black,
										fontWeight: "bold",
										fontSize: 16,
									}}>{new_title}</Text>
									<Text style={{
										color: COLOR.extra_color4,
										fontWeight: "bold",
										fontSize: 18,
									}}>{product.currency} {product.localizedPrice}</Text>
									<Text style={{
										color: COLOR.extra_color2,
										fontStyle: "italic",
										fontSize: 12,
									}}>{new_description}</Text>
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</SafeAreaView>
		);
	}
}

export default Payment;
