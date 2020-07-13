import React from "react";
import { Card } from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";

export const BookCard = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Card style={styles.card}>
        <Card.Title>{props.first.name}</Card.Title>
      </Card>
      <Card style={styles.card}>
        <Card.Title>{props.second.name}</Card.Title>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").height * 0.25,
    margin: 10,
    borderRadius: 10,
  },
});
