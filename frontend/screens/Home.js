import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Form from "../components/Form";
export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://recipe-home2.herokuapp.com/api/products"
      );
      setData(data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  data.map((item) => {
    console.log(item.recipe);
  });
  return (
    <View style={styles.container}>
      <View style={styles.addIcons}>
        <Ionicons
          name="add"
          size={35}
          color="black"
          onPress={() => setOpenModal(true)}
        />
        <View style={styles.textIcon}>
          <Text>وصفة جديده</Text>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { item })}
            >
              <ScrollView>
                <View style={styles.card} key={item._id}>
                  <View>
                    <Image
                      style={{ width: 150, height: 150 }}
                      source={{
                        uri: `${item.photo}`,
                      }}
                    />
                  </View>
                  <View style={styles.cardText}>
                    <Text>{item.nameProduct}</Text>
                  </View>
                  <Button
                    title="تفاصيل"
                    color={"#5d23d4"}
                    onPress={() => navigation.navigate("Details", { item })}
                  />
                </View>
              </ScrollView>
            </TouchableOpacity>
          )}
        />
      )}
      <Modal animationType="slide" visible={openModal}>
        <Ionicons
          name="close"
          size={35}
          color="black"
          onPress={() => setOpenModal(false)}
        />

        <Form setOpenModal={setOpenModal} getData={getData} />
      </Modal>
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
  addIcons: {
    position: "absolute",
    top: 15,
    right: 20,
  },
  textIcon: {
    position: "relative",
    bottom: 5,
    left: 10,
  },
});
