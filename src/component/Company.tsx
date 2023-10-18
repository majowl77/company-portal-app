import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compainesAction } from '../redux/slices/companiesSlice'
import { RootState } from '../redux/store'

export default function company() {
  let { id } = useParams()
  console.log(id)
  const url = 'https://api.github.com/organizations' + `/${id}`
  const dispatch = useDispatch()
  const companyDetails = useSelector((state: RootState) => state.companies.company)
  const loading = useSelector((state: RootState) => state.companies.loading)

  useEffect(() => {

    function fetchCompainesData() {
      axios
        .get(url)
        .then((response) => dispatch(compainesAction.getOneCompany(response.data)))
        .catch((error) => dispatch(compainesAction.getError(error.message)))
    }
    fetchCompainesData()
  }, [url, dispatch, id])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!companyDetails) {
    return <div>Company not found.</div>;
  }

  return (<div>
    <h2>company's Details</h2>
    <div className="companies">
        <div className="company"> 
        <p> Company's Login : {companyDetails.login}</p>
        <img src={companyDetails.avatar_url} className="companyImg"/> 
        <p> {companyDetails.description}</p>
        <p> Company's Type : {companyDetails.type}</p>
        <p> Company's Following : {companyDetails.following}</p>
        <p> Company's Followers : {companyDetails.followers}</p>
        <p> Company's id : {companyDetails.id}</p>
        <p> <a href={companyDetails.repos_url}> Company's url </a> </p>

        </div>
    </div>

  </div>);
}
