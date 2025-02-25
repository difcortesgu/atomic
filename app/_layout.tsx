import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function TabLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer screenOptions={{}}>
				<Drawer.Screen name="index" options={{ drawerLabel: 'Home', title: 'Home' }} />
				<Drawer.Screen name="(habits)" options={{ drawerLabel: 'Habit List', title: 'Habit List' }} />
				<Drawer.Screen name="Calendar" options={{ drawerLabel: 'Habit Calendar', title: 'Habit Calendar' }} />
				<Drawer.Screen name="Statistics" options={{ drawerLabel: 'Statistics', title: 'Statistics' }} />
				<Drawer.Screen name="Settings" options={{ drawerLabel: 'Settings', title: 'Settings' }} />
			</Drawer>
		</GestureHandlerRootView>
	);
}
