import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CategoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Category</Text>
      <Button title="Actors" onPress={() => navigation.navigate("Game", { category: "actors" })} />
      <Button title="Football Teams" onPress={() => navigation.navigate("Game", { category: "football" })} />
      <Button title="Singers/Bands" onPress={() => navigation.navigate("Game", { category: "singers" })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
