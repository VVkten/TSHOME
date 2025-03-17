import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const DogDetails = () => {
    const { id } = useParams();
    const [dog, setDog] = useState(null);

    useEffect(() => {
        const fetchDog = async () => {
            const response = await axios.get(`http://localhost:5005/api/v1/dogs/${id}`);
            setDog(response.data);
        };

        fetchDog();
    }, [id]);

    if (!dog) return <div>pam pam...</div>;

    return (
        <div>
            <h1>{dog.name}</h1>
            <img src={dog.image} alt={dog.name} />
            <p>Порода: {dog.breed}</p>
            <Link to={`/update/${dog._id}`}>Редагувати</Link>
            <Link to="/">Назад до списку</Link>
        </div>
    );
};

export default DogDetails;
