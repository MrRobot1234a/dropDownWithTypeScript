import classes from './SearchPanel.module.css'

export default function SearchPanel() {
    return (
        <label className={classes.label_for_input}>
            <input type="text" placeholder="Search country" />
        </label>
    )
}
