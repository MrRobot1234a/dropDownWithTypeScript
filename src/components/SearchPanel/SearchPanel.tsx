import { useDispatch } from 'react-redux'
import { searchCountry } from '../../store/countriesSlice'

import { useState } from 'react'

import classes from './SearchPanel.module.css'

export default function SearchPanel() {
    const dispatch = useDispatch()

    const [template, setTemplate] = useState<string>('')

    const changeState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTemplate(e.target.value)
        dispatch(searchCountry({ template: e.target.value }))
    }

    return (
        <label className={classes.label_for_input}>
            <input 
                type="text" 
                placeholder="Search country"
                value={template}
                onChange={(e) => changeState(e)}
             />
        </label>
    )
}
