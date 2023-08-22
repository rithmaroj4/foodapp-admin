import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import COLORS from '../constants/colors';

const IsLiveCheckbox = ({ isChecked, onPress }) => (
    <TouchableOpacity style={styles.tickButton} onPress={onPress}>
      <Text style={styles.tickText}>{isChecked ? "✓" : ""}</Text>
    </TouchableOpacity>
  );

export default IsLiveCheckbox

const styles = StyleSheet.create({
    tickButton: {
        width: 30,
        height: 30,
        // borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
      },
      tickButtonSelected: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.primary,
      },
      tickText: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: "bold",
      },
})