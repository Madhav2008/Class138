import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import {Card, Icon} from "react-native-elements";
import axios from "axios";

export default class DetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            details : {},
            imagePath : "",
            url : `http://localhost:5000/planet?name=${this.props.navigation.getParam("planet_name")}`
        }
    }
    getDetails =()=>{
        const {url} = this.state
        axios.get(url)
        .then((response)=>{
           this.setDetails(response.data.data)
        })
        .catch((error)=>{
            Alert.alert(error.message)
        })
    }
    componentDidMount(){
        this.getDetails()
    }
    setDetails =(planetDetails)=>{
        const PlanetType = planetDetails.planet_type
        let imagePath = ""
        switch(PlanetType){
            case "Gas Giant":
                imagePath = require("../assets/gas_giant.png")
                break
            case "Terrestrial":
                imagePath = require("../assets/terrestrial.png")
                break
            case "Neptune Like":
                imagePath = require("../assets/neptune_like.png")
                break
            case "Super Earth":
                imagePath = require("../assets/super_earth.png")
                break
            default:
                imagePath = require("../assets/gas_giant.png")
        }
        this.setState({
            details : planetDetails,
            imagePath : imagePath
        })
    }
    render(){
        const {details, imagePath} = this.state
        if(details.specifications){
            return(
                <View style={{flex:1}}>
                    <Card title={details.name} image={imagePath} imageProps={{resizeMode:"contain", width:"100%"}}>
                        <View>
                            <Text style={{marginBottom:10}}>
                                {`Distance From Earth : ${details.distance_from_earth}`}
                            </Text>
                            <Text style={{marginBottom:10}}>
                                {`Distance From Sun : ${details.distance_from_their_sun}`}
                            </Text>
                            <Text style={{marginBottom:10}}>
                                {`Gravity : ${details.gravity}`}
                            </Text>
                            <Text style={{marginBottom:10}}>
                                {`Orbital Period : ${details.orbital_period}`}
                            </Text>
                            <Text style={{marginBottom:10}}>
                                {`Orbital Speed : ${details.orbital_speed}`}
                            </Text>
                            <Text style={{marginBottom:10}}>
                                {`Planet Mass : ${details.planet_mass}`}
                            </Text>
                            <Text style={{marginBottom:10}}>
                                {`Planet Radius : ${details.planet_radius}`}
                            </Text>
                            <Text style={{marginBottom:10}}>
                                {`Planet Type : ${details.planet_type}`}
                            </Text>
                        </View>
                        <View style={{marginBottom:10, flexDirection:"column"}}>
                            <Text>
                                {details.specifications?`Specifications : ` : ""}
                            </Text>
                            {details.specifications.map(()=>(
                                <Text style={{marginLeft : 50}} key={index.toString()}>
                                    {item}
                                </Text>
                            ))}
                        </View>
                    </Card>
                </View>
            )
        }
        return(
            null
        )
    }   
}