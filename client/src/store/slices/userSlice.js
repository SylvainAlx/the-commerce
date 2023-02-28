import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: "",
        isAdmin: false
    },
    reducers: {
        setUser: (state, action) => {
            return {
                email: action.payload.email,
                isAdmin: action.payload.isAdmin
            }
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer