import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, ImageBackground, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box'
import {connect} from 'react-redux';
import axios from 'axios';
import {savePub} from '../../api/pub';

const AddPub = (props)=> {
    const [successPub, setSuccessPub] = useState(false)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
	const [address, setAddress] = useState('');
	const [zip, setZip] = useState('');
	const [city, setCity] = useState('');
	const [lange, setLange] = useState(false);
	const [poussette, setPoussette] = useState(false);
	const [terrasse, setTerrasse] = useState(false);
	const [jeux, setJeux] = useState(false);
	

	const onSubmitForm = ()=>{


		axios.get('https://nominatim.openstreetmap.org/search?q='+address+' '+zip+'&format=geocodejson')
			.then((res)=>{
				console.log(res);
				let lat = res.data.features[0].geometry.coordinates[1];
				let lng = res.data.features[0].geometry.coordinates[0];
				console.log(lat);
				console.log(lng);

				let data = {
					name: name,
					description: description,
					address: address,
					zip: zip,
					city: city,
					lange: lange,
					poussette: poussette,
					terrasse: terrasse,
					jeux: jeux,
					user_id: props.user.infos.id,
					lat: lat,
					lng: lng
				}
				console.log("DATA",data)

				savePub(data, props.user.infos.token)
				.then((response)=>{
					console.log("SAVE PUB",response);
					if (response.status === 200) {
						setSuccessPub(true)
					}		
				})

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
				{ successPub !== false && 
					<Text
						style={styles.add}
					>
						Le bar a été ajouté !
					</Text>
				}
    			<Text
					style={styles.title}
				>
					Ajouter un bar
				</Text>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Nom"
    				onChangeText={(text)=>{
    					setName(text)
    				}}
    			/>
				<TextInput
    				style={styles.textarea}
    				type="text"
					placeholder="Description"
					numberOfLines={5}
      				multiline={true}
    				onChangeText={(text)=>{
    					setDescription(text)
    				}}
    			/>
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Adresse"
    				onChangeText={(text)=>{
    					setAddress(text)
    				}}
    			/>
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Code postal"
    				onChangeText={(text)=>{
    					setZip(text)
    				}}
    			/>
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="Ville"
    				onChangeText={(text)=>{
    					setCity(text)
    				}}
    			/>
				<CheckBox
					style={styles.checkBox}
					onClick={()=>{
						setLange(!lange)
					}}
					isChecked={lange}
					rightText={"Lange"}
					checkBoxColor="white"
					rightTextStyle={{color: 'white'}}
				/>
				<CheckBox
					style={styles.checkBox}
					onClick={()=>{
						setPoussette(!poussette)
					}}
					isChecked={poussette}
					rightText={"Poussette"}
					checkBoxColor="white"
					rightTextStyle={{color: 'white'}}
				/>
				<CheckBox
					style={styles.checkBox}
					onClick={()=>{
						setTerrasse(!terrasse)
					}}
					isChecked={terrasse}
					rightText={"Terrasse"}
					checkBoxColor="white"
					rightTextStyle={{color: 'white'}}
				/>
				<CheckBox
					style={styles.checkBox}
					onClick={()=>{
						setJeux(!jeux)
					}}
					isChecked={jeux}
					rightText={"Jeux"}
					checkBoxColor="white"
					rightTextStyle={{color: 'white'}}
				/>
    			<TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        onSubmitForm()
                    }}
				>
    				<Text style={styles.buttonText}>Enregistrer</Text>
    			</TouchableOpacity>
					
    		</ScrollView>
    	</View>
		</ImageBackground>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  textarea: {
	backgroundColor: 'white',
	width: wp('60%'),
	height: 120,
	marginBottom: 15,
	marginLeft: wp('20%'),
	paddingLeft: wp('5%')
  },
  checkBox: {
	  flex: 1,
	  paddingLeft: wp("20%"),
	  paddingBottom: 10
  },
  button: {
	backgroundColor: "#17202a",
	width: wp('40%'),
	height: 40,
	alignItems: "center",
	justifyContent: "center",
	marginLeft: wp('30%'),
	marginTop: 20,
	marginBottom: 10
  },
  buttonText: {
	  color: "white"
  },
  add: {
	 fontSize: 20,
	 color: "#00FF00",
	 textAlign: "center",
	 marginBottom: 20,
	 marginTop: 10
  }
});

mapDispatchToProps = {
    
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(AddPub);