import React, { Component } from 'react';
import { MapView } from 'expo';

class Map extends Component {
    static navigationOptions = {
        //header: null,
        title: "Map",
        headerStyle: {
            backgroundColor: "#ffc107"
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props);
    }
    render() {
        //console.log('data', this.props.navigation.state.params.data);
        //let [lat, long] = [50.111, 20.111];
        if (!!this.props.navigation.state.params.latitude && !!this.props.navigation.state.params.longitude) {
            lat = this.props.navigation.state.params.latitude;
            long = this.props.navigation.state.params.longitude;
        }
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}>
                {
                    <MapView.Marker
                        //key={i}
                        coordinate={{
                            latitude: lat,
                            longitude: long,
                        }}
                        description={long + ' ' + lat}
                    />
                }
            </MapView>
        );
    }
}
export default Map;