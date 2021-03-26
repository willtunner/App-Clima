import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList, View } from "react-native";
import * as Location from "expo-location";

import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Conditions from "../../components/Conditions";
import Forecast from "../../components/Forecast";


// ? o api está como export default e o key como uma variavel apenas 
import api, { key } from '../../services/api';



export default function Home() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState({ name: 'cloud', color: '#FFF'});
  const [background, setBackground] = useState(['#1ed6ff', '#97c1ff']);

  useEffect(() => {
    (async () => {
        // ? Chama a pergunta se pode usar a localização
      let { status } = await Location.requestPermissionsAsync();

      if( status !== 'granted'){
          // ? seta uma mensagem caso seja negado ou de erro na permissão
          setErrorMsg('Permissão negada para acessar localização');
          // ? tira o loading da tela
          setLoading(false);
          return;
      }

      // ? Se passou do if retorno granted  cod abaixo
      // ? Pega a localização
      let location = await Location.getCurrentPositionAsync({});
       // console.log(location.coords.latitude);   
       const response = await api.get(`/weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
       // console.log(response.data);
       setWeather(response.data);

       // ? Verifica se está de dia ou noite para mudar a cor do fundo
       if(response.data.results.currently === 'noite'){
          setBackground(['#0c3741', '#0f2f61']);
       }

       switch(response.data.results.condition_slug){
         case 'clear_day':
           setIcon({ name: 'partly-sunny', color: '#FFB300'});
           break;
         case 'rain':
           setIcon({ name: 'rainy', color: '#FFF'});
           break;
         case 'storn':
           setIcon({ name: 'rainy', color: '#FFF'});
           break;
       }

       setLoading(false);

    })();
  }, []);

  if(loading){
    return(
      <View style={styles.container}>
        <Text style={{fontSize: 17, fontStyle: 'italic'}}>Carregando dados...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      {/* //? Passa info para component Header da api via props */}
      <Header background={background} weather={weather} icon={icon} />
      <Conditions weather={weather} />

      <FlatList
        horizontal={true}
        contentContainerStyle={{ paddingBottom: "5%" }}
        style={styles.list}
        data={weather.results.forecast}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <Forecast data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8f0ff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "5%",
  },
  list: {
    marginTop: 10,
    marginLeft: 10,
  },
});
