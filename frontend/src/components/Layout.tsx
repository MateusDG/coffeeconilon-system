import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();

  const menu = [
    { label: 'Dashboard', path: '/' },
    { label: 'Produtores', path: '/producers' },
    { label: 'Fazendas', path: '/farms' },
    { label: 'Safras', path: '/crops' },
    { label: 'Lotes', path: '/lots' },
    { label: 'Financeiro', path: '/financial' },
    { label: 'Estoque', path: '/inventory' },
    { label: 'Relatórios', path: '/reports' },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Coffee Conilon
          </Typography>
          {menu.map(item => (
            <Button key={item.path} color="inherit" component={RouterLink} to={item.path}>
              {item.label}
            </Button>
          ))}
          <Button color="inherit" onClick={logout}>Sair</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>{children}</Box>
    </>
  );
};

export default Layout;