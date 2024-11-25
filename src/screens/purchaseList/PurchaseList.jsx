import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/purchases/`);
        setPurchases(response.data);
      } catch (error) {
        console.error('Error al obtener las compras:', error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mis Compras
      </Typography>
      <List>
        {purchases.length > 0 ? (
          purchases.map((purchase) => (
            <React.Fragment key={purchase.id}>
              <ListItem button component={Link} to={`/purchase/${purchase.id}`}>
                <ListItemText
                  primary={`Orden #${purchase.id}`}
                  secondary={`Fecha: ${new Date(purchase.date).toLocaleDateString()} - Total: $${purchase.total.toFixed(2)}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography>No se encontraron compras.</Typography>
        )}
      </List>
    </Container>
  );
};

export default PurchaseList;
