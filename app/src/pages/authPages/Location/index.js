import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import MapView from "react-native-maps";
import styles from "./styles";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import Button from "../../../components/UI/button";
import LocationModal from "./LocationModal";
import { Icon } from "react-native-elements";
import userService from "../../../services/User";

export default function Location({ route, navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [animatedHeigth] = useState(new Animated.Value(70));
  const [descriptionShown, setDescriptionShow] = useState(false);
  const [iconName, setIconName] = useState("sort-up");

  useEffect(() => {
    async function getLocation() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        });
      }
    }
    getLocation();
  }, []);

  useEffect(() => {
    if (descriptionShown) {
      showDescription();
      setIconName("sort-down");
    } else {
      hideDescription();
      setIconName("sort-up");
    }
  }, [descriptionShown]);

  const confirmSignUp = async () => {
    const { userData } = route.params;
    const { latitude, longitude } = currentRegion;
    const newUserData = {
      ...userData,
      latitude,
      longitude,
    };

    try {
      await userService.signUp(newUserData);
      setModalIsVisible(!modalIsVisible);
      Alert.alert(
        "Sucesso",
        "Usuário cadastrado com sucesso!",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Erro",
        err.error || "Erro ao cadastrar usuário. Tente novamente mais tarde!",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } finally {
      navigation.navigate("login");
    }
  };

  function showDescription() {
    Animated.spring(animatedHeigth, {
      toValue: 200,
      tension: 50,
    }).start();
  }
  function hideDescription() {
    Animated.spring(animatedHeigth, {
      toValue: 70,
      tension: 50,
    }).start();
  }

  return (
    <>
      <View style={styles.adjustPositionBox}>
        <Text style={styles.adjustPositionText}>
          Arraste para ajustar sua posição
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          zIndex: 5,
          top: "43%",
          left: "43%",
        }}
      >
        <Image
          source={require("../../../../assets/images/blueCat.png")}
          style={{ height: 50, width: 50, resizeMode: "contain" }}
        />
      </View>
      <MapView
        initialRegion={currentRegion}
        style={styles.map}
        onRegionChangeComplete={(region) => setCurrentRegion(region)}
        onRegionChange={() => setDescriptionShow(false)}
      />

      <Animated.ScrollView
        style={[{ height: animatedHeigth }, styles.description]}
        scrollEnabled={false}
      >
        <TouchableOpacity
          onPress={() => {
            setDescriptionShow(!descriptionShown);
          }}
        >
          <Icon name={iconName} type="font-awesome" />
          <Text style={styles.descriptionTextTitle}>
            Por que precisamos de sua posição?
          </Text>
          {descriptionShown && (
            <Text style={styles.descriptionText}>
              Ela será onde sua ajuda será informada no mapa! Por isso, se você
              não estiver na posição que deseja cadastrar, deixe esse passo para
              depois.
            </Text>
          )}
        </TouchableOpacity>
      </Animated.ScrollView>

      <View style={styles.buttons}>
        <Button
          title="Voltar"
          type="warning"
          press={() => {
            navigation.goBack();
          }}
        />
        <Button
          title="Confirmar"
          type="primary"
          press={() => setModalIsVisible(!modalIsVisible)}
        />
      </View>

      <LocationModal
        visible={modalIsVisible}
        onBackdropPress={() => setModalIsVisible(false)}
        setVisible={setModalIsVisible}
        confirmSignUp={confirmSignUp}
      />
    </>
  );
}