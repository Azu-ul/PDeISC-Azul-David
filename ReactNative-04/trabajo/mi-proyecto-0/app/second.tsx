import { View, Text, StyleSheet } from "react-native";

export default function SecondScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Segundo tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe4e1",
  },
  text: {
    fontSize: 72,
    fontWeight: "600",
    color: "#800000",
    fontFamily: 'Impact',
  },
});
