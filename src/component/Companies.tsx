import { useSelect } from '@mui/base'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'

import { compainesAction } from '../redux/slices/companiesSlice'
import { RootState } from '../redux/store'

export default function Companies() {
  const dispatch = useDispatch()
  const url = 'https://api.github.com/organizations'
  const companiesList = useSelector((state: RootState) => state.companies.compainesList);
  const errorMessage = useSelector((state: RootState) => state.companies.error);
  const isLoading = useSelector((state: RootState) => state.companies.loading);

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
  return (
    <div>
      <h2> Comapines </h2>
      <div className='companiesContainer'>
        {companiesList.length >0 && companiesList.map((company) => (
          <ul className="companies">
            <li className="company" key={company.id}>
              <img src={company.avatar_url} alt={company.login} className="companyImg" />
              <p> Company's login :{company.login}</p>
              <p>Company Description: {company.description}</p>
              <p> Company's id :{company.id}</p>
              <button>
                <Link to={`/${company.id}`}> Company's Info </Link>
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}
