import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import MapView, {Marker, Callout} from 'react-native-maps';
  import * as Location from 'expo-location';
  import * as Permissions from 'expo-permissions';
import CheckBox from 'react-native-check-box';
import Slider from '@react-native-community/slider';
import {getPubWithFilters} from '../api/pub';
import {connect} from 'react-redux';

const Home = (props)=>{
  //on initialise une position par défault
  const DEFAULT_COORD = {coords: {
          latitude: 48.859268,
          longitude: 2.347060
        }
    };
  //on crée nos states location, isOpen, lange, poussette, terrasse, jeux, distance et pubs
  
  const [location, setLocation] = useState(DEFAULT_COORD)
  const [isOpen, setIsOpen] = useState(false)
  const [lange, setLange] = useState(false)
  const [poussette, setPoussette] = useState(false)
  const [terrasse, setTerrasse] = useState(false)
  const [jeux, setJeux] = useState(false)
  const [distance, setDistance] = useState(1)
  const [pubs, setPubs] = useState([])

  //un useEffect qui déclenche notre géoloc au chargement de la page
  useEffect(()=>{
    getGeolocAsync()
  }, [])
  
  const getGeolocAsync = async ()=>{
    //on appel askAsync de permission que l'on stock dans une let status (demande de geoloc)
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("STATUS",status)
    //si le status n'est pas granted
    if(status !== ('granted')){

      //envoi d'un message d'erreur permission d'accés non autorisée
      throw new Error('Location permission not granted')

      //on sort de la fonction
      return
  }

    // récupère geoloc en appelant la fonction getCurrentPositionAsynk qui est dans le module Location de expo-location que l'on stock dans une variable myLocation
    let myLocation = await Location.getCurrentPositionAsync({})

    //mise à jour de la state location
     setLocation(myLocation);
     console.log("location",location)
  }
 
  const onSearchPub = ()=>{

    //on récup toutes les datas que l'on stock dans un objet
    let data = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        lange: lange,
        terrasse: terrasse,
        poussette: poussette,
        jeux: jeux,
        distance: distance
    }
    //on appel la fonction api qui recup les pubs avec les filtres
    getPubWithFilters(data, props.user.infos.token)

    //.then
    .then((response)=>{

      //on met à jour la state des pubs avec la réponse
      setPubs(response.pubs)
      console.log("PUBS",pubs)
    })
  }

  return (
    <ImageBackground 
      style={ styles.imgBackground } 
      resizeMode='cover' 
      source={require('../assets/bg.jpg')}
    >
        <View style={styles.container}>
            <Text style={styles.title}>Home Page</Text>
            
              {/*ICI MAPVIEW*/}
            {location && <MapView
                    style={{flex: 2}}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    showsUserLocation = {true}
                    scrollEnabled={true}
                    liteMode={false}
              >
                {/*ICI ON VA GERER LES MARKERS POUR LES PUBS*/}
                {pubs.map((pub)=>{
                        return (<MapView.Marker
                                    title={pub.name}
                                    coordinate={{
                                        latitude: parseFloat(pub.lat),
                                        longitude: parseFloat(pub.lng)
                                    }}
                                    key={pub.id}
                                    onPress={()=>{

                                    }}
                                >
                                    <Callout>
                                        <Text>{pub.name}</Text>
                                        <Text>{pub.address} {pub.zip} {pub.city}</Text>
                                        <TouchableOpacity>
                                            <Text>Détail</Text>
                                        </TouchableOpacity>
                                    </Callout>
                            </MapView.Marker>)
                    }) }         

              </MapView>}
            
            <View style={styles.commande}>

              <View style={styles.checkBoxContainer}>
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
              </View>

              <View style={styles.checkBoxContainer}>
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
              </View>

              <View style={styles.validateContainer}>
                <Slider
                  style={{width: wp('80%'), height: 40, marginLeft: wp('10%')}}
                  minimumValue={1}
                  maximumValue={1500}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#fff"
                  step={1}
                  value={distance}
                  onValueChange={(value)=>{
                    setDistance(value)
                  }}
                />
                <Text style={styles.text}>Distance de recherche : {distance} km</Text>
            </View>

          </View>  
          <TouchableOpacity
            style={styles.button}
            onPress={(e)=>{
              onSearchPub()
            }}
				  >
    				<Text style={styles.buttonText}>Rechercher</Text>
    			</TouchableOpacity>         
        </View>
      </ImageBackground>
    );
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
      textAlign: 'center'
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
      marginLeft: wp('30%'),
      marginTop: 10,
      marginBottom: 10
    },
    buttonText: {
        color: "white"
    },
    commande: {
        flex:1,
        marginTop: 10
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
