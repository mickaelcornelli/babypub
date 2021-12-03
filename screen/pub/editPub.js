import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box'
import {connect} from 'react-redux';
import axios from 'axios';
import {editPub, getOnePub} from '../../api/pub';

const EditPub = (props)=> {
    //création des states name description address zip city lange poussette terrasse jeux
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
	const [address, setAddress] = useState('');
	const [zip, setZip] = useState('');
	const [city, setCity] = useState('');
	const [lange, setLange] = useState(false);
	const [poussette, setPoussette] = useState(false);
	const [terrasse, setTerrasse] = useState(false);
    const [jeux, setJeux] = useState(false);
    
    //useEffect
    useEffect(()=>{
        console.log(props.navigation.getParam('id'));    
        //récupération du pub concerné (id du params)
        getOnePub(props.navigation.getParam('id'), props.user.infos.token)
            .then((res)=>{
                console.log(res)
            //mise à jour des states
                setName(res.pub.name);
                setDescription(res.pub.description);
                setAddress(res.pub.address);
                setZip(res.pub.zip);
				setCity(res.pub.city);
                //conditions pour les states lange poussette terrasse jeux
                if(res.pub.lange === 1) {
					setLange(true);
				} else {
					setLange(false);
				}
				
				if(res.pub.poussette === 1) {
					setPoussette(true);
				} else {
					setPoussette(false);
				}

				if(res.pub.terrasse === 1) {
					setTerrasse(true);
				} else {
					setTerrasse(false);
				}

				if(res.pub.jeux === 1) {
					setJeux(true);
				} else {
					setJeux(false);
				}
				
            })    
    }, [])
    
    const onSubmitForm = ()=>{
        axios.get('https://nominatim.openstreetmap.org/search?q='+address+' '+zip+'&format=geocodejson')
			.then((res)=>{
            console.log(res);
            //récup des lat et lng
            let lat = res.data.features[0].geometry.coordinates[1];
			let lng = res.data.features[0].geometry.coordinates[0];
			console.log(lat);
			console.log(lng);
            //on crée notre objet avec toutes les infos ainsi que lat lng
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
            console.log(data)
            
            //appel de la fonction de modification d'un pub
            editPub(props.navigation.getParam('id'), data, props.user.infos.token)
					.then((response)=>{
						console.log(response);
						if(response.status === 200) (
							props.navigation.navigate('Admin')
						)
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
    			<Text
					style={styles.title}
				>
					Modifier un bar
				</Text>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="name"
    				onChangeText={(text)=>{
    					setName(text)
                    }}
                    value={name}
    			/>
				<TextInput
    				style={styles.textarea}
    				type="text"
					placeholder="decription"
					numberOfLines={5}
      				multiline={true}
    				onChangeText={(text)=>{
    					setDescription(text)
                    }}
                    value={description}
    			/>
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="address"
    				onChangeText={(text)=>{
    					setAddress(text)
                    }}
                    value={address}
    			/>
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="zip"
    				onChangeText={(text)=>{
    					setZip(text)
                    }}
                    value={zip.toString()}
    			/> 
				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="ville"
    				onChangeText={(text)=>{
    					setCity(text)
                    }}
                    value={city}
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
    flex: 1
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
  }
});

mapDispatchToProps = {
    
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(EditPub);