import { StyleSheet, View } from "react-native";

import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "./screens/Details";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="وصفات منزلية" component={Home} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: "تفاصيل" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    marginTop: 50,
    marginVertical: 40,
  },
  cardText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: "bold",
    fontWeight: "300",
    color: "red",
  },
});
