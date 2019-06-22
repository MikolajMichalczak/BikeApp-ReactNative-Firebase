import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MyButton from "./MyButton"


class ListItem extends Component {
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
            status: false
        };
        this.onPressBtn = this.onPressBtn.bind(this);
        this.height = Dimensions.get("window").height
        this.width = Dimensions.get("window").height
        this.checkStatus()
    }

    onPressBtn() {
        this.props.handleBox(this.props.latitude, this.props.longitude)
    }

    checkStatus() {
        this.props.infoIndi("koniec")
    }

    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.name}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{this.props.name}</Text>
                </View>
                <View style={styles.info}>
                    <View style={styles.coords}>
                        <Text>lat: {this.props.latitude}</Text>
                        <Text>lng: {this.props.longitude}</Text>
                        <Text>Total docks: {this.props.totalDocks}</Text>
                    </View>
                    <View style={styles.graph}>
                        <View style={styles.available}>
                            <View style={{ flex: this.props.avBikes, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>B</Text>
                            </View>
                            <View style={{ flex: this.props.avDocks, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>S</Text>
                            </View>
                        </View>
                        <View style={[this.props.status == 'In Service' ? styles.inService : styles.notInService]}>
                            <Text style={{ color: 'white' }}>{this.props.status}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.btn}>
                    <MyButton text={"Map"} height={this.height / 20} width={this.width / 5} handleBox={this.onPressBtn} />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        padding: '5%',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 7,
        marginRight: 7,
        marginTop: 10,
    },
    info: {
        flex: 1,
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: '3%'
    },
    btn: {
        flex: 1,
        //backgroundColor: 'green',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    available: {
        flex: 1,
        flexDirection: 'row',
    },
    name: {
        // backgroundColor: 'red'
    },
    inService: {
        backgroundColor: 'green',
        padding: '2%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notInService: {
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    graph: {
        //backgroundColor: 'blue',
        width: '40%'
    }
});

export default ListItem;