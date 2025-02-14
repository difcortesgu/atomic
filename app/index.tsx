// app/index.js
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>Welcome to Habit Tracker</Text>
      <Button title="Go to Login" onPress={() => router.push('/login')} />
      <Button title="Create Habit" onPress={() => router.push('/newHabit')} />
    </View>
  );
}
