import { View, Text, StyleSheet, Image } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <Image
        source={require("../assets/images/brat-hola-mundo.jpg")}
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
    width: 500,   // ancho fijo
    height: 500, 
  }
});
