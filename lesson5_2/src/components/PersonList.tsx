import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import axios from 'axios';

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  image: string; 
}

export default class DogList extends React.Component {
  state = {
    dogs: [] as Dog[]
  }

  componentDidMount() {
    this.fetchDogs(); 
  }

  fetchDogs = () => {
    axios.get(`https://dogs.kobernyk.com/api/v1/dogs`)
      .then(res => {
        const dogs = res.data;
        this.setState({ dogs });
      });
  }

  handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this dog?')) {
      axios.delete(`https://dogs.kobernyk.com/api/v1/dogs/${id}`)
        .then(() => {
          this.fetchDogs(); 
        })
        .catch(error => {
          console.error('There was an error deleting the dog!', error);
        });
    }
  }

  render() {
    return (
      <>
        <Link to="/create">Create Dog</Link>
        <ul>
          {
            this.state.dogs.map(dog => (
              <li key={dog._id}>
                <Link to={`/${dog._id}`}>
                  <Avatar
                    alt={dog.name}
                    src={dog.image}
                    sx={{ width: 80, height: 80 }}
                  />
                  {dog.name}
                </Link>
                <Link to={`/update/${dog._id}`} style={{ marginLeft: '10px' }}>
                  Edit
                </Link>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.handleDelete(dog._id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              </li>
            ))
          }
        </ul>
      </>
    );
  }
}
