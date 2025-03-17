import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setDogs, setLoading, setError } from '../store/dogSlice';
import Button from '@mui/material/Button';
import useLocalStorage from "../effects/useLocalStorage";


const Main = () => {
  const dispatch = useDispatch();
  const { dogs, loading, error } = useSelector((state: any) => state.dogs);
  const [token, setToken] = useLocalStorage('token', '');
  const navigate = useNavigate();

  const logout = () => {
    setToken('');
    navigate('/login');
  };

  const getDogs = () => {
    if (!token) {
      return;
    }
    dispatch(setLoading(true)); // Позначаємо, що дані завантажуються
    axios.get(`https://dogs.kobernyk.com/api/v1/dogs?limit=5`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(response => {
        dispatch(setDogs(response.data)); // Завантажуємо дані в Redux
        console.log(response.data);
      })
      .catch(() => {
        dispatch(setError("Не вдалося завантажити дані"));
        logout(); // Перенаправляємо на логін у разі помилки
      })
      .finally(() => {
        dispatch(setLoading(false)); // Завантаження завершено
      });
  };

  useEffect(() => {
    getDogs();
  }, []);

  if (!token) {
    return (
      <>
        <Link to="/login">Авторизуватися</Link>
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      Ви авторизовані<br />
      <Button variant="contained" onClick={logout}>Вийти</Button>
      <br />
      {dogs.map(dog => (
        <Card key={dog._id} sx={{ maxWidth: 345, marginBottom: 2 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={dog.image}
            title={dog.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {dog.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Колір: {dog.color}<br />
              Порода: {dog.breed}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/${dog._id}`}>Деталі</Link>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default Main;
