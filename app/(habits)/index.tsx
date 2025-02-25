import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { SwipeListView } from 'react-native-swipe-list-view';
import { globalStyles } from '@/styles/GlobalStyles';
import ActionButton from '@/components/ActionButton';

type Habit = {
	name: string,
	icon: keyof typeof MaterialIcons.glyphMap,
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
		icon: "directions-run",
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
		<View style={[globalStyles.hiddenContainer, { left: 0 }]}>
			<ActionButton data={data} action={completeHabit} icon='check' type='suceess' />
		</View>
	);

	// Render right action button
	const renderRightActions = (data: any) => (
		<View style={[globalStyles.hiddenContainer, { right: 0 }]}>
			<ActionButton data={data} action={undoCompleteHabit} icon='undo' type='danger' />
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			<Text style={globalStyles.title}>Habitos</Text>
			<SwipeListView
				data={habits}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item, index }) => (
					<Link href={`/(habits)/${index}`}>
						<View style={globalStyles.habitContainer}>
							<Image style={globalStyles.image} source={item.plant} transition={1000} />
							<View style={globalStyles.textContainer}>
								<View style={globalStyles.row}>
									<MaterialIcons name={item.icon} size={32} color="red" />
									<Text style={globalStyles.habitName}>{item.name}</Text>
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

			<ActionButton style={globalStyles.fab} action={addNewHabit} icon='add' type='info' />
		</View>
	);
}