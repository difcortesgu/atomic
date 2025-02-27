import { View, Text, ListRenderItemInfo } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { RowMap, SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { globalStyles } from '@/styles/GlobalStyles';
import ActionButton from '@/components/ActionButton';

type Habit = {
	[x: string]: any;
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
	{
		id: 6,
		name: "Practice Guitar",
		icon: "music",
		plant: 'https://picsum.photos/200?random=7', // "Maple Tree",
		remainders: [new Date("2025-02-21T18:30:00")],
		days: [1, 3, 5],
		allowRemainders: true,
		progress: [],
		repetitions: 2,
		repetitionsLeft: 2,
	},
	{
		id: 7,
		name: "Workout",
		icon: "heartbeat",
		plant: 'https://picsum.photos/200?random=8', // "Pine Tree",
		remainders: [new Date("2025-02-21T07:00:00")],
		days: [0, 2, 4, 6],
		allowRemainders: true,
		progress: [],
		repetitions: 3,
		repetitionsLeft: 3,
	},
	{
		id: 8,
		name: "Learn a New Language",
		icon: "language",
		plant: 'https://picsum.photos/200?random=9', // "Lavender",
		remainders: [new Date("2025-02-21T19:00:00")],
		days: [1, 3, 5],
		allowRemainders: true,
		progress: [new Date("2025-02-19")],
		repetitions: 2,
		repetitionsLeft: 1,
	},
	{
		id: 9,
		name: "Cook a New Recipe",
		icon: "cutlery",
		plant: 'https://picsum.photos/200?random=10', // "Thyme",
		remainders: [new Date("2025-02-21T17:00:00")],
		days: [5, 6],
		allowRemainders: true,
		progress: [],
		repetitions: 1,
		repetitionsLeft: 1,
	},
	{
		id: 10,
		name: "Go for a Walk",
		icon: "street-view",
		plant: 'https://picsum.photos/200?random=11', // "Fern",
		remainders: [new Date("2025-02-21T16:00:00")],
		days: [0, 2, 4, 6],
		allowRemainders: true,
		progress: [],
		repetitions: 2,
		repetitionsLeft: 2,
	},
];

const mockCompletedHabits: Habit[] = [];


export default function HabitList() {
	const [pendingHabits, setPendingHabits] = useState(mockHabits);
	const [completedHabits, setCompletedHabits] = useState(mockCompletedHabits);

	const completeHabit = (data: { item: Habit, index: number }, count: number, rowMap: RowMap<Habit>) => {
		//TODO: update backend
		rowMap[`${data.item.sectionKey}-${data.index.toString()}`]?.closeRow();
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
	}

	const undoCompleteHabit = (data: { item: Habit, index: number }, rowMap: RowMap<Habit>) => {
		//TODO: update backend
		const updatedProgress = data.item.progress.filter((date) => date !== new Date())
		data.item.progress = updatedProgress
		data.item.repetitionsLeft = data.item.repetitions
		rowMap[`${data.item.sectionKey}-${data.index.toString()}`]?.closeRow();

		setPendingHabits([...pendingHabits, data.item])
		setCompletedHabits(completedHabits.filter((habit) => habit.id !== data.item.id))
	}

	const addNewHabit = () => {
		// TODO: Implement add new habit
		console.log("Add New Habit")
	}

	return (
		<View style={{ flex: 1 }}>
			<SwipeListView
				useSectionList={true} // Enable SectionList mode
				sections={[
					{ title: 'Habitos Pendientes Hoy', data: pendingHabits.map((habit, index) => ({ ...habit, sectionKey: 'pending' })) },
					{ title: 'Habitos Completados Hoy', data: completedHabits.map((habit, index) => ({ ...habit, sectionKey: 'completed' })) },
				]}
				keyExtractor={(item, index) => `${item.sectionKey}-${index.toString()}`}
				onRowOpen={(rowKey, rowMap) => {
					const [sectionKey, itemKey] = rowKey.split('-');
					const inPendingSection = sectionKey === 'pending'
					if (inPendingSection) {
						const habit = pendingHabits[parseInt(itemKey)]
						if (habit.repetitionsLeft === 1) completeHabit({ item: {...habit, sectionKey}, index: parseInt(itemKey) }, 1, rowMap)
					} else {
						const habit = completedHabits[parseInt(itemKey)]
						undoCompleteHabit({ item: {...habit, sectionKey}, index: parseInt(itemKey) }, rowMap)
					}
				}}
				renderSectionHeader={({ section: { title } }) => (
					<View style={globalStyles.sectionHeader}>
						<Text style={globalStyles.title}>{title}</Text>
					</View>
				)}
				renderItem={(data, rowMap) => {
					const numberOfButtons = Math.min(3, data.item.repetitionsLeft)
					const leftOpenValue = 60 * numberOfButtons
					const inPendingSection = data.item.sectionKey === 'pending'

					return (
						<SwipeRow
							rightOpenValue={-60}
							leftOpenValue={leftOpenValue}
							disableRightSwipe={!inPendingSection}
							disableLeftSwipe={inPendingSection}
						>
							{/* Hidden container */}
							<View style={globalStyles.hiddenContainer}>
								{inPendingSection ?
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
									:
									<View style={globalStyles.rightActionsContainer}>
										<ActionButton data={data.item} action={() => undoCompleteHabit(data, rowMap)} icon='undo' type='danger' />
									</View>
								}
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
			<ActionButton style={globalStyles.fab} action={addNewHabit} icon='plus' type='info' />
		</View>
	);
}