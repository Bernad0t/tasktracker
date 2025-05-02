import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import ApiQuery from "../../../api/QueryController"
import { UserDataDTO, userDataInitial } from "../../schemas/dto/userDTO"

export interface ITypeUserSlice{
    data: UserDataDTO
}

const getUserLK = createAsyncThunk( // от ключей зависит как миниму ред профиля
    'userLK/getData',
    async () => {
        const user: UserDataDTO = await ApiQuery.user.getUser()
        return user
    }
)

const initialState: ITypeUserSlice = {data: userDataInitial}

const userSlice = createSlice({
    name: "userData",
    initialState: initialState,
    reducers: {
        update(state, action: PayloadAction<UserDataDTO>){
            state.data = action.payload
        }
    },
    selectors: {
        selectUser: (state) => {
            return state.data
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getUserLK.fulfilled, (state, action) => {
            state.data = action.payload
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