import React from "react";
import { Text, View } from "react-native";
import styles from '../style/style';

export default function Footer() {
    return (
        <View style={styles.header}>
            <Text style={styles.author}>
                Santeri K
            </Text>
        </View>
    )
}