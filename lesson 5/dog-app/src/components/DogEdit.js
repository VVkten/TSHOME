import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DogEdit = () => {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDog = async () => {
            const response = await axios.get(`http://localhost:5005/api/dogs/${id}`); // Замініть URL на свій
            setDog(response.data);
            setName(response.data.name);
            setBreed(response.data.breed);
        };

        fetchDog();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5005/api/dogs/${id}`, { name, breed }); // Замініть URL на свій
        navigate(`/${id}`);
    };

    if (!dog) return <div>Завантаження...</div>;

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
            <button type="submit">Зберегти зміни</button>
        </form>
    );
};

export default DogEdit;
