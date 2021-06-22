import React, {useContext, useState} from 'react';
import {ImageBackground, Text, TextInput, View, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../../styles/ptc';
import * as COLOR from '../../styles/constants';
import Payment from '../content/Payment';
import {AuthContext} from '../../src/AuthProvider';
import {useNavigation} from '@react-navigation/native';


const PitCalculator = ({route}) => {
	const navigation = useNavigation()
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

	let [month, setMonth] = useState('1');
	let [year, setYear] = useState('12');
	let [basic, setBasic] = useState(0);
	let [housing, setHousing] = useState(0);
	let [transport, setTransport] = useState(0);
	let [utility, setUtility] = useState(0);
	let [lunch, setLunch] = useState(0);
	let [entertainment, setEntertainment] = useState(0);
	let [bonus, setBonus] = useState(0);
	let [leave, setLeave] = useState(0);
	let [phone, setPhone] = useState(0);
	let [accommodation, setAccommodation] = useState(0);
	let [car, setCar] = useState(0);
	let [allowance, setAllowance] = useState(0);

	let getMonthly = (value) => {
		return parseFloat((parseFloat(value) / parseInt(year)) * parseInt(month) ).toFixed(2);
	};

	let convertedValue = (value) => {
		return parseFloat(value);
	};

	let convertedYear = (value) => {
		return value == '' ? 12 : parseInt(value);
	};

	let convertedMonth = (value) => {
		return value == '' ? 1 : parseInt(value);
	};

	let n = (value) => {
		return (value * month) / year;
	};

	let GrossAnnualIncome = convertedValue(basic) + convertedValue(housing) + convertedValue(transport) + convertedValue(utility) + convertedValue(lunch) + convertedValue(entertainment) + convertedValue(bonus) + convertedValue(leave) + convertedValue(phone) + convertedValue(accommodation) + convertedValue(car) + convertedValue(allowance);
	let GrossMonthlyIncome = getMonthly(GrossAnnualIncome);
	let ConsolidatedAnnual = ((GrossAnnualIncome * 0.01) > (200000 / year * month) ? (GrossAnnualIncome * 0.01) : (200000 / year) * month) + (GrossAnnualIncome * 0.2);
	let ConsolidatedMonthly = getMonthly(ConsolidatedAnnual);
	let PensionAnnual = 0.08 * (parseFloat(basic) + parseFloat(housing) + parseFloat(transport));
	let PensionMonthly = getMonthly(PensionAnnual);
	let HousingAnnual = 0.025 * parseFloat(basic);
	let HousingMonthly = getMonthly(HousingAnnual);
	let TotalReliefAnnual = ConsolidatedAnnual + PensionAnnual + HousingAnnual;
	let TotalReliefMonthly = getMonthly(TotalReliefAnnual);
	let IncomeTax = parseFloat(GrossAnnualIncome - TotalReliefAnnual).toFixed(2);
	let C07 = IncomeTax <= n(300000) ? 0.07 * IncomeTax : n(300000) * 0.07;
	let C11 = IncomeTax <= n(600000) ? ( (IncomeTax - n(300000)) < 0 ? 0 : ( 0.11 * (IncomeTax- n(300000)) ) ) : (300000* (month/year)) * 0.11;
	let C15 = IncomeTax <= n(1100000) ? ( (IncomeTax - n(600000)) < 0 ? 0 : ( 0.15 * (IncomeTax- n(600000)) ) ) : (500000* (month/year)) * 0.15;
	let C19 = IncomeTax <= n(1600000) ? ( (IncomeTax - n(1100000)) < 0 ? 0 : ( 0.19 * (IncomeTax- n(1100000)) ) ) : (500000* (month/year)) * 0.19;
	let C21 = IncomeTax <= n(3200000) ? ( (IncomeTax - n(1600000)) < 0 ? 0 : ( 0.21 * (IncomeTax- n(1600000)) ) ) : (1600000* (month/year)) * 0.21;
	let C24 = IncomeTax <= n(3200000) ? 0 : 0.24* (IncomeTax - n(3200000));
	let TPT = C07 + C11 + C15 + C19 + C21 + C24;
	let NP = GrossAnnualIncome - (PensionAnnual + HousingAnnual + TPT);
	let ETR = (TPT / GrossAnnualIncome) * 100;

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground source={require('../../images/logo.png')} style={styles.logo}/>
			<ScrollView style={styles.form}>
				<Text style={styles.heading}>Month Settings</Text>
				<View style={styles.grid}>
					<Text style={{
						textAlign: 'left',
						color: COLOR.extra_color2,
						fontSize: 13,
						fontWeight: 'bold',
						paddingTop: 5,
						width: '27%',
					}}> </Text>
					<Text style={{
						textAlign: 'center',
						color: COLOR.extra_color2,
						fontSize: 13,
						fontWeight: 'bold',
						paddingTop: 5,
						width: '35%',
					}}>No. of months</Text>
					<Text style={{
						textAlign: 'center',
						color: COLOR.extra_color2,
						fontSize: 13,
						fontWeight: 'bold',
						paddingTop: 5,
						width: '27%',
					}}>Monthly</Text>
				</View>
				<View style={styles.grid}>
					<Text style={{
						textAlign: 'left',
						color: COLOR.extra_color2,
						fontSize: 13,
						fontWeight: 'bold',
						paddingTop: 5,
						width: '27%'
					}}>Values</Text>
					<TextInput style={styles.input2} onChangeText={year => setYear(convertedYear(year))} value={year} keyboardType='numeric'/>
					<TextInput style={styles.input2} onChangeText={month => setMonth(convertedMonth(month))} value={month} keyboardType='numeric'/>
				</View>

				<Text style={styles.heading}>PIT Computation</Text>
				<View style={styles.grid}>
					<Text style={styles.sub_label}> Description</Text>
					<Text style={styles.input_label}>Annual</Text>
					<Text style={styles.input_label}>Monthly</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Basic Salary</Text>
					<TextInput style={styles.input} onChangeText={basic => setBasic(convertedValue(basic))}
							   value={basic} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(basic)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Housing Allowance</Text>
					<TextInput style={styles.input} onChangeText={housing => setHousing(convertedValue(housing))}
							   value={housing} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(housing)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Transport Allowance</Text>
					<TextInput style={styles.input} onChangeText={housing => setTransport(convertedValue(transport))}
							   value={transport} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(transport)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Utility Allowance</Text>
					<TextInput style={styles.input} onChangeText={utility => setUtility(convertedValue(utility))}
							   value={utility} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(utility)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Lunch Allowance</Text>
					<TextInput style={styles.input} onChangeText={lunch => setLunch(convertedValue(lunch))}
							   value={lunch} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(lunch)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Entertainment Allowance</Text>
					<TextInput style={styles.input}
							   onChangeText={entertainment => setEntertainment(convertedValue(entertainment))}
							   value={entertainment} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(entertainment)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>13th Month</Text>
					<TextInput style={styles.input} onChangeText={bonus => setBonus(convertedValue(bonus))}
							   value={bonus} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(bonus)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Leave Allowance</Text>
					<TextInput style={styles.input} onChangeText={leave => setLeave(convertedValue(leave))}
							   value={leave} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(leave)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Phone Subsidy</Text>
					<TextInput style={styles.input} onChangeText={phone => setPhone(convertedValue(phone))}
							   value={phone} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(phone)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>BIK - Accommodation</Text>
					<TextInput style={styles.input}
							   onChangeText={accommodation => setAccommodation(convertedValue(accommodation))}
							   value={accommodation} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(accommodation)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>BIK - Car</Text>
					<TextInput style={styles.input} onChangeText={car => setCar(convertedValue(car))} value={car}
							   keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(car)}</Text>
				</View>
				<View style={styles.grid}>
					<Text style={styles.label}>Other Allowances</Text>
					<TextInput style={styles.input} onChangeText={allowance => setAllowance(convertedValue(allowance))}
							   value={allowance} keyboardType='numeric'/>
					<Text style={styles.sub_result}>{getMonthly(allowance)}</Text>
				</View>

				<Text style={styles.heading}> </Text>
				<View style={styles.grid}>
					<Text style={styles.result_col1}>Gross Income</Text>
					<Text style={styles.result_col2} >{parseFloat(GrossAnnualIncome).toFixed(2)}</Text>
					<Text style={styles.result_col2} >{parseFloat(GrossMonthlyIncome).toFixed(2)}</Text>
				</View>

				<Text style={styles.heading}> </Text>

				<View style={styles.grid}>
					<Text style={styles.result_col1}>Less Reliefs:</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col11}>Consolidated Relief Allowance</Text>
					<Text style={styles.result_col2} >{parseFloat(ConsolidatedAnnual).toFixed(2)}</Text>
					<Text style={styles.result_col2} >{parseFloat(ConsolidatedMonthly).toFixed(2)}</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col11}>Pension 8% of (Basic + Housing + Transport)</Text>
					<Text style={styles.result_col2} >{parseFloat(PensionAnnual).toFixed(2)}</Text>
					<Text style={styles.result_col2} >{parseFloat(PensionMonthly).toFixed(2)}</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col11}>National Housing Fund - (2.5% of Basic Salary)</Text>
					<Text style={styles.result_col2} >{parseFloat(HousingAnnual).toFixed(2)}</Text>
					<Text style={styles.result_col2} >{parseFloat(HousingMonthly).toFixed(2)}</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col1}>Total Relief</Text>
					<Text style={styles.result_col2} >{parseFloat(TotalReliefAnnual).toFixed(2)}</Text>
					<Text style={styles.result_col2} >{parseFloat(TotalReliefMonthly).toFixed(2)}</Text>
				</View>

				<Text style={styles.heading}> </Text>

				<View style={styles.grid}>
					<Text style={styles.result_col1}>Income Tax</Text>
					<Text style={styles.result_col2} >{parseFloat(IncomeTax).toFixed(2)}</Text>
					<Text style={styles.result_col2} >{parseFloat(getMonthly(IncomeTax)).toFixed(2)}</Text>
				</View>

				<Text style={styles.heading}> </Text>

				<View style={styles.grid}>
					<Text style={styles.sub_label}>Paye Tax Table:</Text>
					<Text style={styles.input_label}> </Text>
					<Text style={styles.input_label}> </Text>
				</View>

				<View style={styles.grid2}>
					<Text style={styles.result_col11}>First N300,000 @ 7%</Text>
					<Text style={styles.result_col21} >{parseFloat(C07).toFixed(2)}</Text>
					<Text style={styles.result_col21} >{parseFloat(getMonthly(C07)).toFixed(2)}</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col11}>Next N300,000 @ 11%</Text>
					<Text style={styles.result_col21} >{parseFloat(C11).toFixed(2)}</Text>
					<Text style={styles.result_col21} >{parseFloat(getMonthly(C11)).toFixed(2)}</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col11}>Next N500,000 @ 15%</Text>
					<Text style={styles.result_col21} >{parseFloat(C15).toFixed(2)}</Text>
					<Text style={styles.result_col21} >{parseFloat(getMonthly(C15)).toFixed(2)}</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col11}>Next N500,000 @ 19%</Text>
					<Text style={styles.result_col21} >{parseFloat(C19).toFixed(2)}</Text>
					<Text style={styles.result_col21} >{parseFloat(getMonthly(C19)).toFixed(2)}</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col11}>Next N600,000 @ 21%</Text>
					<Text style={styles.result_col21} >{parseFloat(C21).toFixed(2)}</Text>
					<Text style={styles.result_col21} >{parseFloat(getMonthly(C21)).toFixed(2)}</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col11}>Above N3,200,000 OR Balance @ 24%</Text>
					<Text style={styles.result_col21} >{parseFloat(C24).toFixed(2)}</Text>
					<Text style={styles.result_col21} >{parseFloat(getMonthly(C24)).toFixed(2)}</Text>
				</View>

				<Text style={styles.heading}> </Text>

				<View style={styles.grid2}>
					<Text style={styles.result_col1}>Total Paye Tax</Text>
					<Text style={styles.result_col21} >{parseFloat(TPT).toFixed(2)}</Text>
					<Text style={styles.result_col21} >{parseFloat(getMonthly(TPT)).toFixed(2)}</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col1}>Net Pay</Text>
					<Text style={styles.result_col21} >{parseFloat(NP).toFixed(2)}</Text>
					<Text style={styles.result_col21} >{parseFloat(getMonthly(NP)).toFixed(2)}</Text>
				</View>
				<View style={styles.grid2}>
					<Text style={styles.result_col1}>Effective Tax Rate</Text>
					<Text style={styles.result_col21} >{parseFloat(ETR).toFixed(2)}</Text>
					<Text style={styles.result_col21} >{parseFloat(getMonthly(ETR)).toFixed(2)}</Text>
				</View>

				<Text style={styles.heading}> </Text>

			</ScrollView>
		</SafeAreaView>
	);
};

export default PitCalculator;
