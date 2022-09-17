import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import axios from "axios";

export default function Form({ setOpenModal, getData }) {
  const [photo, setPhoto] = useState(null);
  const [errorForm, setErrorForm] = useState("");
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Sorry, Camera roll permissions are required to make this work!"
          );
        }
      }
    })();
  }, []);

  const createRecipe = async (values) => {
    if (values.nameProduct.length < 3) {
      return setErrorForm("رجاء ادخل الأسم");
    }
    if (values.recipe.length < 3) {
      return setErrorForm("رجاء ادخل المقادير");
    }
    if (values.description.length < 3) {
      return setErrorForm("رجاء ادخل طريقة العمل");
    }
    if (values.photo === null || values.photo === "") {
      return setErrorForm("رجاء ادخل صورة");
    }
    try {
      await axios.post(
        "https://recipe-home2.herokuapp.com/api/products/create",
        values
      );
      setOpenModal(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(photo);
  const chooseImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  return (
    <View style={styles.formikContainer}>
      <Formik
        initialValues={{
          nameProduct: "",
          recipe: "",
          description: "",
          photo: "",
        }}
        onSubmit={(values) => createRecipe(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="اسم الطبخه"
              onChangeText={handleChange("nameProduct")}
              onBlur={handleBlur("nameProduct")}
              value={values.nameProduct}
            />
            <TextInput
              multiline
              style={styles.input}
              placeholder="المقادير"
              onChangeText={handleChange("recipe")}
              onBlur={handleBlur("recipe")}
              value={values.recipe}
            />
            <TextInput
              multiline
              style={styles.input}
              placeholder="'طريقة العمل"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
            <Button
              title="أدخل صورة"
              onPress={chooseImg}
              value={(values.photo = photo)}
            />
            {photo && (
              <View>
                <Image
                  source={{ uri: `${photo}` }}
                  style={{ width: 170, height: 170, alignSelf: "center" }}
                />
              </View>
            )}
            <View style={styles.buttonForm}>
              <Button color={"#1c4e05"} title="تسجيل" onPress={handleSubmit} />
            </View>
            {errorForm && (
              <View style={styles.textError}>
                <Text style={{ color: "#fff" }}>{errorForm}</Text>
              </View>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  formikContainer: {
    marginHorizontal: 25,
  },
  textError: {
    backgroundColor: "red",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  buttonForm: {
    margin: 10,
  },
});
