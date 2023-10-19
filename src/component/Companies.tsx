import { useSelect } from '@mui/base'
import axios from 'axios'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { Link } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField';

import { compainesAction } from '../redux/slices/companiesSlice'
import { AppDispatch, RootState } from '../redux/store'
import { Company } from '../Type/type'
import { InputAdornment } from '@mui/material'

export default function Companies() {
  const dispatch = useDispatch<AppDispatch>()
  const url = 'https://api.github.com/organizations'
  const companiesList = useSelector((state: RootState) => state.companies.compainesList)
  const searchcompaniesList = useSelector((state: RootState) => state.companies.searchCompainesList)

  const errorMessage = useSelector((state: RootState) => state.companies.error)
  const searchKey = useSelector((state: RootState) => state.companies.searchKeyword)

  const isLoading = useSelector((state: RootState) => state.companies.loading)
  const [searchKeyword, setSearchKeyword] = useState('')
  useEffect(() => {
    function fetchCompainesData() {
      axios
        .get(url)
        .then((response) => dispatch(compainesAction.getComapnyData(response.data)))
        .catch((error) => dispatch(compainesAction.getError(error.message)))
    }
    fetchCompainesData()
  }, [])

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
  }

  function getSearchKeyword(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyword(event.target.value)
    console.log(searchKeyword)
  }

  const filterCompaines = (searchKeyword: string, companies: Company[]) => {
    if (searchKeyword != null) {
      const newCompainesList = companies.filter((company) =>
        company.login.toLocaleLowerCase().includes(searchKeyword.toLocaleLowerCase())
      )
      return newCompainesList
    }
  }
  const filteredCompanis = filterCompaines(searchKeyword, companiesList)

  const selectChange = (event: SelectChangeEvent) => {
    dispatch(compainesAction.getSelectedSort(event.target.value))
    console.log(event.target.value)
  }

  return (
    <div>
      <h1> Comapines Portal App </h1>
      {/* adding search features  */}
        <TextField
          label="Search By Name :"
          onChange={getSearchKeyword}
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">login</InputAdornment>,
          }}
        />
         {/* <input type="text" onChange={getSearchKeyword} /> */}

      {/* adding sort features  */}
      <FormControl sx={{ m: 1, minWidth: 150 }} size="medium" color="secondary">
        <InputLabel id="demo-simple-select-helper-label" color="secondary">Sort By:</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Sort"
          onChange={selectChange}
          color="secondary">
          <MenuItem value="Ascending"  color="secondary" >Ascending</MenuItem>
          <MenuItem value="Descending"  color="secondary">Descending</MenuItem>
        </Select>
      </FormControl>
      <div className="companiesContainer">
        {filteredCompanis &&
          filteredCompanis.length > 0 &&
          filteredCompanis.map((company) => (
            <ul className="companies" key={company.id}>
              <li className="company">
                <img src={company.avatar_url} alt={company.login} className="companyImg" />
                <p> Company's Name :{company.login}</p>
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
