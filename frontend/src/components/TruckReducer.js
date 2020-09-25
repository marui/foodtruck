import { createSlice } from '@reduxjs/toolkit';

import{
    FETCH_TRUCKS_BEGIN,
    FETCH_TRUCKS_SUCCESS,
    FETCH_TRUCKS_FAILURE
} from './TruckActions';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export const truck = createSlice({
    name: 'truck',
    initialState: initialState,
    reducers: {
        setExistingFiles: (state, action) => {
            const { existingFiles } = action.payload;
            state.login.existingFiles = existingFiles;
        },
        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.login.errorMessage = errorMessage;
        },
    },
});

//Thunks
export const gettrucks = () => {
    const SITE_URL = 'http://localhost:9000/trucks?address';
    return (dispatch) => {
        fetch(SITE_URL,{
            method:'GET',
            headers:{ 'Content-Type': 'application/json'},
        })
            .then(console.log('fetching ...'))
            .then((res) => {
                if(res.ok){
                    return res.json();
                }
                throw new Error('Could not fetch the existing files.');
            })
            .then(console.log('2 ...'))
            .then((json) => {
                dispatch(truck.actions.setExistingFiles({ existingFiles: json}));
            })
            .catch((err) => {
                dispatch(truck.actions.setErrorMessage({ errorMessage: err}));
            });
    };
};

export default function truckReducer(state = initialState, action) {
    switch(action.type) {
    case FETCH_TRUCKS_BEGIN:
        return {
            ...state,
            loading: true,
            error:null
        };
    case FETCH_TRUCKS_SUCCESS:
        return {
            ...state,
            loading: false,
            items: action.payload.trucks
        };
    case FETCH_TRUCKS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            items:[]
        };
    default:
        return state;
    }
}