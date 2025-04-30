import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiQuery from "../../../api/QueryController";
import { ProjectListAdapted } from "../../schemas/adaptedSchemas/project";
import { decodeJWT } from "../../../utils/tokenUtil";
import core from "../../../core/core";
import { Role } from "../../schemas/enums/project";
import { ProjectBaseDTO } from "../../schemas/dto/projectDTO";
import { UserSliceManager } from "./userSlice";
import { UserDataDTO } from "../../schemas/dto/userDTO";

const getProjects = createAsyncThunk(
    'projects/getData',
    async () => {
        const projects: ProjectListAdapted[] = (await ApiQuery.project.getProjects()).map(proj => {return {
            ...proj, 
            active: false,
            role: proj.users?.find(
                us => us.id === decodeJWT(localStorage.getItem(core.localStorageKeys.access_token)??"").id
            )?.role ?? Role.user
        }})
        return projects // возвращается с tasks = undefined, которые подгружаются в окне проекта и сохраняются в стейте, таким образом кешируясь
    }
) 

const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (id: number) => {
        await ApiQuery.project.deleteProject(id)
        return id
    }
)

const addProject = createAsyncThunk(
    'projects/addProject',
    async (project: ProjectBaseDTO, thunkAPI) => {
        const thisUser = UserSliceManager.selectors.selectUser(thunkAPI.getState() as {userData: UserDataDTO}) 
        const idProject = await ApiQuery.project.addProject(project, thisUser.id)
        const returnedProject: ProjectListAdapted = {
            ...project, 
            id: idProject, 
            role: Role.admin, 
            active: false, 
            tasks: undefined, 
            users: [{role: Role.admin, ...thisUser}]
        }
        return returnedProject
    }
)

const updateProject = createAsyncThunk(
    'projects/updateProject',
    async (project: ProjectListAdapted) => {
        await ApiQuery.project.updateUsers(project)
        return project
    }
)

const initialState: ProjectListAdapted[] = []

const projectSlice = createSlice({
    name: "projects",
    initialState: initialState,
    reducers: {
        
    },
    selectors: {
        selectProjects: (state) => {
            return state
        },
        selectProjectById: (state, projectId: number) => {
            return state.find(proj => proj.id === projectId)
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getProjects.fulfilled, (state, action) => {
            return action.payload
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
            return state.filter(proj => proj.id !== action.payload)
        })
        .addCase(addProject.fulfilled, (state, action) => {
            return [action.payload, ...state]
        })
        .addCase(updateProject.fulfilled, (state, action) => {
            return state.map(proj => proj.id === action.payload.id ? action.payload : proj)
        })
    }
})

// const selectProjectById = (state: RootState, projectId: number) => state.projects.find(proj => proj.id === projectId)

export const projectSliceReducer = projectSlice.reducer

export const ProjectSliceManager = {
    redusers: {

    },

    selectors: {
        selectAllProjects: projectSlice.selectors.selectProjects,
        selectProjectById: projectSlice.selectors.selectProjectById
    },

    fetching: {
        getData: getProjects,
        deleteProject: deleteProject,
        addProject: addProject,
        updateProject: updateProject
    }
}