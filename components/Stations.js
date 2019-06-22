import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ToastAndroid, ActivityIndicator } from 'react-native';
import MyButton from "./MyButton"
import firebase from "firebase"
import ListItem from "./ListItem"

class Stations extends Component {
    static navigationOptions = {
        //header: null,
        title: "Bike stations in NYC",
        headerStyle: {
            backgroundColor: "#ffc107",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            dane: '',
            user: '',
            indicator: true
        };
        this.stations = this.getFirebase().child("stations") // "stations" to nazwa tablicy w obiekcie jsona   
        this.height = Dimensions.get("window").height
        this.width = Dimensions.get("window").height
        this.logOut = this.logOut.bind(this);
        this.main = this.main.bind(this);
        this.showMap = this.showMap.bind(this);
    }

    getFirebase() {
        return firebase.database().ref()
    }

    componentWillMount = async () => {
        let user = firebase.auth().currentUser;
        this.setState({ user: user.email })
        let dane = [];
        //
        await this.stations.on("value", (elements) => {
            elements.forEach((item) => {
                dane.push(JSON.parse(JSON.stringify((item))))
            })
            this.setState({ dane: dane })
            //console.log(this.state.dane)
        })
    }

    logOut() {
        firebase.auth()
            .signOut()
            .then(() => console.log("logout"))
            .then(() => ToastAndroid.showWithGravity(
                "Logged out.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            ))
            .then(() => this.props.navigation.navigate("s3"))
            .catch((error) => console.log(error))
    }

    main() {
        this.props.navigation.navigate("s1")
    }

    infoIndi = async (end) => {
        await console.log(end)
        this.setState({ indicator: false })
    }

    showMap(_latitude, _longitude) {
        console.log(_latitude, _longitude)
        this.props.navigation.navigate("s5", { latitude: _latitude, longitude: _longitude })
    }

    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.btn}>
                    <View style={styles.user}>
                        <Text style={{ color: "#ffc107", fontSize: this.height / 50 }}>Witaj {this.state.user}!</Text>
                    </View>
                    <View style={styles.btnRow}>
                        <MyButton text={"Main page"} height={this.height / 20} width={this.width / 5} handleBox={this.main} />
                        <MyButton text={"Logout"} height={this.height / 20} width={this.width / 5} handleBox={this.logOut} />
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={
                            this.state.dane
                        }
                        renderItem={({ item }) => <ListItem name={item.stationName} latitude={item.latitude} longitude={item.longitude} totalDocks={item.totalDocks} avBikes={item.availableBikes} avDocks={item.availableDocks} status={item.statusValue} handleBox={this.showMap} infoIndi={this.infoIndi} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                {
                    this.state.indicator ?
                        <ActivityIndicator style={{ flex: 1, position: 'absolute', alignSelf: 'center', marginTop: '50%' }} size="large" color="#ffc107" />
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
    },
    btn: {
        //backgroundColor: 'purple',
        flex: 2,
        //marginBottom: '5%'
    },
    btnRow: {
        //backgroundColor: 'green',
        flex: 6,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'space-around'
    },
    user: {
        //backgroundColor: 'yellow',
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        //backgroundColor: 'blue',
        flex: 11,
    }
});

export default Stations;