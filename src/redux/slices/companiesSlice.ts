import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

import { Company, CompanyOne } from '../../Type/type'

type InitialState ={
    compainesList: Company[],
    loading : boolean ,
    error : null | string,
    company : CompanyOne
}
const initialState :InitialState ={
    compainesList: [],
    loading : true ,
    error : null ,
    company: {
        login: "string",
        id: 99,
        url: "string",
        repos_url: "string",
        events_url: "string",
        avatar_url: "string",
        description: null,
        is_verified: true,
        followers: 99,
        following: 99,
        type: "string",
    }
}
const companiesSlice = createSlice({
    name : "companies",
    initialState: initialState,
    reducers:{
        getComapnyData: (state , action)=> {
            state.compainesList = action.payload;
            state.loading = false;
        },
        getError: (state, action) => {
            state.error = action.payload;
            state.loading = false;

        },
        getOneCompany: (state, action )=> {
            state.company = action.payload
            state.loading = false;
        }
    }
})
export default companiesSlice.reducer
export const compainesAction = companiesSlice.actions