import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function Habit() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Habit {id}</Text>
    </View>
  )
}