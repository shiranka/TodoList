import axios from 'axios'

export const getTasksAction = () => {
    return dispatch => {
        return axios.get('/api/tasks')
            .then(res => dispatch({
                type: 'GET_TASKS',
                payload: res.data
            })            
        ).catch(err => (console.log(err)))
        
    }
}

export const addTaskAction = (task) => {
    return dispatch => {
        return axios.post('/api/tasks', task)
            .then(res => dispatch({
                type: 'ADD_TASK',
                payload: res.data
            })        
        )
    }
}

export const setCoordinateAction = (coordinate) => ({
        type: 'SET_COORDINATE',
        payload: coordinate
    })


export const deleteTaskAction = (id) =>{
    return dispatch => {
        return axios.delete(`/api/tasks/${id}`)
            .then(res => dispatch({
                type: 'DELETE_TASK',
                payload: id
            })     
        )
    }
}


export const changeStatusAction = (taskToChange) => {
    return dispatch => {
        return axios.patch(`/api/tasks/update`, taskToChange)
            .then(res => dispatch({
                type: 'CHANGE_STATUS',
                payload: taskToChange._id
            })
        )
    }
}

export const deleteCheckedTasksAction = () => {
    return dispatch => {
        return axios.get(`/api/tasks/deleteChecked`)
            .then(res => dispatch({
                type: 'DELETE_CHECKED_TASKS'
            })    
        )
    }
} 

export const changeIsHideListFlagAction = () =>({
    type: 'IS_HIDE_TASKS_LIST'
})

export const changeIsHideTableFlagAction = () =>({
    type: 'IS_HIDE_TASKS_TABLE'
})