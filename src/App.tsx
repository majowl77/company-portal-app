import { useDispatch, useSelector } from 'react-redux'
import { Button, Box, Grid, Typography } from '@mui/material'

import { RootState } from './redux/store'
import './App.css'
import Companies from './component/Companies'

function App() {
  // const count = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <Companies />
    </div>
  )
}

export default App