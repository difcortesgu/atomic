import { View, Text, ListRenderItemInfo } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { RowMap, SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { globalStyles } from '@/styles/GlobalStyles';
import ActionButton from '@/components/ActionButton';

type Habit = {
	id: number,
	name: string,
	icon: keyof typeof FontAwesome.glyphMap,
	plant: string,
	//TODO define how to show the plants
	remainders: Date[],
	days: number[],
	allowRemainders: boolean,
	progress: Date[],
	repetitions: number,
	repetitionsLeft: number,
}

const mockHabits: Habit[] = [
	{
		id: 0,
		name: "Morning Run",
		icon: "child",
		plant: 'https://picsum.photos/200?random=1',// "Oak Tree",
		remainders: [new Date("2025-02-21T06:30:00")],
		days: [1, 3, 5],
		allowRemainders: true,
		progress: [],
		repetitions: 3,
		repetitionsLeft: 3,
	},
	{
		id: 1,
		name: "Read a Book",
		icon: "book",
		plant: 'https://picsum.photos/200?random=2',//"Sunflower",
		remainders: [new Date("2025-02-21T20:00:00")],
		days: [0, 2, 4, 6],
		allowRemainders: true,
		progress: [],
		repetitions: 2,
		repetitionsLeft: 2,
	},
	{
		id: 2,
		name: "Drink Water",
		icon: "tint",
		plant: 'https://picsum.photos/200?random=3',//"Cactus",
		remainders: [
			new Date("2025-02-21T08:00:00"),
			new Date("2025-02-21T12:00:00"),
			new Date("2025-02-21T18:00:00"),
		],
		days: [0, 1, 2, 3, 4, 5, 6],
		allowRemainders: true,
		progress: [],
		repetitions: 2,
		repetitionsLeft: 2,
	},
	{
		id: 3,
		name: "Meditation",
		icon: "hand-peace-o",
		plant: 'https://picsum.photos/200?random=4',//"Bonsai",
		remainders: [new Date("2025-02-21T07:00:00")],
		days: [1, 3, 5],
		allowRemainders: true,
		progress: [],
		repetitions: 1,
		repetitionsLeft: 1,
	},
	{
		id: 4,
		name: "Stretching",
		icon: "child",
		plant: 'https://picsum.photos/200?random=5',//"Bamboo",
		remainders: [new Date("2025-02-21T07:30:00")],
		days: [0, 2, 4, 6],
		allowRemainders: true,
		progress: [new Date("2025-02-19"),
		new Date("2025-02-20")],
		repetitions: 2,
		repetitionsLeft: 1,
	},
	{
		id: 5,
		name: "Journal Writing",
		icon: "book",
		plant: 'https://picsum.photos/200?random=6',//"Cherry Blossom",
		remainders: [new Date("2025-02-21T21:00:00")],
		days: [1, 3, 5, 6],
		allowRemainders: true,
		progress: [new Date("2025-02-18"),
		new Date("2025-02-19")],
		repetitions: 1,
		repetitionsLeft: 1,
	},
];

const mockCompletedHabits: Habit[] = [];


export default function HabitList() {
	const [pendingHabits, setPendingHabits] = useState(mockHabits);
	const [completedHabits, setCompletedHabits] = useState(mockCompletedHabits);

	const completeHabit = (data: ListRenderItemInfo<Habit>, count: number, rowMap: RowMap<Habit>) => {
		//TODO: update backend
		setPendingHabits((prevHabits) => {
			const updatedHabits = prevHabits.map((h) => {
				if (h.id === data.item.id) {
					// Create a new object to avoid mutating state
					const updatedHabit = { ...h };
					updatedHabit.progress = [...updatedHabit.progress, ...Array(count).fill(new Date())];
					updatedHabit.repetitionsLeft -= count;

					// If all repetitions are completed, move to completedHabits
					if (updatedHabit.repetitionsLeft <= 0) {
						setCompletedHabits((prevCompleted) => [...prevCompleted, updatedHabit]);
						return null; // Remove from pendingHabits
					}
					return updatedHabit;
				}
				return h;
			}).filter((habit): habit is Habit => habit !== null); // Remove completed habits (null values)
			return updatedHabits;
		});
		rowMap[data.index]?.closeRow();
	}

	const undoCompleteHabit = (data: ListRenderItemInfo<Habit>, rowMap: RowMap<Habit>) => {
		//TODO: update backend

		const updatedProgress = data.item.progress.filter((date) => date !== new Date())
		data.item.progress = updatedProgress
		data.item.repetitionsLeft -= data.item.repetitions

		setPendingHabits([...pendingHabits, data.item])
		setCompletedHabits(completedHabits.filter((habit) => habit.id !== data.item.id))
		rowMap[data.index]?.closeRow();
	}

	const addNewHabit = () => {
		// TODO: Implement add new habit
		console.log("Add New Habit")
	}

	return (
		<View style={{ flex: 1 }}>
			<Text style={globalStyles.title}>Habitos Pendientes Hoy</Text>
			<SwipeListView
				data={pendingHabits}
				keyExtractor={(_, index) => index.toString()}
				renderItem={(data, rowMap) => {
					const numberOfButtons = Math.min(3, data.item.repetitionsLeft)
					const leftOpenValue = 60 * numberOfButtons

					return (
						<SwipeRow
							leftOpenValue={leftOpenValue}
							disableLeftSwipe={true}
						>
							<View style={globalStyles.hiddenContainer}>
								<View style={globalStyles.leftActionsContainer}>
									<ActionButton
										data={data}
										action={(data: ListRenderItemInfo<Habit>) => completeHabit(data, data.item.repetitionsLeft, rowMap)}
										icon='check'
										type='suceess'
									/>
									{data.item.repetitionsLeft > 1 &&
										<>
											<ActionButton
												data={data}
												action={(data: ListRenderItemInfo<Habit>) => completeHabit(data, 1, rowMap)}
												text='+1'
												type='suceess'
											/>
											{data.item.repetitionsLeft > 2 &&
												<ActionButton
													data={data}
													action={(data: ListRenderItemInfo<Habit>) => completeHabit(data, Math.round(data.item.repetitionsLeft / 2), rowMap)}
													text={"+" + Math.round(data.item.repetitionsLeft / 2).toString()}
													type='suceess'
												/>
											}
										</>
									}
								</View>
							</View>

							<View>
								<Link href={`/(habits)/${data.item.id}`}>
									<View style={globalStyles.habitContainer}>
										<Image style={globalStyles.image} source={data.item.plant} transition={1000} />
										<View style={globalStyles.textContainer}>
											<View style={globalStyles.row}>
												<FontAwesome name={data.item.icon} size={32} color="red" />
												<Text style={globalStyles.habitName}>{data.item.name}</Text>
											</View>
										</View>
									</View>
								</Link>
							</View>
						</SwipeRow>
					)
				}}
			/>

			<Text style={globalStyles.title}>Habitos Completados Hoy</Text>
			<SwipeListView
				data={completedHabits}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item, index }) => {
					return <Link href={`/(habits)/${index}`}>
						<View style={globalStyles.habitContainer}>
							<Image style={globalStyles.image} source={item.plant} transition={1000} />
							<View style={globalStyles.textContainer}>
								<View style={globalStyles.row}>
									<FontAwesome name={item.icon} size={32} color="red" />
									<Text style={globalStyles.habitName}>{item.name}</Text>
								</View>
							</View>
						</View>
					</Link>
				}}
				renderHiddenItem={(data, rowMap) => (
					<View style={globalStyles.rightActionsContainer}>
						<ActionButton data={data.item} action={() => undoCompleteHabit(data, rowMap)} icon='undo' type='danger' />
					</View>
				)}
				disableRightSwipe={true}
				rightOpenValue={-60} // Swipe left
			/>


			<ActionButton style={globalStyles.fab} action={addNewHabit} icon='plus' type='info' />
		</View>
	);
}