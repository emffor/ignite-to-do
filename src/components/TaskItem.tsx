import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Task } from '../components/TasksList';
import { EditTaskArgs } from '../pages/Home'

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';

interface TaskItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId, newTitle }: EditTaskArgs) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setEditValue(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask({ taskId: task.id, newTitle: editValue });
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                // testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
            >
                <View
                    // testID={`marker-${index}`}
                    style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                    {task.done && (
                        <Icon
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                    )}
                </View>

                <TextInput
                    value={editValue}
                    onChangeText={setEditValue}
                    editable={isEditing}
                    onSubmitEditing={handleSubmitEditing}
                    style={task.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                {isEditing ? (
                    <TouchableOpacity
                        // testID={`trash-${index}`}
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        // testID={`trash-${index}`}
                        onPress={handleStartEditing}
                    >
                        <Icon name="edit-2" size={16} color="#b2b2b2" />
                    </TouchableOpacity>
                )}

                <View
                    style={styles.iconsDivider}
                />

                <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24,
    },
    iconsDivider: {
        width: 1,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12,
    }
})