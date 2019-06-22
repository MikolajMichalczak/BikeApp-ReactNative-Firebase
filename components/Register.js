import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import MyButton from "./MyButton"
import { Dimensions } from 'react-native';
import firebase from "firebase"

class Register extends Component {
    static navigationOptions = {
        //header: null,
        title: "Register/Login",
        headerStyle: {
            backgroundColor: "#ffc107",
        },
        headerTitleStyle: {
            color: "black"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.height = Dimensions.get("window").height
        this.width = Dimensions.get("window").width
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    register() {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => ToastAndroid.showWithGravity(
                "User " + this.state.email + " registered. U can login now.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            ))
            .then(() => firebase.auth().signOut().then(function () {
                //console.log('Signed Out');
            }, function (error) {
                console.error('Sign Out Error', error);
            }))
            .catch(function (error) {
                if (error.message) {
                    ToastAndroid.showWithGravity(
                        error.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            })

    }

    login() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => ToastAndroid.showWithGravity(
                "logged user email: " + this.state.email,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            ))
            .then(() => this.props.navigation.navigate("s4"))
            .catch(function (error) {
                if (error.message) {
                    ToastAndroid.showWithGravity(
                        error.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            })
    }

    render() {
        return (
            <View style={styles.cont}>
                <View>
                    <TextInput
                        onChangeText={(text) => this.setState({ email: text })}
                        style={{ height: this.height / 20, width: this.width * 0.7 }}
                        placeholder="E-mail"
                    />
                    <TextInput
                        onChangeText={(text) => this.setState({ password: text })}
                        style={{ height: this.height / 20, width: this.width * 0.7, marginBottom: '5%' }}
                        secureTextEntry={true}
                        placeholder="Password"
                    />
                </View>
                <MyButton text={"LOGIN"} width={200} height={40} handleBox={this.login} />
                <MyButton text={"REGISTER"} width={200} height={40} handleBox={this.register} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    text: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold'
    }
});

export default Register;