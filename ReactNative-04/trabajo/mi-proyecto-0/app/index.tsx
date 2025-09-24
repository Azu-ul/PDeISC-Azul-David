import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <Image
        source={require("../assets/images/brat-hola-mundo.jpg")} // imagen local en /assets
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8ACE00",
  },
  image: {
    width: 250,   // ancho fijo
    height: 250, 
  }
});
