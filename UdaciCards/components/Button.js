import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../utils/styles'

export function Button({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.button}>{children}</Text>
    </TouchableOpacity>
  )
}
