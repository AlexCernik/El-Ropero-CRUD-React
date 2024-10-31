import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const Checkout = ({ onBackToShopping }) => (
  <Container maxWidth="sm">
    <Typography variant="h4" gutterBottom>Compra Completada</Typography>
    <Typography variant="body1">Gracias por tu compra. Te llegará un correo con los detalles del pedido.</Typography>
    
    <Button variant="contained" color="primary" onClick={onBackToShopping} sx={{ mt: 2 }}>
      Volver a la Tienda
    </Button>
  </Container>
);

export default Checkout;
