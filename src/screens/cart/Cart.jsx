import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  List,
  ListItem,
  TextField,
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Tu Carrito</Typography>
      
      {cartItems.length === 0 ? (
        <Typography>No hay productos en tu carrito.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id}>
                <Box display="flex" alignItems="center" width="100%">
                  <Typography variant="body1" flex={1}>{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">${item.price}</Typography>
                  
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                      <Remove />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      size="small"
                      variant="outlined"
                      inputProps={{ readOnly: true }}
                      style={{ width: '40px', textAlign: 'center' }}
                    />
                    <IconButton onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                      <Add />
                    </IconButton>
                  </Box>

                  <IconButton onClick={() => onRemoveItem(item.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Typography variant="h6">Total: ${calculateTotal()}</Typography>
            <Button variant="contained" color="primary" onClick={onCheckout}>
              Proceder a la Compra
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
