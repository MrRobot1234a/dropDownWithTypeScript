import { createSlice } from '@reduxjs/toolkit'

import { structureCountry, selected } from '../interfaces'

const countries: structureCountry[] = []
const selectedCountries: selected[] = []

type actionType = {
    payload: {
        [key: string]: structureCountry[]
    }
}

type actionTypeForSelectedCountries = {
    payload: {
        name: string,
        googleMap: string 
    }
}

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countries: countries,
        selectedCountries: selectedCountries
    },
    reducers: {
        setCountries(state, action: actionType) {
            const { countries } = action.payload

            const forSort: string[] = []
            countries.forEach(item => {
                forSort.push(item.name.common)
            })
            forSort.sort((a, b) => a.localeCompare(b))

            const newCountries: structureCountry[] = forSort.map((item) => {
                for (let i = 0; i < countries.length; i++) {
                    if (countries[i].name.common == item) {
                        return countries[i]
                    }
                }
            }) as structureCountry[]

            state.countries.splice(0, state.countries.length)
            newCountries.forEach(item => state.countries.push(item))
        },
        setSelectedCountries(state, action: actionTypeForSelectedCountries) {
            state.selectedCountries.push(action.payload)
        },
        clearList(state) {
            state.selectedCountries.splice(0, state.selectedCountries.length)
        }
    }
})

export const {
    setCountries,
    setSelectedCountries,
    clearList
} = countriesSlice.actions
export default countriesSlice.reducer
