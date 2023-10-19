import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react'

import { Company, CompanyOne } from '../../Type/type'

type InitialState ={
    loading : boolean ,
    error : null | string,
    company : null | CompanyOne
}
const initialState :InitialState ={
    loading : true ,
    error : null ,
    company: null
}
const companySlice = createSlice({
    name : "companies",
    initialState: initialState,
    reducers:{
        getOneCompany: (state, action:PayloadAction<CompanyOne> )=> {
            state.company = action.payload
            state.loading = false;
        },
        getError: (state, action:PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;

        },
        resetCompanyInfo : (state)=> {
            state.loading = true;
            state.company= initialState.company
        }

    }
})
export default companySlice.reducer
export const companyAction = companySlice.actions