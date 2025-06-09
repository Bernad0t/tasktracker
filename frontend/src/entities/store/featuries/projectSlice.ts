import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ApiQuery from '../../../api/QueryController';
import { ProjectListAdapted } from '../../schemas/adaptedSchemas/project';
import { decodeJWT } from '../../../utils/tokenUtil';
import core from '../../../core/core';
import { Role } from '../../schemas/enums/project';
import { ProjectBaseDTO } from '../../schemas/dto/projectDTO';
import { ITypeUserSlice, UserSliceManager } from './userSlice';

interface ITypeSliceData {
    data: ProjectListAdapted[];
    selected: ProjectListAdapted | null;
}

const getProjects = createAsyncThunk('projects/getData', async () => {
    const projects: ProjectListAdapted[] = (await ApiQuery.project.getProjects()).map(proj => {
        return {
            ...proj,
            active: false,
            role:
                proj.users?.find(
                    us =>
                        us.id ===
                        decodeJWT(localStorage.getItem(core.localStorageKeys.access_token) ?? '')
                            .id,
                )?.role ?? Role.user,
        };
    });
    return projects; // возвращается с tasks = undefined
});

const deleteProject = createAsyncThunk('projects/deleteProject', async (id: number) => {
    await ApiQuery.project.deleteProject(id);
    return id;
});

const addProject = createAsyncThunk(
    // потести с новым слайсом юзера
    'projects/addProject',
    async (project: ProjectBaseDTO, thunkAPI) => {
        const thisUser = UserSliceManager.selectors.selectUser(
            thunkAPI.getState() as { userData: ITypeUserSlice },
        );
        const idProject = await ApiQuery.project.addProject(project, thisUser.id);
        const returnedProject: ProjectListAdapted = {
            ...project,
            id: idProject,
            role: Role.admin,
            active: false,
            tasks: undefined,
            users: [{ role: Role.admin, ...thisUser }],
        };
        return returnedProject;
    },
);

const updateProject = createAsyncThunk(
    'projects/updateProject',
    async (project: ProjectListAdapted) => {
        await ApiQuery.project.updateUsers(project);
        return project;
    },
);

const leaveProject = createAsyncThunk('projects/leave', async (projectId: number) => {
    await ApiQuery.project.leave(projectId);
    return projectId;
});

const uploadSelected = createAsyncThunk(
    'projects/select',
    async (project: ProjectListAdapted) => {
        const newProject: ProjectListAdapted = {
            ...(await ApiQuery.project.getSelectedProject(project.id)),
            active: true,
            role: project.role,
        };
        return newProject;
    },
);

const initialState: ITypeSliceData = {
    data: [],
    selected: null,
};

const projectSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        updateData(state, action: PayloadAction<ProjectListAdapted[]>) {
            state.data = action.payload;
        },
        selectSelected(state, action: PayloadAction<ProjectListAdapted>) {
            state.selected = action.payload;
        },
        updateSelected(state, action: PayloadAction<ProjectListAdapted>) {
            console.log("state.selected, action.payload", state.selected, action.payload)
            state.selected = action.payload;
        },
        reset(state){
            state.data = []
            state.selected = null
        }
    },
    selectors: {
        selectProjects: state => {
            return state.data;
        },
        selectProjectById: (state, projectId: number) => {
            return state.data.find(proj => proj.id === projectId);
        },
        selectSelected: state => {
            return state.selected;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getProjects.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.data = state.data.filter(proj => proj.id !== action.payload);
                if (state.selected?.id === action.payload) state.selected = null;
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.data = [action.payload, ...state.data];
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.data = state.data.map(proj =>
                    proj.id === action.payload.id ? action.payload : proj,
                );
                if (state.selected?.id === action.payload.id) state.selected = {...action.payload, tasks: state.selected.tasks};
            })
            .addCase(leaveProject.fulfilled, (state, action) => {
                state.data = state.data.filter(proj => proj.id !== action.payload);
                if (state.selected?.id === action.payload) state.selected = null;
            })
            .addCase(uploadSelected.fulfilled, (state, action) => {
                state.selected = action.payload;
            });
    },
});

export const projectSliceReducer = projectSlice.reducer;

export const ProjectSliceManager = {
    redusers: {
        updateData: projectSlice.actions.updateData,
        select: projectSlice.actions.selectSelected,
        updateSelect: projectSlice.actions.updateSelected,
        reset: projectSlice.actions.reset
    },

    selectors: {
        selectAllProjects: projectSlice.selectors.selectProjects,
        selectProjectById: projectSlice.selectors.selectProjectById,
        selectSelected: projectSlice.selectors.selectSelected,
    },

    fetching: {
        getData: getProjects,
        deleteProject: deleteProject,
        addProject: addProject,
        updateProject: updateProject,
        leaveProject: leaveProject,
        uploadSelected: uploadSelected,
    },
};
