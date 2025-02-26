import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { globalStyles } from '@/styles/GlobalStyles'

type ActionButtonType = 'suceess' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

type ActionButtonProps = {
    data?: any
    action: Function
    icon?: keyof typeof FontAwesome.glyphMap,
    text?: string,
    type: ActionButtonType,
    style?: any
}

export default function ActionButton({ data, action, type, icon, text, style }: ActionButtonProps) {
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
            {icon &&
                <FontAwesome name={icon} size={32} color={color} />
            }
            {text &&
                <Text style={{ color }}>{text}</Text>
            }
        </TouchableOpacity>
    )
}