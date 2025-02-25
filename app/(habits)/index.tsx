import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { SwipeListView } from 'react-native-swipe-list-view';

type Habit = {
	name: string,
	icon: keyof typeof Ionicons.glyphMap
	plant: string,
	//TODO define how to show the plants
	remainders: Date[],
	days: Number[],
	allowRemainders: boolean,
	progress: Date[],
}

const blurhash =
	'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const mockHabits: Habit[] = [
	{
		name: "Morning Run",
		icon: "walk",
		plant: 'https://picsum.photos/200?random=1',// "Oak Tree",
		remainders: [new Date("2025-02-21T06:30:00")],
		days: [1, 3, 5],
		// Monday, 
		// Wednesday, 
		// Friday
		allowRemainders: true,
		progress: [new Date("2025-02-19"),
		new Date("2025-02-20")],
	},
	{
		name: "Read a Book",
		icon: "book",
		plant: 'https://picsum.photos/200?random=2',//"Sunflower",
		remainders: [new Date("2025-02-21T20:00:00")],
		days: [0, 2, 4, 6],
		// Sunday, 
		// Tuesday, 
		// Thursday, 
		// Saturday
		allowRemainders: true,
		progress: [new Date("2025-02-18"),
		new Date("2025-02-19")],
	},
	// {
	// 	name: "Drink Water",
	// 	icon: "water",
	// 	plant: 'https://picsum.photos/200?random=3',//"Cactus",
	// 	remainders: [
	// 		new Date("2025-02-21T08:00:00"),
	// 		new Date("2025-02-21T12:00:00"),
	// 		new Date("2025-02-21T18:00:00"),
	// 	],
	// 	days: [0, 1, 2, 3, 4, 5, 6], 
	// // Every day
	// 	allowRemainders: true,
	// 	progress: [new Date("2025-02-19T08:00:00"), 
	// new Date("2025-02-20T12:00:00")],
	// },
	// {
	// 	name: "Meditation",
	// 	icon: "leaf",
	// 	plant: 'https://picsum.photos/200?random=4',//"Bonsai",
	// 	remainders: [new Date("2025-02-21T07:00:00")],
	// 	days: [1, 3, 5], 
	// // Monday, 
	// Wednesday, 
	// Friday
	// 	allowRemainders: true,
	// 	progress: [new Date("2025-02-18"), 
	// new Date("2025-02-19")],
	// },
	// {
	// 	name: "Stretching",
	// 	icon: "body",
	// 	plant: 'https://picsum.photos/200?random=5',//"Bamboo",
	// 	remainders: [new Date("2025-02-21T07:30:00")],
	// 	days: [0, 2, 4, 6], 
	// // Sunday, 
	// Tuesday, 
	// Thursday, 
	// Saturday
	// 	allowRemainders: true,
	// 	progress: [new Date("2025-02-19"), 
	// new Date("2025-02-20")],
	// },
	// {
	// 	name: "Journal Writing",
	// 	icon: "create",
	// 	plant: 'https://picsum.photos/200?random=6',//"Cherry Blossom",
	// 	remainders: [new Date("2025-02-21T21:00:00")],
	// 	days: [1, 3, 5, 6], 
	// // Monday, 
	// Wednesday, 
	// Friday, 
	// Saturday
	// 	allowRemainders: true,
	// 	progress: [new Date("2025-02-18"), 
	// new Date("2025-02-19")],
	// },
];


export default function HabitList() {
	const [habits, setHabits] = useState(mockHabits);

	const completeHabit = (data: any) => {
		// TODO: Implement complete habit
		console.log("Complete Habit", data.item.name)
	}

	const undoCompleteHabit = (data: any) => {
		// TODO: Implement undo complete habit
		console.log("Undo Complete Habit", data.item.name)
	}

	const addNewHabit = () => {
		// TODO: Implement add new habit
		console.log("Add New Habit")
	}

	// Render left action button
	const renderLeftActions = (data: any) => (
		<View style={[styles.hiddenContainer, { left: 0 }]}>
			<TouchableOpacity style={[styles.actionButton, { backgroundColor: 'green' }]} onPress={() => completeHabit(data)}>
				<Ionicons name="checkmark-done" size={32} color="white" />
			</TouchableOpacity>
		</View>
	);

	// Render right action button
	const renderRightActions = (data: any) => (
		<View style={[styles.hiddenContainer, { right: 0 }]}>
			<TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={() => undoCompleteHabit(data)}>
				<Ionicons name="trash-bin" size={32} color="white" />
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			<Text style={styles.title}>Habitos</Text>
			<SwipeListView
				data={habits}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item, index }) => (
					<Link href={`/(habits)/${index}`}>
						<View style={styles.habitContainer}>
							<Image style={styles.image} source={item.plant} transition={1000} />
							<View style={styles.textContainer}>
								<View style={styles.row}>
									<Ionicons name={item.icon} size={32} color="red" />
									<Text style={styles.habitName}>{item.name}</Text>
								</View>
							</View>
						</View>
					</Link>
				)}
				renderHiddenItem={(data) => (
					<>
						{renderLeftActions(data)}
						{renderRightActions(data)}
					</>
				)}
				leftOpenValue={75} // Swipe right
				rightOpenValue={-75} // Swipe left
			/>

<TouchableOpacity style={styles.fab} onPress={addNewHabit}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 10
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	textContainer: {
		flex: 1,
		paddingLeft: 10,
		justifyContent: 'center'
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	habitName: {
		marginLeft: 10,
		fontSize: 18
	},
	actionText: {
		color: 'white',
		fontWeight: 'bold'
	},

	habitContainer: {
		flexDirection: 'row',
		backgroundColor: 'white',
		padding: 20,
		marginVertical: 5,
		borderRadius: 10
	},
	hiddenContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		justifyContent: 'center',
		width: 75,
		alignItems: 'center'
	},
	actionButton: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,
		borderRadius: 30
	},
	// Floating Action Button (FAB)
	fab: {
		position: 'absolute',
		bottom: 30, // Adjusts distance from bottom
		right: 30, // Adjusts distance from right
		backgroundColor: '#007AFF', // Blue color
		width: 60,
		height: 60,
		borderRadius: 30, // Makes it circular
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5, // Adds shadow on Android
		shadowColor: '#000', // Adds shadow on iOS
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
	  },
});