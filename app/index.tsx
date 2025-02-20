// app/index.js
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Welcome to Habit Tracker</Text>
      <Button title="Index" onPress={() => router.push('/Index')} />
      <Button title="Habit" onPress={() => router.push('/Habit')} />
      <Button title="HabitList" onPress={() => router.push('/HabitList')} />
      <Button title="Calendar" onPress={() => router.push('/Calendar')} />
      <Button title="Statistics" onPress={() => router.push('/Statistics')} />
      <Button title="Settings" onPress={() => router.push('/Settings')} />
    </View>
  );
}
