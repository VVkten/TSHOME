import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
}

export default class PersonList extends React.Component {
  state = {
    persons: [] as Dog[]
  }

  componentDidMount() {
    axios.get(`https://dogs.kobernyk.com/api/v1/dogs`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <Link to={`/${person._id}`} key={person._id}>
                <li>{person.name}</li>
              </Link>
            )
        }
      </ul>
    )
  }
}