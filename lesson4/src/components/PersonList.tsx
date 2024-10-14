import React from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default class PokemonList extends React.Component {
  state = {
    pokemons: []
  }

  componentDidMount() {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`)
      .then(res => {
        const pokemons = res.data.results;
        this.setState({ pokemons });
      });
  }

//   render() {
//     return (
//       <ul>
//         {
//           this.state.pokemons.map((pokemon) => 
//             <li key={pokemon.url}>{pokemon.name}</li> 
//           )
//         }
//       </ul>
//     )
//   }
// }

render() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.pokemons.map((pokemon, index) => (
            <TableRow key={index}>
              <TableCell>{pokemon.name}</TableCell>
              <TableCell>
                <Link to={`/pokemon/${pokemon.name}`}>View Details</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
}
