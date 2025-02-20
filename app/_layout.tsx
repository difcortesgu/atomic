import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {

	return (
		<Stack screenOptions={{}}>
			<Stack.Screen name="index" options={{ title: 'Home' }} />
			<Stack.Screen name="Habit" options={{ title: 'Habit' }} />
			<Stack.Screen name="HabitList" options={{ title: 'Habit List' }} />
			<Stack.Screen name="Calendar" options={{ title: 'Habit Calendar' }} />
			<Stack.Screen name="Statistics" options={{ title: 'Statistics' }} />
			<Stack.Screen name="Settings" options={{ title: 'Settings' }} />
		</Stack>
	);
}
