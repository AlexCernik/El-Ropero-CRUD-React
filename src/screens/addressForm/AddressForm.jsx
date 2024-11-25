import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMain } from '../../redux/main';

const AddressForm = () => {
  const dispatch = useDispatch()
  const address = useSelector(state => state.address);

  const [formData, setFormData] = useState({
    province: address?.province || '',
    city: address?.city || '',
    zip_code: address?.zip_code || '',
    street: address?.street || '',
    number: address?.number || '',
    phone: address?.phone || '',
    detail: address?.detail || '',
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
      if (address?.id) {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/address/${address.id}/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        dispatch(setMain({ address: res.data }))
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/address/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        dispatch(setMain({ address: res.data }))
      }
      alert('Dirección guardada exitosamente');
    } catch (error) {
      console.log('Error al guardar la dirección:', error, error.data);
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
        Mi Dirección
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
          name="zip_code"
          value={formData.zip_code}
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
        <TextField
          label="Número de contacto"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          type="number"
        />
        <TextField
          label="Detalle de entrega"
          name="detail"
          placeholder='Casa blanca portón negro'
          value={formData.detail}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
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
