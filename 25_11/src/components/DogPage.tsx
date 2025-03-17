import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

function withParams<T extends React.ComponentType<any>>(Component: T): React.FC<any> {
  return (props: React.ComponentProps<T>) => <Component {...props} params={useParams()} />;
}

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
  image: string;
};

class DogPage extends React.Component {
  state = {
    dog: null as Dog | null,
  };

  componentDidMount() {
    axios
      .get(`https://dogs.kobernyk.com/api/v1/dogs/${this.props.params.dogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const dog = res.data;
        this.setState({ dog });
      });
  }

  handleDelete = async () => {
    try {
      await axios.delete(`https://dogs.kobernyk.com/api/v1/dogs/${this.props.params.dogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Dog deleted successfully!');
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting dog:', error);
      alert('Failed to delete the dog.');
    }
  };

  render() {
    return (
      <>
        <Link to="/">Back</Link>
        <div>
          {this.state.dog ? (
            <div>
              <h1>{this.state.dog.name}</h1>
              <img src={this.state.dog.image} alt={this.state.dog.name} />
              <div>Age: {this.state.dog.age}</div>
              <div>Breed: {this.state.dog.breed}</div>
              <div>Color: {this.state.dog.color}</div>
              <button onClick={this.handleDelete}>Delete Dog</button>
              <Link to={`/dogs/update/${this.state.dog._id}`}>
                <button>Update Dog</button>
              </Link>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </>
    );
  }
}

export default withParams(DogPage);
