import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";

export default function Input({ label, placeholder, change, value, textarea, type }) {
  let input;
  if (textarea) {
    input = (
      <TextInput
        style={styles.input}
        placeholder="..."
        placeholderTextColor={"#BDBDBD"}
        onChangeText={change}
        value={value}
        numberOfLines={6}
        textAlignVertical="top"
        multiline={true}
      />
    );
  } 
  else if(type==='password'){
    
    input = (
      <TextInput
      secureTextEntry
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={"#BDBDBD"}
      onChangeText={change}
      value={value}
      />
    );

  }
  
  else {
    input = (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={"#BDBDBD"}
        onChangeText={change}
        value={value}
      />
    );
  }
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {input}
    </View>
  );
}