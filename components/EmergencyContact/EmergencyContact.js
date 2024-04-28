import * as Clipboard from "expo-clipboard";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ClipboardIcon } from "react-native-heroicons/solid";

export default function EmergencyContact({ contactNo, name }) {
  const [copiedText, setCopiedText] = React.useState("");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(contactNo);
  };

  const fetchCopiedText = async () => {
    const copiedText = await Clipboard.getStringAsync();
    setCopiedText(copiedText);
  };

  return (
    <View style={styles.contactContainer}>
      <View>
        <Text>{name}</Text>
        <Text>{contactNo}</Text>
      </View>
      <Pressable onPress={copyToClipboard}>
        <ClipboardIcon size={30} color={"#aaa"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  copiedText: {
    marginTop: 10,
    color: "red",
  },
  contactContainer: {
    backgroundColor: "#eee",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
