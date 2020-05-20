import React, { useState, useContext, useCallback } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import ListCard from "../../../../components/ListCard";
import { UserContext } from "../../../../store/contexts/userContext";
import helpService from "../../../../services/Help";
import styles from "../styles";
import colors from "../../../../../assets/styles/colorVariables";

import ConfirmationModal from "../../../../components/modals/confirmationModal";
import NoHelps from "../../../../components/NoHelps";
import { useFocusEffect } from "@react-navigation/native";

export default function DoneHelps({ navigation }) {
  const [finishedHelpList, setFinishedHelpList] = useState([]);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );
  const [loadingHelps, setLoadingHelps] = useState(false);

  const { user } = useContext(UserContext);
  const { _id: userId } = user;

  useFocusEffect(
    useCallback(() => {
      loadFinishedHelps();
    }, [navigation])
  );

  async function loadFinishedHelps() {
    setLoadingHelps(true);
    let resFinished = await helpService.getHelpMultipleStatus(userId, "finished");
    setFinishedHelpList(resFinished);
    setLoadingHelps(false);
  }

  async function excludeHelp(helpId) {
    try {
      await helpService.deleteHelp(helpId);
      const updatedArray = onGoingHelpList.filter((help) => {
        return help._id !== helpId;
      });
      setFinishedHelpList(updatedArray);
      setConfirmationModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      {loadingHelps ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : finishedHelpList.length > 0 ? (
        <ScrollView>
          <View style={styles.helpList}>
            {finishedHelpList.map((item) => (
              <View key={item._id}>
                <ListCard
                  helpTitle={item.title}
                  helpDescription={item.description}
                  helpStatus={item.status}
                  categoryName={item.category[0].name}
                  deleteVisible={true}
                  setConfirmationModalVisible={setConfirmationModalVisible}
                  navigation={navigation}
                  pageName="Description"
                />

                <ConfirmationModal
                  visible={confirmationModalVisible}
                  setVisible={setConfirmationModalVisible}
                  behavior={() => excludeHelp(item._id)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <NoHelps title={"Você não possui ajudas finalizadas"} />
      )}
    </View>
  );
}
