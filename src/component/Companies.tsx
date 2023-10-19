import { useSelect } from '@mui/base'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'

import { compainesAction } from '../redux/slices/companiesSlice'
import { AppDispatch, RootState } from '../redux/store'
import { Company } from '../Type/type'

export default function Companies() {
  const dispatch = useDispatch <AppDispatch>()
  const url = 'https://api.github.com/organizations'
  const companiesList = useSelector((state: RootState) => state.companies.compainesList);
  const searchcompaniesList = useSelector((state: RootState) => state.companies.searchCompainesList);

  const errorMessage = useSelector((state: RootState) => state.companies.error);
  const searchKey = useSelector((state: RootState) => state.companies.searchKeyword);

  const isLoading = useSelector((state: RootState) => state.companies.loading);
  const [searchKeyword,setSearchKeyword]= useState("")
  useEffect(() => {
    function fetchCompainesData() {
      axios
        .get(url)
        .then((response) => dispatch(compainesAction.getComapnyData(response.data)))
        .catch((error) => dispatch(compainesAction.getError(error.message)))
    }
    fetchCompainesData()
  }, []);


  // handling the request
  if (isLoading === true) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  // handling the failure
  if (errorMessage && companiesList.length === 0) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{errorMessage}</Alert>
      </Stack>
    )
  };

  function getSearchKeyword(event : React.ChangeEvent<HTMLInputElement>){
     setSearchKeyword(event.target.value);
     console.log(searchKeyword);
  }

const filterCompaines = (searchKeyword: string , companies: Company[])=>{
    if (searchKeyword != null){
        const newCompainesList = companies.filter((company)=> company.login.toLocaleLowerCase().includes( searchKeyword.toLocaleLowerCase()));
    return  newCompainesList;
    }
    
  }
const filteredCompanis = filterCompaines(searchKeyword, companiesList);


//   function handleSearchLogin(){
//     if (companiesList.length>0 && searchKeyword!= null ){
//         const companyLogin = companiesList.find((company)=> company.login == searchKeyword)
//         console.log(companyLogin);
//     }
    
//   }

  return (
    <div>
      <h2> Comapines </h2>
      <label> Search By Name : <input type="text" name="serachByName" onChange={getSearchKeyword} /></label>
      <div className='companiesContainer'>
        {filteredCompanis && filteredCompanis.length > 0 && filteredCompanis.map((company) => (
          <ul className="companies" key={company.id}>
            <li className="company" >
              <img src={company.avatar_url} alt={company.login} className="companyImg" />
              <p> Company's login :{company.login}</p>
              <p>Company Description: {company.description}</p>
              <p> Company's id :{company.id}</p>
              <button>
                <Link to={`companies/${company.id}`}> Company's Info </Link>
              </button>
            </li>
          </ul>
        ))}

      </div>
    </div>
  )
}
