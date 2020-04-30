export const addTaskAction = (task) => ({
    type: 'ADD_TASK',
    payload: task
})

export const deleteTaskAction = (id) => ({
    type: 'DELETE_TASK',
    payload: id
})

export const changeStatusAction = (id) => ({
    type: 'CHANGE_STATUS',
    payload: id
})

export const deleteCheckedTasksAction = () => ({
    type: 'DELETE_CHECKED_TASKS'
})

export const changeIsHideFlagAction = () =>({
    type: 'IS_HIDE_TASKS'
})