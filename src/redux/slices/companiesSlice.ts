import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react'

import { Company, CompanyOne } from '../../Type/type'

type InitialState ={
    compainesList: Company[],
    searchCompainesList: null |Company[],
    loading : boolean ,
    error : null | string,
    searchKeyword: null | string;
}
const initialState :InitialState ={
    compainesList: [],
    loading : true ,
    error : null ,
    searchCompainesList: null,
    searchKeyword: null


}
const companiesSlice = createSlice({
    name : "companies",
    initialState: initialState,
    reducers:{
        getComapnyData: (state , action:PayloadAction<Company[]>)=> {
            state.compainesList = action.payload;
            state.loading = false;
        },
        getError: (state, action:PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        getSearchCompany : (state, action)=>{
            if( action.payload != null){
                state.compainesList = state.compainesList.filter((company)=> company.login.toLocaleLowerCase().includes( action.payload.toLocaleLowerCase()));
            }
    },

}})
export default companiesSlice.reducer
export const compainesAction = companiesSlice.actions