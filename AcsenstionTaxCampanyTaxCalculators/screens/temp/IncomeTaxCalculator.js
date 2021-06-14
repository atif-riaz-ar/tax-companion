import React, {useState, useContext} from 'react';
import {ImageBackground, Text, TextInput, View, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../../styles/itc';
import {AuthContext} from '../../src/AuthProvider';
import Payment from '../content/Payment';


const IncomeTaxCalculator = ({navigation, route}) => {

	const {user} = useContext(AuthContext);

	let current_date = new Date();
	let dd = user.subscription_date;
	let t = dd.split(/[- :]/);
	let subs_date = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

	if(current_date > subs_date) {
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

	let [incomeStatement, setIncomeStatement] = useState(0);
	// add these things
	let [depreciation, setDepreciation] = useState(0);
	let [penalties, setPenalties] = useState(0);
	let [writtenOff, setWrittenOff] = useState(0);
	let [exchangeLoss, setExchangeLoss] = useState(0);
	let [disposalLoss, setDisposalLoss] = useState(0);
	// add these things
	let [disposalFixed, setDisposalFixed] = useState(0);
	let [exchangeGain, setExchangeGain] = useState(0);
	//less these thing
	let [charge, setCharge] = useState(0);
	let [allowance, setAllowance] = useState(0);
	let [lossBF, setLossBF] = useState(0);
	let [lossYearly, setLossYearly] = useState(0);
	let [ucaBF, setucaBF] = useState(0);
	let [cay, setCay] = useState(0);
	let [tcay, setTcay] = useState(0);
	let [roy, setRoy] = useState(0);
	let [ucf, setUcf] = useState(0);

	let DisallowedDeduction = parseFloat(parseFloat(depreciation) + parseFloat(writtenOff) + parseFloat(penalties) + parseFloat(exchangeLoss) + parseFloat(disposalLoss)).toFixed(1);
	let NonTaxableIncome = parseFloat(parseFloat(disposalFixed) - parseFloat(exchangeGain)).toFixed(1);
	let TotalAssessable = parseFloat((parseFloat(incomeStatement) + parseFloat(DisallowedDeduction)) - parseFloat(NonTaxableIncome)).toFixed(1);
	let AfterBalancing = parseFloat(parseFloat(TotalAssessable) + parseFloat(charge) - parseFloat(allowance)).toFixed(1);
	let LossRelieved = parseFloat(parseFloat(AfterBalancing) < 0? 0 : (parseFloat(AfterBalancing) > parseFloat(lossBF)? parseFloat(lossBF) : -1*parseFloat(AfterBalancing))).toFixed(1);
	let LossToCF = parseFloat(parseFloat(lossBF) + parseFloat(lossYearly) + parseFloat(LossRelieved)).toFixed(1);
	let TotalCapitalAllowance = parseFloat(parseFloat(ucaBF) + parseFloat(cay)).toFixed(1);
	let AdjustmentForLosses = parseFloat(parseFloat(AfterBalancing) - parseFloat(LossRelieved)).toFixed(1);
	let ReliefOfYear = parseFloat(parseFloat(TotalCapitalAllowance) * (2/3)).toFixed(1);
	let UnabsorbedCarriedForward = parseFloat(parseFloat(TotalCapitalAllowance) - parseFloat(ReliefOfYear)).toFixed(1);
	let TPLofYear = parseFloat(parseFloat(AdjustmentForLosses) - parseFloat(ReliefOfYear)).toFixed(1);
	let ThirtyPercent = parseFloat(parseFloat(TPLofYear) * 0.3).toFixed(1);
	let TwoPercent = parseFloat(parseFloat(AfterBalancing) * 0.02).toFixed(1);
	let TTP = parseFloat(parseFloat(TPLofYear) + parseFloat(ThirtyPercent) + parseFloat(TwoPercent)).toFixed(1);

 	const convertedValue = (value) => {
		let result = value == '' ? 0 : parseFloat(value);
		return result;
	}

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground source={require('../../images/logo.png')} style={styles.logo} />
			<ScrollView style={styles.form}>
				<Text style={styles.heading}>Company Income Tax Computation</Text>
				<View style={styles.grid}>
					<Text style={styles.label}>Profit/Loss before tax as per income statement</Text>
					<TextInput style={styles.input} onChangeText={incomeStatement => setIncomeStatement(convertedValue(incomeStatement))} value={incomeStatement} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>--</Text>
					<Text style={styles.sub_result}>{parseFloat(incomeStatement).toFixed(1)}</Text>
				</View>

				<Text style={styles.heading}>Add: Disallowable Deduction</Text>
				<View style={styles.grid}>
					<Text style={styles.label}>Depreciation</Text>
					<TextInput style={styles.input} onChangeText={depreciation => setDepreciation(convertedValue(depreciation))} value={depreciation} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Penalties</Text>
					<TextInput style={styles.input} onChangeText={penalties => setPenalties(convertedValue(penalties))} value={penalties} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Fixed asset written-off</Text>
					<TextInput style={styles.input} onChangeText={writtenOff => setWrittenOff(convertedValue(writtenOff))} value={writtenOff} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Unrealized exchange loss</Text>
					<TextInput style={styles.input} onChangeText={exchangeLoss => setExchangeLoss(convertedValue(exchangeLoss))} value={exchangeLoss} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Loss on disposal of fixed assets</Text>
					<TextInput style={styles.input} onChangeText={disposalLoss => setDisposalLoss(convertedValue(disposalLoss))} value={disposalLoss} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>--</Text>
					<Text style={styles.sub_result}>{DisallowedDeduction}</Text>
				</View>

				<Text style={styles.heading}>Less: Allowable/Non-Taxable Income</Text>
				<View style={styles.grid}>
					<Text style={styles.label}>Profit on disposal of fixed assets</Text>
					<TextInput style={styles.input} onChangeText={disposalFixed => setDisposalFixed(convertedValue(disposalFixed))} value={incomeStatement} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Unrealised exchange gain</Text>
					<TextInput style={styles.input} onChangeText={exchangeGain => setExchangeGain(convertedValue(exchangeGain))} value={incomeStatement} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Allowable/Non-Taxable Income</Text>
					<Text style={styles.sub_result}>{NonTaxableIncome}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>--</Text>
					<Text style={styles.sub_result}>{TotalAssessable}</Text>
				</View>
				<Text style={styles.heading}> </Text>

				<View style={styles.grid}>
					<Text style={styles.label}>Add: Balancing charge</Text>
					<TextInput style={styles.input} onChangeText={charge => setCharge(convertedValue(charge))} value={incomeStatement} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Less: Balancing allowance</Text>
					<TextInput style={styles.input} onChangeText={allowance => setAllowance(convertedValue(allowance))} value={incomeStatement} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>--</Text>
					<Text style={styles.sub_result}>{parseFloat(parseFloat(charge) - parseFloat(allowance)).toFixed(1)}</Text>
				</View>

				<Text style={styles.heading}>Adjustment For Losses</Text>
				<View style={styles.grid}>
					<Text style={styles.label}>Loss B/F</Text>
					<TextInput style={styles.input} onChangeText={lossBF => setLossBF(convertedValue(lossBF))} value={lossBF} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Loss for the year</Text>
					<TextInput style={styles.input} onChangeText={lossYearly => setLossYearly(convertedValue(lossYearly))} value={lossYearly} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Loss C/F</Text>
					<Text style={styles.sub_result}>{LossToCF}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Loss Relieved</Text>
					<Text style={styles.sub_result}>{LossRelieved}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>--</Text>
					<Text style={styles.sub_result}>{AdjustmentForLosses}</Text>
				</View>

				<Text style={styles.heading}>Adjustment of Capital Allowances</Text>
				<View style={styles.grid}>
					<Text style={styles.label}>Untilized capital allowance for the year</Text>
					<TextInput style={styles.input} onChangeText={ucaBF => setucaBF(ucaBF)} value={ucaBF} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Capital allowance for the year</Text>
					<TextInput style={styles.input} onChangeText={cay => setCay(cay)} value={cay} keyboardType='numeric'/>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Total capital allowance for the year</Text>
					<Text style={styles.sub_result}>{TotalCapitalAllowance}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Relief for the year</Text>
					<Text style={styles.sub_result}>{ReliefOfYear}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Unabsorbed Carried Forward</Text>
					<Text style={styles.sub_result}>{UnabsorbedCarriedForward}</Text>
				</View>

				<Text style={styles.heading}> </Text>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Total profit/loss for the year</Text>
					<Text style={styles.sub_result}>{TPLofYear}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Companies Income Tax - at 30% of Taxable Profit</Text>
					<Text style={styles.sub_result}>{ThirtyPercent}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Tertiary Education Tax - at 2% of Assessable Profit</Text>
					<Text style={styles.sub_result}>{TwoPercent}</Text>
				</View>

				<Text style={styles.heading}> </Text>
				<View style={styles.grid}>
					<Text style={styles.sub_label}>Total Tax Payable</Text>
					<Text style={styles.sub_result}>{TTP}</Text>
				</View>


				<Text style={styles.heading}> </Text>
			</ScrollView>
		</SafeAreaView>
	);
};

export default IncomeTaxCalculator;
