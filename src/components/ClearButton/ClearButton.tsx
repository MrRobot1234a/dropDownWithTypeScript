import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/index'
import { clearList } from '../../store/countriesSlice'

import classes from './ClearButton.module.css'

export default function ClearButton() {
    const selectedCountries = useSelector((state: RootState) => state.countries.selectedCountries)
    const dispatch = useDispatch()

    return (
        <div 
            className={`${classes.clear_button} ${selectedCountries.length ? classes.no_empty : null}`}>
                <span 
                    onClick={() => dispatch(clearList())}>Clear All</span>
        </div>
    )
}
