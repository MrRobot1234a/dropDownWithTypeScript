import { createSlice, current } from '@reduxjs/toolkit'

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

type actionClearNameCountry = {
    payload: {
        nameCountry: string
    }
}

type actionSearchCountry = {
    payload: {
        template: string
    }
}

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countries: countries,
        selectedCountries: selectedCountries,
        template: '' as string,
        clearAll: 0 as number
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
            const { name } = action.payload
            if (current(state.selectedCountries).length === 0) {
                state.selectedCountries.push(action.payload)
            } else {
                let has: number = 0
                current(state.selectedCountries).forEach(item => {
                    if (item.name == name) {
                        has = 1
                    }
                })
                if (!has) {
                    state.selectedCountries.push(action.payload)
                }
            }
        },
        clearList(state) {
            state.selectedCountries.splice(0, state.selectedCountries.length)
            state.clearAll++
        },
        clearNameCountry(state, action: actionClearNameCountry) {
            const { nameCountry } = action.payload

            const copyState = structuredClone(current(state.selectedCountries))

            copyState.forEach((item, i) => {
                if (item.name.indexOf(nameCountry) > -1) {
                    state.selectedCountries.splice(i, 1)
                    return
                }
            })
        },
        searchCountry(state, action: actionSearchCountry) {
            const { template } = action.payload
            state.template = template
        }
    }
})

export const {
    setCountries,
    setSelectedCountries,
    clearList,
    clearNameCountry,
    searchCountry
} = countriesSlice.actions
export default countriesSlice.reducer
