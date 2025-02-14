import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {

	return (
		<Stack screenOptions={{}}>
			<Stack.Screen name="index" options={{ title: 'Home' }} />
			<Stack.Screen name="login" options={{ title: 'Login' }} />
			<Stack.Screen name="register" options={{ title: 'Register' }} />
			<Stack.Screen name="newHabit" options={{ title: 'New Habit' }} />
			<Stack.Screen name="calendar" options={{ title: 'Habit Calendar' }} />
		</Stack>
	);
}
