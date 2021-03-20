import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as PeopleStore from '../store/People';

// At runtime, Redux will merge together...
type PeopleProps =
    PeopleStore.PeopleState // ... state we've requested from the Redux store
    & typeof PeopleStore.actionCreators; // ... plus action creators we've requested


const People = (props: PeopleProps) => {

//class People extends React.PureComponent<PeopleProps> {

    const [username, setUsername] = useState('');
    const [valid, setValid] = useState(false);

    const nameChange = (name: string) => {
        setUsername(name)
        setValid(name !== '')
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        let person: PeopleStore.Person = {
            name: username,
            age: 10
        }

        props.addPerson(person)
    }

    const renderForm = () => {
        return (
        <form className="joinForm" onSubmit={handleSubmit}>
            <label>
                Name:
          <input type="text" value={username} onChange={e => nameChange(e.target.value)} />
            </label>
            <input type="submit" value="Join" disabled={!valid} />
            </form>
        )
    }

    const renderPeople = () => {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>age</th>
                    </tr>
                </thead>
                <tbody>
                    {props.people.map((person: PeopleStore.Person) =>
                        <tr key={person.name}>
                            <td>{person.name}</td>
                            <td>{person.age}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

  //public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">People</h1>
        <p>This is the people</p>
        {renderPeople()}
        {renderForm()}
      </React.Fragment>
    )
  //}

    
}

export default connect(
  (state: ApplicationState) => state.people, // Selects which state properties are merged into the component's props
  PeopleStore.actionCreators // Selects which action creators are merged into the component's props
)(People as any); // eslint-disable-line @typescript-eslint/no-explicit-any
