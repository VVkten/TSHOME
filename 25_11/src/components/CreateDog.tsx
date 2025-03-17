import React from 'react';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';

type Dog = {
  _id: string;
  name: string;
  age: number;
  breed: string;
  color: string;
}

export default class CreateDog extends React.Component {
  state = {
    persons: [] as Dog[]
  }

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
  }

  onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Array.from(
      document.getElementsByTagName('form')[0].getElementsByTagName('input')
    ).reduce((acc, el) => { 
      acc[el.name] = el.value; 
      return acc;
    }, {} as Record<string, string | number>);

    const dogImageResult = await axios.get(`https://dog.ceo/api/breeds/image/random`);
    data.image = dogImageResult.data.message;

    await axios.post(`https://dogs.kobernyk.com/api/v1/dogs`, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    window.location.href = '/'; // Пряма переадресація
  }

  render() {
    return (
      <>
        <Link to='/'>Back</Link>

        <form onSubmit={this.onSubmit}>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <br/>
          <label>
            Age:
            <input type="number" name="age" />
          </label>
          <br/>
          <label>
            Breed:
            <input type="text" name="breed" />
          </label>
          <br/>
          <label>
            Color:
            <input type="text" name="color" />
          </label>
          <br/>
          <button type="submit">Submit</button>
        </form>
      </>
    )
  }
}
