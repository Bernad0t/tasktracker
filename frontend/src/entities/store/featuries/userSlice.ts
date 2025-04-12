import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import ApiQuery from "../../../api/QueryController"
import { UserDataDTO, userDataInitial } from "../../schemas/dto/userDTO"

const getUserLK = createAsyncThunk( // от ключей зависит как миниму ред профиля
    'userLK/getData',
    async () => {
        const user = await ApiQuery.getUser()
        return user
    }
)

const userSlice = createSlice({
    name: "userData",
    initialState: userDataInitial,
    reducers: {
        update(state, action: PayloadAction<UserDataDTO>){
            return action.payload
        }
    },
    selectors: {
        selectUser: (state) => {
            return state
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getUserLK.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const userSliceReducer = userSlice.reducer

export const UserSliceManager = {
    redusers: {
        update: userSlice.actions.update
    },

    selectors: {
        selectUser: userSlice.selectors.selectUser
    },

    fetching: {
        getData: getUserLK
    }
}