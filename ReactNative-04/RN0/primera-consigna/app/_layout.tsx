import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="second" options={{ title: "Segundo" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffffff",
  },
  tabLabel: {
    color: "black",
    fontSize: 16, 
    fontFamily: "Arial Narrow",
  },
});
