import * as React from "react";
import { StyleSheet, Image, Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Icon,
} from "native-base";

export const ToolList = (props) => {
  const availableTools = props.tools.map((tool) => (
    <ListItem
      key={tool.id}
      onPress={() => props.navigation.navigate(tool.name)}
    >
      <Left>
        <Thumbnail
          style={{ width: 60, height: 60 }}
          source={{ uri: `${tool.icon}` }}
        />
      </Left>
      <Body style={{ marginLeft: -100 }}>
        <Text style={{ fontSize: 25 }}>{tool.type}</Text>
      </Body>
      <Right style={{ justifyContent: "center" }}>
        <Image
          style={{ width: 20, height: 10, marginRight: 10 }}
          source={require("../assets/images/arrowIcon.png")}
        />
      </Right>
    </ListItem>
  ));
  return (
    <Container>
      <Content>
        <List>{availableTools}</List>
      </Content>
    </Container>
  );
};
