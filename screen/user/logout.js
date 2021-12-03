import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/user/userAction';


const Logout = (props)=>{

    useEffect(()=>{
        removeData();
        props.logoutUser();
    }, [])



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Déconnexion</Text>
        </View>
    );
}

const removeData = async (token) => {
    try {
      await AsyncStorage.removeItem('babyPubKey');
    } catch (error) {
      console.log(error)
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#42e5ff',
      paddingTop: hp('30%')
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
      backgroundColor: "#321aed",
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
    logoutUser
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Logout);