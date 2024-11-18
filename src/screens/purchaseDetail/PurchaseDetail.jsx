import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import axios from 'axios';

const PurchaseDetail = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    const fetchPurchaseDetail = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/purchases/${id}`);
        setPurchase(response.data);
      } catch (error) {
        console.error('Error al obtener el detalle de la compra:', error);
      }
    };

    fetchPurchaseDetail();
  }, [id]);

  if (!purchase) {
    return <Typography>Cargando detalle de la compra...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Detalle de la Compra #{purchase.id}
      </Typography>
      <Typography>Fecha: {new Date(purchase.date).toLocaleDateString()}</Typography>
      <Typography>Total: ${purchase.total.toFixed(2)}</Typography>

      <Box mt={4}>
        <Typography variant="h6">Productos:</Typography>
        <List>
          {purchase.products.map((product, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${product.name} x${product.quantity}`}
                secondary={`Precio unitario: $${product.price.toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default PurchaseDetail;
