import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Details({ route, navigation }) {
  const { item } = route.params;
  console.log(item.description);
  return (
    <View style={styles.container}>
      <FlatList
        data={[item]}
        renderItem={({ item }) => (
          <ScrollView>
            <View style={styles.card}>
              <View>
                <View style={styles.cardText}>
                  <Text>{item.nameProduct}</Text>
                </View>
                <Image
                  style={{ width: 300, height: 150 }}
                  source={{
                    uri: `${item.photo}`,
                  }}
                />
              </View>
              <View style={styles.cardText}>
                <Text >المقادير</Text>
              </View>
              <View style={styles.recipe}>

                <Text>{item.recipe}</Text>
              </View>
                <View style={styles.recipe}>
                    <Text style={{marginVertical:15,alignSelf:"center"}}>طريقة العمل</Text>
                    <Text style={{marginVertical:15}}>{item.description}</Text>
                </View>
            </View>
          </ScrollView>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginTop: 30,
    marginVertical: 40,
  },
  cardText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: "bold",
    fontWeight: "300",
    
    justifyContent: "center",
   
    marginVertical: 10,
  },
  recipe:{
    marginHorizontal:10,
    marginVertical:5
  }
});
