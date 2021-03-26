import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Menu() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.openDrawer()}>
      <Feather name="menu" size={36} color="#373737" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        // zIndex para deixar componente acima do outro como camada mais alta
        zIndex: 9,
        width: 70,
        height: 70,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // posiciona acima
        left: 15,
        top: 40,
        // Cria formato gota
        borderTopRightRadius:30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        // cria elevação e sombra
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 3
        }
    }
});
