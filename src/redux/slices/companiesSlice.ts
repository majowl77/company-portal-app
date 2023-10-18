import { createSlice } from '@reduxjs/toolkit'
import React from 'react'



const initialState ={
    compaines: [],
    loading : true ,
    error : null 
}
const Companies = createSlice({
    name : "companies",
    initialState: initialState,
    reducers:{

    }
})