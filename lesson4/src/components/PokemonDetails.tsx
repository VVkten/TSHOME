import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PokemonDetails = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setPokemon(res.data);
      })
      .catch((err) => console.error(err));
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;

  const types = pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ');

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Height (m)</TableCell>
            <TableCell>Weight (kg)</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{pokemon.name}</TableCell>
            <TableCell>{types}</TableCell>
            <TableCell>{pokemon.height / 10}</TableCell>
            <TableCell>{pokemon.weight / 10}</TableCell>
            <TableCell>{pokemon.description || 'No description available.'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonDetails;
