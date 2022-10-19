import React from "react";
import {View } from "react-native";
import styles from "./LocationViewstyle";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

export const LocationView = ({navigation}) => {
  const KEYMAP = 'AIzaSyAz79--n30yY9Q_e2q1dzDZRhVG7kIQTpM'
  const COMPONENTS = 'country:vn'
  const [location, setLocation] = React.useState(null)
  React.useEffect(() => {
    if (location) {
      navigation.navigate('EditMenuView', {location: location})
    }
  }, [location])

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance'
        }}
        onPress={(data, details = null) => {
          console.log('a', data, details)
          console.log(
            'lat: ',
            details.geometry.location.lat,
            'long: ',
            details.geometry.location.lng
          )
          setLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            address: data.description
          })
        }}
        query={{
          key: KEYMAP,
          language: 'vi',
          components: COMPONENTS
        }}
        styles={styles.googleAPI}
      />
    </View>
  );
}