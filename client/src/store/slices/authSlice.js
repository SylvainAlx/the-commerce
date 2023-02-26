import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        logged:"false"
    },
    reducers: {
        setAuth: (state, action) => {
            return {
                logged: action.payload.logged
            }
        }
    }
})

export const {setAuth} = authSlice.actions

export default authSlice.reducer