import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const FrequentAsks = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/faq/`);
        setState(response.data);
      } catch (error) {
        toast.error('Error al cargar las preguntas frecuentes');
      } finally {
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, []);

  return (
    <div className="frequent-asks-container">
      <Typography variant="h4" className="frequent-asks-title">Preguntas Frecuentes</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List className="frequent-asks-list">
          {state.map((item, index) => (
            <ListItem key={index} className="frequent-asks-list-item">
              <Link
                className="frequent-asks-link"
                to={`/faq/${item.id}`}
                underline="hover"
              >
                <Typography variant="body1">{item.title}</Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default FrequentAsks;
