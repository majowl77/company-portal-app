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
       getSelectedSort: (state , action:PayloadAction<string>)=>{
        if (action.payload === "Ascending"){
            state.compainesList.sort((Company1, Company2) => {
                const CompanyOne = Company1.login.toUpperCase(); 
                const Companytwo = Company2.login.toUpperCase();
                if (CompanyOne < Companytwo) {
                  return -1;
                }
                if (CompanyOne > Companytwo) {
                  return 1;
                }
                
                return 0;
              });
        }else if (action.payload === "Descending"){
            state.compainesList.sort((Company1, Company2) => {
                const CompanyOne = Company1.login.toUpperCase(); 
                const Companytwo = Company2.login.toUpperCase(); 
                if (CompanyOne >Companytwo) {
                  return -1;
                }
                if (CompanyOne < Companytwo) {
                  return 1;
                }
               
                return 0;
              });
        }

       }

}})
export default companiesSlice.reducer
export const compainesAction = companiesSlice.actions