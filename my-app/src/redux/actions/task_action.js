
export const addTaskAction = (task) => ({
    type: 'ADD_TASK',
    payload: task
})

export const deleteTaskAction = (id) => ({
    type: 'DELETE_TASK',
    payload: id
})
