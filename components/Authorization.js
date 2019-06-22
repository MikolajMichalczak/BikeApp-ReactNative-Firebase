import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import firebase from "firebase";
import { ActivityIndicator } from 'react-native';
import { ToastAndroid } from 'react-native';

var config = {
    apiKey: "AIzaSyCf2jFJpT9gYMybCfPqQxMt4oueg2O1y7w",
    authDomain: "michalczakmikolaj4ib1.firebaseapp.com",
    databaseURL: "https://michalczakmikolaj4ib1.firebaseio.com",
    projectId: "michalczakmikolaj4ib1",
    storageBucket: "michalczakmikolaj4ib1.appspot.com",
    messagingSenderId: "331056455347"
};

firebase.initializeApp(config);

class Authorization extends Component {
    static navigationOptions = {
        header: null,
        title: "any title",
        headerStyle: {
            backgroundColor: "#000000",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            indicator: false
        };
    }

    componentDidMount() {
        //this.setState({ indicator: true })
        var user = firebase.auth().currentUser;
        if (user)
            this.props.navigation.navigate("s4")
        else
            this.props.navigation.navigate("s3")
        // jeśli user istnieje, wtedy przechodzimy do wyświetlenia ekranu z listą danych pobranych z bazy firebase
        // jeśli nie istnieje - wtedy przechodzimy do ekranu logowania

        //this.setState({ indicator: false })
    }

    render() {
        return (
            <View style={styles.cont}>
                {
                    this.state.indicator ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        null
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1
    }
});

export default Authorization;