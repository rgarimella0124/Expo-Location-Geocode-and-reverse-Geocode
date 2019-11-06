import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
	state = {
		location: null,
		latitude: '',
		longitude: '',
		Address: '',
		pincode: '',
		errorMessage: null
	};

	componentWillMount() {
		if (Platform.OS === 'android' && !Constants.isDevice) {
			this.setState({
				errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
			});
		} else {
			this._getLocationAsync();
		}
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			});
		}
		var obj = {};
		let location = await Location.getCurrentPositionAsync({});
		this.setState({ location });
		obj['latitude'] = location.coords.latitude;
		obj['longitude'] = location.coords.longitude;
		console.log(obj);
		let locationpartone = await Location.reverseGeocodeAsync(obj);
		console.log(locationpartone);
	};

	render() {
		let text = 'Waiting..';
		if (this.state.errorMessage) {
			text = this.state.errorMessage;
		} else if (this.state.location) {
			text = JSON.stringify(this.state.location);
			console.log(text);
		}

		return (
			<View style={styles.container}>
				<Text style={styles.paragraph}>{text}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1'
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		textAlign: 'center'
	}
});
