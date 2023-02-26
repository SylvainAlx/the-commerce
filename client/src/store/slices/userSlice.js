import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            return {
                user: action.payload
            }
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer