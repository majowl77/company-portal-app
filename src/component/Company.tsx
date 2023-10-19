import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

import { companyAction } from '../redux/slices/companySlice'
import { RootState } from '../redux/store'

export default function company() {
  let { id } = useParams()
  console.log(id)
  const url = 'https://api.github.com/organizations' + `/${id}`
  const dispatch = useDispatch()
  const companyDetails = useSelector((state: RootState) => state.companyR.company)
  const isLoading = useSelector((state: RootState) => state.companyR.loading)
  const errorMessage = useSelector((state: RootState) => state.companyR.error)

  useEffect(() => {
    function fetchCompainesData() {
      axios
        .get(url)
        .then((response) => dispatch(companyAction.getOneCompany(response.data)))
        .catch((error) => dispatch(companyAction.getError(error.message)))
    }
    fetchCompainesData()
  }, [url, dispatch, id])

  // handling the request
  if (isLoading === true) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }
  // handling the failure
  if (errorMessage && !companyDetails) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{errorMessage}, Company not found.</Alert>
      </Stack>
    )
  }
  function handleBack() {
    dispatch(companyAction.resetCompanyInfo())
  }
  return (
    <div>
      {companyDetails != null && 
        <div>
          <button onClick={handleBack}>

            <Link to={'/'}>Back to Previous page </Link>
          </button>
          <h2>company's Details</h2>
          <div className="companies">
            <div className="company">
              <p> Company's Login : {companyDetails.login}</p>
              <img src={companyDetails.avatar_url} className="companyImg" />
              <p> {companyDetails.description}</p>
              <p> Company's Type : {companyDetails.type}</p>
              <p> Company's Following : {companyDetails.following}</p>
              <p> Company's Followers : {companyDetails.followers}</p>
              <p> Company's id : {companyDetails.id}</p>
              <p>
                <a href={companyDetails.repos_url}> Company's url </a>
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
