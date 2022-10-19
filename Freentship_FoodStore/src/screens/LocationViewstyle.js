import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  googleAPI: {
    container: { flex: 0, position: 'absolute', width: '100%', zIndex: 1 },
    listView: { backgroundColor: 'white' }
  },
})