import React, { useState } from "react";
import { Text, KeyboardAvoidingView, ScrollView, View } from "react-native";

import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";
import emailValidator from "../../../utils/emailValidation";

export default function RegistrationData({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmPass, setConfirmPass] = useState(true);

  const emailHandler = (enteredEmail) => {
    setEmail(enteredEmail);
    setEmailIsValid(emailValidator(email));
  };

  const passwordHandler = (enteredPassword) => {
    setPassword(enteredPassword);
  };

  const confirmHandler = (enteredConfirm) => {
    password.length > 0 && password === enteredConfirm
      ? setConfirmPass(true)
      : setConfirmPass(false);

    setConfirm(enteredConfirm);
  };
  
  const continueHandler = () => {
    const registrationData = { email, password };
    console.log(registrationData);
    navigation.navigate("personalData", { registrationData });
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeAreaView}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}>
        <View>
          <Text style={styles.text1}>
            Pra começar a fazer seu cadastro, preencha seu email e senha!!
          </Text>
        </View>
        <ScrollView 
          style={styles.scroll}
          contentContainerStyle={{flexGrow : 1, justifyContent : 'center'}}
        >
          <View style={styles.form}>
            <Input
              style={styles.firstInput}
              change={emailHandler}
              label="Email"
              placeholder="email@exemplo.com"
              valid={emailIsValid}
              />
            <View style={styles.viewMargin} />
            
            <Input
              type="password"
              change={passwordHandler}
              label="Senha"
              placeholder="Senha"
              />
            <View style={styles.viewMargin} />

            <Input
              change={confirmHandler}
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              type="password"
              valid={confirmPass}
            />
          </View>
        </ScrollView>
        <View style={styles.btnView}>
          <Button
            disabled={
              !(
                email.length > 0 &&
                password.length > 0 &&
                password === confirm
              )
            }
            title="Continuar"
            large
            press={continueHandler}
          />
        </View>
    </KeyboardAvoidingView>
  )
}
