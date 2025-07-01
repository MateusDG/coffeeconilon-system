import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const menu = [
    { label: 'Início', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Assistente Inicial', path: '/setup' },
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
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Coffee Conilon
          </Typography>

        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
          <List>
            {menu.map(item => (
              <ListItem
                button
                key={item.path}
                component={RouterLink}
                to={item.path}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button onClick={logout}>
              <ListItemText primary="Sair" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box sx={{ p: 2 }}>{children}</Box>
    </>
  );
};

export default Layout;