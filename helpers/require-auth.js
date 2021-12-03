import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Routes from '../navigation/routes';
import RoutesLog from '../navigation/routes-log';
import axios from 'axios';
import {config} from '../config';
import {connect} from 'react-redux';
import {connectUser} from '../actions/user/userAction';


const RequireAuth = (props)=>{
    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=>{
        console.log('declenchement componentDidMount')
        retrieveData();
       
    }, [])

    useEffect(()=>{
        console.log('declenchement props.user')
        //si il est connecté on met à jour le state isLogged à true sinon on le laisse à false
        if(props.user.isLogged) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
       
    }, [props.user])
    
    const retrieveData = async ()=>{
        //on récupère le token qui se situe dans notre storage
        const token = await AsyncStorage.getItem('babyPubKey');
        console.log('go', token)
        
        try {
            //si le token n'éxiste pas on met à jour la state de connexion à false
            if(token === null) {
                setIsLogged(false);
            } else {
                //sinon le token est trouvé
                axios.get(config.api_url+"/api/v1/checkToken", { headers: { "x-access-token": token }})
                .then((response)=>{
                    console.log(response.data);
                    if(response.data.status !== 200) {
                        //si il y'a une erreur
                         setIsLogged(false);
                    } else {
                        setIsLogged(true);
                        let user = response.data.user[0];
                        user.token = token;
                        props.connectUser(user);
                    }
                })
            }
        } catch (error) {
            console.log("erreur: ", error)
        }
        
    }
    //ici si il aura accés à des routes selon si il est connecté ou non
    return (
        <React.Fragment>
            {isLogged ? <RoutesLog/> : <Routes />}
        </React.Fragment>
    )
}



mapDispatchToProps = {
    connectUser
}

mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);