import { useState } from 'react'
import './App.css'
import HeaderLogos from './components/HeaderLogos'
import DataFetcher from './components/DataFetcher'
import Form from './components/Form'
import SearchBar from './components/SearchBar'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    {/* <HeaderLogos /> */}
    {/* <DataFetcher /> */}
    <br></br>
    <Form />
    <br></br>
    <SearchBar />
    </>
  )
}

export default App
