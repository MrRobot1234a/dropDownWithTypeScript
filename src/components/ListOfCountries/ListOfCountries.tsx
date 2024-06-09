import { useSelector, useDispatch } from 'react-redux'
import { clearNameCountry, setSelectedCountries } from '../../store/countriesSlice'
import { RootState } from '../../store/index'

import ItemCounty from '../ItemCounty/ItemCounty'

// Random key
import makeid from '../../randomKey'

import classes from './ListOfCountries.module.css'
import { structureCountry } from '../../interfaces'

export default function ListOfCountries() {
    const countries = useSelector((state: RootState) => state.countries.countries)
    const template = useSelector((state: RootState) => state.countries.template)
    const selectedCountries = useSelector((state: RootState) => state.countries.selectedCountries)
    const clearAll = useSelector((state: RootState) => state.countries.clearAll)
    const dispatch = useDispatch()

    function toggleCheckbox(e:React.ChangeEvent<HTMLInputElement>, nameCountry: string, googleMap: string) {
        // debugger
        if (e.target.checked) {
            e.target.parentElement!.classList.add(classes.select_country)
            dispatch(setSelectedCountries({ name: nameCountry, googleMap }))
        } else {
            e.target.parentElement!.classList.remove(classes.select_country)
            dispatch(clearNameCountry({nameCountry}))
        }
    }

    function renderListCountries(filteredCountries: structureCountry[]): JSX.Element[] {
        return filteredCountries.map(item => {
            if (selectedCountries.some(nameCountry => nameCountry.name === item.name.common)) {
                return (
                    <ItemCounty 
                        key={makeid(4)}
                        counter={item}
                        activeClassName={classes.select_country}
                        checked={true}
                        toggleCheckbox={toggleCheckbox}
                    /> 
                )
            } else {
                return (
                    <ItemCounty 
                        key={makeid(4)}
                        counter={item}
                        activeClassName={''}
                        checked={false}
                        toggleCheckbox={toggleCheckbox}
                    /> 
                )
            }
        })
    }

    function renderListOfCountries(): JSX.Element[] {
        if (template) {
            const filteredCountries = countries.filter(item => item.name.common.indexOf(template) > -1)
            return renderListCountries(filteredCountries)
        } else {
            return renderListCountries(countries)
        }
    }

    return (
        <div className={classes.wrapper_for_list}>
            <div className={classes.list_of_countries}>
                {renderListOfCountries()}
            </div>
        </div>
    )
}
