import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen';
import {getAllPubs, deletePub} from '../../api/pub';
import {connect} from "react-redux";
import {sendNotif} from '../../api/user';


const Admin = (props)=>{
    
    const [pubs, setPubs] = useState([]);

    //useEffect qui charge tous les pubs 
    useEffect(()=>{
        getAllPubs(props.user.infos.token)
        .then((response)=>{
            console.log(response) 
           setPubs(response.pubs); 
        })
    }, []);
    
    
    
    
    const goToEdit = (id)=>{
        //redirection vers édition
        props.navigation.navigate('EditPub', {id: id})
    }
    
    return(
      <ImageBackground
        style={ styles.imgBackground } 
        resizeMode='cover' 
        source={require('../../assets/bg.jpg')}
		  >
        <View style={styles.container}>
            <Text style={styles.title}>Page Administration</Text>
            <TouchableOpacity
                            style={styles.button}
                            onPress={(e)=>{
                                let data = {
                                    token: props.user.infos.uuid,
                                    msg: "Oh j'envoie une notif"
                                }
                                console.log("NOTIF", data);
        
                                sendNotif(data, props.user.infos.token)
                                .then((response)=>{
                                    console.log(response);
                                })
                            }}
                        >
                <Text 
                  style={styles.buttonText}
                  >Envoie une notification
                </Text>
            </TouchableOpacity>
            
            {/*AFFIcHAGE DE TOUS LES PUBS*/}
            {pubs.length > 0 ? <ScrollView  style={styles.scrollContainer}>
                {pubs.map((pub)=>{
                    return (<View
                        style={{flex:1, 
                                flexDirection: 'row', 
                                marginLeft: 10,
                                marginRight: 10,
                                borderColor: 'white',
                                borderWidth: 1
                        }}
                        key={pub.id}
                    >
                        <View style={{flex:3, padding: 10}}>
                            <Text style={styles.text}>{pub.name}</Text>
                            <Text  style={styles.text}>{pub.address}</Text>
                            <Text  style={styles.text}>{pub.zip} {pub.city}</Text>
                        </View>
                        <View style={{flex:1}}>
                        <TouchableOpacity
                            style={styles.buttonBlue}
                            onPress={()=>{
                                goToEdit(pub.id)
                            }}
                        >
                            <Text style={styles.buttonText}>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonRed}
                            onPress={()=>{
                                deletePub(pub.id, props.user.infos.token)
                                    .then(()=>{
                                        getAllPubs(props.user.infos.token)
                                            .then((response)=>{
                                                console.log(response) 
                                            setPubs(response.pubs); 
                                            })
                                    })
                            }}
                        >
                            <Text style={styles.buttonText}>Supprimer</Text>
                        </TouchableOpacity>
                        </View>
                    </View>)
                })}
 
            </ScrollView> : <Text>Attente des pubs</Text>
            }
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
    text: {
        color: 'white',
        textAlign: 'center',
        lineHeight: 30
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
      width: wp('20%'),
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 10,
    },
    buttonBlue: {
      backgroundColor: "#321aed",
      width: wp('20%'),
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
    buttonRed: {
        backgroundColor: "red",
        width: wp('20%'),
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    buttonText: {
        color: "white"
    },
    commande: {
        flex:1
    },
    checkBoxContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: wp('10%'),
    }, 
    checkBox: {
        flex: 1,
    },
    validateContainer: {
        flex: 3
    }
  });


mapDispatchToProps = {
    
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);