import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

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

class UpdateDog extends React.Component {
  state = {
    dog: null as Dog | null,
  };

  componentDidMount() {
    console.log(this.props.params);
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

  async onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Array.from(
      document.getElementsByTagName('form')[0].getElementsByTagName('input')
    ).reduce((acc, el) => {
      acc[el.name] = el.value;
      return acc;
    }, {} as Record<string, string | number>);
    const dogImageResult = await axios.get(`https://dog.ceo/api/breeds/image/random`);
    data.image = dogImageResult.data.message;
    try {
      await axios.patch(`https://dogs.kobernyk.com/api/v1/dogs/${this.props.params.dogId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Dog updated successfully!');
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error updating dog:', error);
      alert('Failed to update the dog.');
    }
  }

  render() {
    return (
      <>
        <Link to="/">Back</Link>

        <form onSubmit={(e) => this.onSubmit(e)}>
          <label>
            Name:
            <input type="text" name="name" defaultValue={this.state.dog?.name} />
          </label>
          <br />
          <label>
            Age:
            <input type="number" name="age" defaultValue={this.state.dog?.age} />
          </label>
          <br />
          <label>
            Breed:
            <input type="text" name="breed" defaultValue={this.state.dog?.breed} />
          </label>
          <br />
          <label>
            Color:
            <input type="text" name="color" defaultValue={this.state.dog?.color} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default withParams(UpdateDog);
