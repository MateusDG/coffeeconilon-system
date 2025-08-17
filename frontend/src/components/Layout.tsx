import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  InputBase,
  alpha,
  Paper,
  ListItemButton,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout, token, ready } = useAuth();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    localStorage.setItem('lastRoute', location.pathname);
  }, [location.pathname]);

  const quickNavigate = (q: string) => {
    const s = q.trim().toLowerCase();
    if (!s) return;
    const dict = [
      { path: '/', keys: ['home', 'inicio', 'início', 'start', 'inicial'] },
      { path: '/dashboard', keys: ['dashboard', 'painel'] },
      { path: '/financial', keys: ['finance', 'financeiro', 'lancamento', 'lançamento'] },
      { path: '/inventory', keys: ['estoque', 'inventory'] },
      { path: '/reports', keys: ['reports', 'relatorio', 'relatório'] },
      { path: '/producers', keys: ['produtores', 'producers', 'usuarios', 'usuários', 'users'] },
      { path: '/farms', keys: ['fazendas', 'fazenda', 'farms', 'farm'] },
      { path: '/lots', keys: ['lotes', 'lote', 'lots', 'lot'] },
      { path: '/crops', keys: ['safras', 'safra', 'crops', 'crop'] },
      { path: '/setup', keys: ['setup', 'assistente', 'wizard'] },
    ];
    const matched = dict.find((d) => d.keys.some((k) => s.includes(k)) || s === d.path.replace('/', ''));
    if (matched) {
      navigate(matched.path);
      setSearch('');
      setActiveIndex(0);
      setFocus(false);
    }
  };

  const suggestions = React.useMemo(() => {
    const dict = [
      { path: '/', label: 'Início' },
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/financial', label: 'Financeiro' },
      { path: '/inventory', label: 'Estoque' },
      { path: '/reports', label: 'Relatórios' },
      { path: '/producers', label: 'Produtores' },
      { path: '/farms', label: 'Fazendas' },
      { path: '/lots', label: 'Lotes' },
      { path: '/crops', label: 'Safras' },
      { path: '/setup', label: 'Assistente Inicial' },
    ];
    const q = search.trim().toLowerCase();
    if (!q) return dict.slice(0, 6);
    return dict.filter(d => d.label.toLowerCase().includes(q) || d.path.replace('/', '').includes(q)).slice(0, 6);
  }, [search]);

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
          <Typography variant="h6" sx={{ mr: 2 }}>
            Coffee Conilon
          </Typography>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 2,
              backgroundColor: (t) => alpha(t.palette.common.white, 0.15),
              '&:hover': { backgroundColor: (t) => alpha(t.palette.common.white, 0.25) },
              ml: 1,
              flexGrow: 1,
              maxWidth: 480,
            }}
          >
            <InputBase
              fullWidth
              placeholder="Buscar…"
              inputProps={{ 'aria-label': 'buscar' }}
              sx={{ color: 'inherit', px: 2, py: 0.5 }}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveIndex(0); }}
              onFocus={() => setFocus(true)}
              onBlur={() => setTimeout(() => setFocus(false), 120)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { setActiveIndex((i) => Math.min(i + 1, Math.max(0, suggestions.length - 1))); return; }
                if (e.key === 'ArrowUp') { setActiveIndex((i) => Math.max(i - 1, 0)); return; }
                if (e.key === 'Enter') {
                  const picked = suggestions[activeIndex];
                  if (picked) { navigate(picked.path); setSearch(''); setFocus(false); setActiveIndex(0); }
                  else { quickNavigate(search); }
                }
              }}
            />
            {focus && suggestions.length > 0 && (
              <Paper elevation={6} sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 0.5, borderRadius: 2, overflow: 'hidden' }}>
                <List dense disablePadding>
                  {suggestions.map((s, idx) => (
                    <ListItemButton
                      key={s.path}
                      selected={idx === activeIndex}
                      onMouseDown={(e) => { e.preventDefault(); navigate(s.path); setSearch(''); setFocus(false); setActiveIndex(0); }}
                    >
                      <ListItemText primary={s.label} secondary={s.path} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            )}
          </Box>
          <Box sx={{ ml: 2 }}>
            <Chip
              size="small"
              label={!ready ? 'Validando…' : token ? 'Autenticado' : 'Convidado'}
              color={!ready ? 'default' : token ? 'success' as any : 'default'}
              variant={!ready || !token ? 'outlined' : 'filled'}
            />
          </Box>
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
