import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
import { TextField, Button } from '@mui/material';

const UpdateDog: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | string>('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const response = await axios.get(`https://dogs.kobernyk.com/api/v1/dogs/${id}`);
        const dog = response.data;
        setName(dog.name);
        setAge(dog.age);
        setBreed(dog.breed);
        setColor(dog.color);
        setImage(dog.image);
      } catch (error) {
        console.error('There was an error fetching the dog!', error);
      }
    };

    fetchDog();
  }, [id]); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedDog = { name, age, breed, color, image };

    try {
      await axios.put(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, updatedDog);
      navigate('/');
    } catch (error) {
      console.error('There was an error updating the dog!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Breed"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Update Dog
      </Button>
    </form>
  );
};

export default UpdateDog;
