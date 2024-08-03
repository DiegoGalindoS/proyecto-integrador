import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './button.css';  // Importa el archivo CSS para los estilos del botón


export default function BasicButtons() {
  return (
    <section className=''>
    <Stack spacing={2} direction="row">
      <Button variant="contained">Contained</Button>
    </Stack>
    </section>
  );
}

