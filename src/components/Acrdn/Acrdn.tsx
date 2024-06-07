import { useSelector } from 'react-redux'
import { RootState } from '../../store/index'

// Random key
import makeid from '../../randomKey'

import Accordion from 'react-bootstrap/Accordion';

import classes from './Acrdn.module.css'
import './BsAcrdn.css'

export default function Acrdn() {

  const selectedCountries = useSelector((state: RootState) => state.countries.selectedCountries)

  function listCountries(): string[] | string {
    if (selectedCountries.length !== 0) {
      
      return selectedCountries.map((item, i) => {
        if (selectedCountries.length > 1) {
          if (i === selectedCountries.length - 1) {
            return `${item.name}`
          } else {
            return `${item.name}, `
          }
        } else {
          return `${item.name}`
        }
      })
    } else {
      return 'Any'
    }
  }

  return (
    <Accordion alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {selectedCountries.length !== 0 && <span className={classes.counter}>{selectedCountries.length}</span> }
          <span className={classes.country}>Country</span>
          <span className={classes.pruning}>{listCountries()}</span>
        </Accordion.Header>
        <Accordion.Body>
          <ul className='list-group'>
            {selectedCountries.map(item => (
              <li key={makeid(4)} className='list-group-item'><a target="_blank" href={item.googleMap}>{item.name}</a></li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}