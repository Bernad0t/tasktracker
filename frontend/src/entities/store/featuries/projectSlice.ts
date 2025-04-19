import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiQuery from "../../../api/QueryController";
import { ProjectListAdapted } from "../../schemas/adaptedSchemas/project";

const getProjects = createAsyncThunk(
    'projects/getData',
    async () => {
        const projects: ProjectListAdapted[] = (await ApiQuery.project.getProjects()).map(proj => {return {...proj, active: false}})
        return projects
    }
)

const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (id: number) => {
        await ApiQuery.project.deleteProject(id)
        return id
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
        selectProjectById: (state, action) => {
            return state.find(proj => proj.id === action.payload)
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getProjects.fulfilled, (state, action) => {
            state = action.payload
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
            state = state.filter(proj => proj.id !== action.payload)
        })
    }
})

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
        deleteProject: deleteProject
    }
}