import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { setCountries } from './store/countriesSlice'

import axios from 'axios'
import { structureCountry } from './interfaces'

import Acrdn from './components/Acrdn/Acrdn'
import SearchPanel from './components/SearchPanel/SearchPanel'
import ListOfCountries from './components/ListOfCountries/ListOfCountries'
import ClearButton from './components/ClearButton/ClearButton'

import classes from './App.module.css'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    axios
        .get<structureCountry[]>('../public/countries/all.json')
        .then(response => {
            dispatch(setCountries({countries: response.data}))
        })
  }, [])

  return (
    <div className="container">
      <div className={classes.wrapper}>
        <Acrdn />
        <SearchPanel />
        <ListOfCountries />
        <ClearButton />
      </div>
    </div>
  )
}

export default App
