import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import axios from 'axios';

const AddressForm = () => {
  const [formData, setFormData] = useState({
    province: '',
    city: '',
    postalCode: '',
    street: '',
    number: '',
  });

  const provinces = [
    'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
    'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa',
    'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro',
    'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe',
    'Santiago del Estero', 'Tierra del Fuego', 'Tucumán',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('@token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/address/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('Dirección guardada:', response.data);
      alert('Dirección guardada exitosamente');
      setFormData({
        province: '',
        city: '',
        postalCode: '',
        street: '',
        number: '',
      });
    } catch (error) {
      console.error('Error al guardar la dirección:', error);
      alert('Hubo un problema al guardar la dirección.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        p: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h4" mb={2}>
        Agregar Dirección
      </Typography>
      <form onSubmit={handleAddressSubmit}>
        <TextField
          select
          label="Provincia"
          name="province"
          value={formData.province}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        >
          {provinces.map((province) => (
            <MenuItem key={province} value={province}>
              {province}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Ciudad"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Código Postal"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          type="number"
        />
        <TextField
          label="Calle"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Altura"
          name="number"
          value={formData.number}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          type="number"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Guardar Dirección
        </Button>
      </form>
    </Box>
  );
};

export default AddressForm;
