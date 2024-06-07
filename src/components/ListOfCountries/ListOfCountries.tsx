import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/index'
import { setSelectedCountries } from '../../store/countriesSlice'

// Random key
import makeid from '../../randomKey'

import classes from './ListOfCountries.module.css'

export default function ListOfCountries() {
    // const [checked, setChecked] = useState(false)

    const dispatch = useDispatch()

    const countries = useSelector((state: RootState) => state.countries.countries)

    function toggleCheckbox(e:React.ChangeEvent<HTMLInputElement>) {
        // const idd: string = e.target.getAttribute('id')
        // e.target.setAttribute('checked', 'true')
        if (e.target.checked) {
            e.target.classList.add(classes.select_country)
        }
        console.log(e.target.checked);
    }

    return (
        <div className={classes.wrapper_for_list}>
            <div className={classes.list_of_countries}>
                {countries.map(counter => (
                    <div key={makeid(5)} className={`${classes.counter}`}>
                        <input 
                            type="checkbox" 
                            // checked={checked} 
                            id={counter.name.common}
                            onChange={(e) => toggleCheckbox(e)} /> 
                        <label 
                            htmlFor={counter.name.common}
                            onClick={() => dispatch(setSelectedCountries({name: counter.name.common, googleMap: counter.maps.googleMaps}))}>
                                <img className={classes.flag} src={counter.flags.svg} alt={counter.name.common} />
                                <div className={classes.country_name}>{counter.name.common}</div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}
