import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { BookCard } from "./BookCard";

const books = [
  { id: 0, name: "Calculus Textbook", dateborrowed: "10/30/2020" },
  { id: 1, name: "AP Language and Composition", dateborrowed: "11/22/2020" },
  { id: 2, name: "AP Physics", dateborrowed: "11/25/2020" },
  { id: 3, name: "AP US History", dateborrowed: "10/4/2020" },
  { id: 4, name: "Uncle Toms Cabin", dateborrowed: "2/22/2021" },
];
let id = 0;
export const CheckedOutBooks = () => {
  if (books.length % 2 != 0) {
    const groupings = [];
    for (let i = 0; i < books.length - 1; i += 2) {
      const curbook = books[i];
      const nextbook = books[i + 1];
      const Grouping = () => {
        return (
          <View key={curbook.id}>
            <BookCard first={curbook} second={nextbook}></BookCard>
          </View>
        );
      };
      groupings.push(Grouping);
    }
    const secGrouping = groupings.map((Group) => (
      <View key={id++}>
        <Group />
      </View>
    ));
    return (
      <ScrollView style={{ marginTop: 20 }}>
        <View style={styles.container}>{secGrouping}</View>
      </ScrollView>
    );
  } else {
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalbooklist: {
    flexDirection: "row",
  },
});
