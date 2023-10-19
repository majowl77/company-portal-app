import './App.css'
import Companies from './component/Companies'
import { Route, Routes } from 'react-router-dom'
import Company from './component/Company'

function App() {

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Companies />}/>
      <Route path="/companies/:id" element={<Company />}/>
           {/* <Route path="me" element={<Company />} /> */}
    </Routes>      
    </div>
  )
}

export default App