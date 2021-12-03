import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {saveUser} from '../../api/user';

const Register = (props)=> {
    
	let firstName = "";
	let lastName = "";
	let email = "";
	let password = "";
	let address = "";
	let zip = "";
	let city = "";
	let phone = "";

	const onSubmitForm = ()=>{
		let data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			address: address,
			zip: parseInt(zip),
			city: city,
			phone: phone
		}

		console.log("DATA",data)

		saveUser(data)
		.then((res)=>{
			console.log("AXIOS SAVE USER",res);
		})
	}

    return (
		<ImageBackground 
			style={ styles.imgBackground } 
			resizeMode='cover' 
			source={require('../../assets/bg.jpg')}
		>
    	<View style={styles.container}>
    		<ScrollView style={styles.scrollContainer}>
    			<Text
					style={styles.title}
				>
					S'enregister
				</Text>
    			<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Prénom"
    				onChangeText={(text)=>{
						firstName = text;
    				}}
    			/>
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Nom"
    				onChangeText={(text)=>{
    					lastName = text;
    				}}
    			/>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Email"
    				onChangeText={(text)=>{
    					email = text;
    				}}
    			/>
				<TextInput
    				style={styles.input}
    				secureTextEntry={true}
    				placeholder="Mot de passe"
    				onChangeText={(text)=>{
    					password = text;
    				}}
    			/>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Adresse"
    				onChangeText={(text)=>{
    					address = text;
    				}}
    			/>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Code postal"
    				onChangeText={(text)=>{
    					zip = text;
    				}}
    			/>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Ville"
    				onChangeText={(text)=>{
    					city = text;
    				}}
    			/>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Téléphone"
    				onChangeText={(text)=>{
    					phone = text;
    				}}
    			/>

    			<TouchableOpacity
					style={styles.button}
					onPress={(e)=>{
						onSubmitForm()
					}}
				>
    				<Text style={styles.buttonText}>Créer le compte</Text>
    			</TouchableOpacity>
    		</ScrollView>
    	</View>
		</ImageBackground>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	paddingTop: 50
  },
  imgBackground: {
	width: '100%',
	height: '100%',
	flex: 1 
  },
  title: {
	fontSize: 20,
	textAlign: 'center',
	marginBottom: 20,
	color: "white"
  },
  scrollContainer: {
	width: wp('100%'),
	textAlign: 'center',
  },
  input: {
  	backgroundColor: 'white',
  	width: wp('60%'),
	height: 40,
	marginBottom: 15,
	marginLeft: wp('20%'),
	paddingLeft: wp('5%')
  },
  button: {
	backgroundColor: "#17202a",
	width: wp('40%'),
	height: 35,
	alignItems: "center",
	justifyContent: "center",
	marginLeft: wp('30%'),
	marginBottom: 15,
  },
  buttonText: {
	  color: "white"
  }
});

export default Register;