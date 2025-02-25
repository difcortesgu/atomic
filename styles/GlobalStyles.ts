import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
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
