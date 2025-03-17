import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
};

export default class PersonList extends React.Component {
  state = {
    persons: [] as Dog[],
    error: '' 
  };

  componentDidMount() {
    axios.get(`https://dogs.kobernyk.com/api/v1/dogs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })
    .catch(err => {
      this.setState({ error: err.response?.data?.message || 'Error fetching dogs' });
    });
  }

  render() {
    return (
      <>
        <Link to="/create">Create a Dog</Link>
        <h2>Dog List</h2>
        {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
        <ul>
          {this.state.persons.map(person => (
            <Link to={`/${person._id}`} key={person._id}>
              <li>{person.name}</li>
            </Link>
          ))}
        </ul>
      </>
    );
  }
}
