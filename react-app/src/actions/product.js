import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formatData = data => ({
    ...data
})

export const fetchAll = () => dispatch => {
    api.product().fetchAll()
        .then(
            response => {
                dispatch({
                    type: ACTION_TYPES.FETCH_ALL,
                    payload:response.data
                })
            })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
   data = formatData(data) 
    api.product().create(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: response.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data= formatData(data)
    api.product().update(id,data)
        .then(res => {
            dispatch({
                type:ACTION_TYPES.UPDATE,
                payload : { id,...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const removeRecord = (id, onSuccess) => dispatch => {
    api.product().delete(id)
        .then(res => {
            dispatch({
                type:ACTION_TYPES.DELETE,
                payload : id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}