import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { globalStyles } from '@/styles/GlobalStyles'

type ActionButtonType = 'suceess' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

type ActionButtonProps = {
    data?: any
    action: Function
	icon: keyof typeof MaterialIcons.glyphMap
    type: ActionButtonType,
    style?: any
}

export default function ActionButton({ data, action, type, icon, style } : ActionButtonProps) {
    let backgroundColor = 'green'
    let color = 'white'
    switch (type) {
        case 'danger':
            backgroundColor = 'red'
            break
        case 'warning':
            backgroundColor = 'yellow'
            color: 'black'
            break
        case 'info':
            backgroundColor = 'blue'
            break
        case 'light':
            backgroundColor = 'white'
            color = 'black'
            break
        case 'dark':
            backgroundColor = 'black'
            break
    }

    return (
    <TouchableOpacity style={[globalStyles.actionButton, { backgroundColor }, style]} onPress={() => action(data)}>
        <MaterialIcons name={icon} size={32} color={color} />
    </TouchableOpacity>
)
}