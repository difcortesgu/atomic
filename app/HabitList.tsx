import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react'
import Habit from './Habit';
import { Image } from 'expo-image';

type Habit = {
	name: string,
	icon: keyof typeof Ionicons.glyphMap
	plant: string, //TODO define how to show the plants
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
		days: [1, 3, 5], // Monday, Wednesday, Friday
		allowRemainders: true,
		progress: [new Date("2025-02-19"), new Date("2025-02-20")],
	},
	{
		name: "Read a Book",
		icon: "book",
		plant: 'https://picsum.photos/200?random=2',//"Sunflower",
		remainders: [new Date("2025-02-21T20:00:00")],
		days: [0, 2, 4, 6], // Sunday, Tuesday, Thursday, Saturday
		allowRemainders: true,
		progress: [new Date("2025-02-18"), new Date("2025-02-19")],
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
	// 	days: [0, 1, 2, 3, 4, 5, 6], // Every day
	// 	allowRemainders: true,
	// 	progress: [new Date("2025-02-19T08:00:00"), new Date("2025-02-20T12:00:00")],
	// },
	// {
	// 	name: "Meditation",
	// 	icon: "leaf",
	// 	plant: 'https://picsum.photos/200?random=4',//"Bonsai",
	// 	remainders: [new Date("2025-02-21T07:00:00")],
	// 	days: [1, 3, 5], // Monday, Wednesday, Friday
	// 	allowRemainders: true,
	// 	progress: [new Date("2025-02-18"), new Date("2025-02-19")],
	// },
	// {
	// 	name: "Stretching",
	// 	icon: "body",
	// 	plant: 'https://picsum.photos/200?random=5',//"Bamboo",
	// 	remainders: [new Date("2025-02-21T07:30:00")],
	// 	days: [0, 2, 4, 6], // Sunday, Tuesday, Thursday, Saturday
	// 	allowRemainders: true,
	// 	progress: [new Date("2025-02-19"), new Date("2025-02-20")],
	// },
	// {
	// 	name: "Journal Writing",
	// 	icon: "create",
	// 	plant: 'https://picsum.photos/200?random=6',//"Cherry Blossom",
	// 	remainders: [new Date("2025-02-21T21:00:00")],
	// 	days: [1, 3, 5, 6], // Monday, Wednesday, Friday, Saturday
	// 	allowRemainders: true,
	// 	progress: [new Date("2025-02-18"), new Date("2025-02-19")],
	// },
];

export default function HabitList() {

	const [habits, setHabits] = useState<Habit[] | []>(mockHabits)

	return (
		<View>
			<Text>Habitos</Text>

			<ScrollView>
				{habits.map((habit, index) =>

					<View key={index} style={{ flexDirection: "row", padding: 20, margin: 20 }}>
						<View style={styles.container}>
							<Image
								style={styles.image}
								source={habit.plant}
								placeholder={{ blurhash }}
								transition={1000}
							/>
						</View>
						<View style={{flex: 2 / 3, padding: 20 }}>
							<View style={{ flexDirection: 'row' }}>
								<Ionicons name={habit.icon} size={32} color="red" />
								<Text>{habit.name}</Text>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<View><Text>L</Text></View>
								<View><Text>M</Text></View>
								<View><Text>M</Text></View>
								<View><Text>J</Text></View>
								<View><Text>V</Text></View>
								<View><Text>S</Text></View>
								<View><Text>D</Text></View>
							</View>
						</View>
					</View>

				)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		flex: 1 / 4,
		padding: 20,
		width: '100%',
		backgroundColor: '#0553',
	},
});