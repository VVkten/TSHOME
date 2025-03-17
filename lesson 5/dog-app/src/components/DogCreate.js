import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DogCreate = () => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const randomImageResponse = await axios.get('https://dog.ceo/api/breeds/image/random');
        const newDog = { name, breed, image: randomImageResponse.data.message };

        await axios.post('http://localhost:5005/api/dogs', newDog); // Замініть URL на свій
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ім'я собаки"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Порода"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
            />
            <button type="submit">Додати собаку</button>
        </form>
    );
};

export default DogCreate;
