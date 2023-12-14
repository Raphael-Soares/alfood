import { AppBar, Box, Button, Container, Link, Paper, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Link as RouterLink } from 'react-router-dom';

const FormularioRestaurante = () => {
  return (
    <>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar>
            <Typography component='h1' variant='h6'>
              Administração
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
              <Link component={RouterLink} to='/admin/restaurantes'>
                <Button sx={{ color: 'white', my: 2 }} variant='outlined'>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to='/admin/restaurantes/novo'>
                <Button sx={{ color: 'white', my: 2 }} variant='outlined'>
                  Novo Restaurante
                </Button>
              </Link>

              <Link component={RouterLink} to='/admin/pratos/'>
                <Button sx={{ color: 'white', my: 2 }} variant='outlined'>
                  Pratos
                </Button>
              </Link>

              <Link component={RouterLink} to='/admin/pratos/novo'>
                <Button sx={{ color: 'white', my: 2 }} variant='outlined'>
                  Novo Prato
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth='lg' sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default FormularioRestaurante;
