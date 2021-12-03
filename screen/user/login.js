import React, {useState, useEffect} from 'react';
import { StyleSheet, ImageBackground, Text, View, TextInput, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {loginUser} from '../../api/user';
import {connect} from 'react-redux';
import {connectUser} from '../../actions/user/userAction';
import {registerForPushNotificationsAsync} from "../../helpers/notification"

const Login = (props)=> {
    
	let email = "";
	let password = "";

    const onSubmitForm = ()=>{
		let data = {
			email: email,
			password: password
		}

		console.log(data)

		loginUser(data)
		.then((res)=>{
      console.log('RES',res);
			storeData(res.token);
      registerForPushNotificationsAsync(res.user.id);

			let user = res.user;
			user.token = res.token;
			props.connectUser(res.user);

		})
    }
    
    const storeData = async (token) => {
        try {
          await AsyncStorage.setItem('babyPubKey', token);
        } catch (error) {
          console.log(error)
        }
    };

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
					Page de connexion
				</Text>

				<TextInput
    				style={styles.input}
    				type="text"
    				placeholder="email"
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

    			<TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        onSubmitForm();
                    }}
				>
    				<Text style={styles.buttonText}>Se connecter</Text>
    			</TouchableOpacity>
    		</ScrollView>
    	</View>
		</ImageBackground>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	paddingTop: hp('30%')
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
	height: 40,
	alignItems: "center",
	justifyContent: "center",
	marginLeft: wp('30%')
  },
  buttonText: {
	  color: "white"
  }
});

mapDispatchToProps = {
    connectUser
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Login);