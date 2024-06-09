import { structureCountry } from '../../interfaces'

import classes from './ItemCounty.module.css'

type propsType = {
    counter: structureCountry
    activeClassName: string,
    checked: boolean
    toggleCheckbox: (e:React.ChangeEvent<HTMLInputElement>, nameCountry: string, googleMap: string) => void 
}

const ItemCounty = ({ counter, activeClassName, checked, toggleCheckbox }: propsType) => {

    const isActive = activeClassName ? classes.select_country : null

    return (
        <div className={`${classes.counter} ${isActive}`}>
            <input
            checked={checked}
                type="checkbox" 
                id={counter.name.common}
                onChange={(e) => toggleCheckbox(e, counter.name.common, counter.maps.googleMaps)} /> 
            <label 
                htmlFor={counter.name.common}
                >
                    <img className={classes.flag} src={counter.flags.svg} alt={counter.name.common} />
                    <div className={classes.country_name}>{counter.name.common}</div>
            </label>
        </div>
    )
}

export default ItemCounty
