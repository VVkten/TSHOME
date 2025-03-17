// src/components/CreateDog.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

const CreateDog: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | string>('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const newDog = { name, age, breed, color, image };

    axios.post(`https://dogs.kobernyk.com/api/v1/dogs`, newDog)
      .then(() => {
        navigate('/'); 
      })
      .catch(error => {
        console.error('There was an error creating the dog!', error);
      });
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
        Create Dog
      </Button>
    </form>
  );
};

export default CreateDog;
