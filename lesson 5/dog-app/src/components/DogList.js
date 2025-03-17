import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DogList = () => {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        const fetchDogs = async () => {
            const response = await axios.get('http://localhost:5005/api/v1/dogs'); 
            setDogs(response.data);
        };

        fetchDogs();
    }, []);

    return (
        <div>
            <h1>Список собак</h1>
            <Link to="/create">Додати собаку</Link>
            <ul>
                {dogs.map(dog => (
                    <li key={dog._id}>
                        <Link to={`/${dog._id}`}>{dog.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DogList;
