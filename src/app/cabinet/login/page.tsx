'use client';

import { Alert, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCabinetAuth } from '@/hooks/use-cabinet-auth';

// MOCK: login page для underwriter_cabinet — удалить вместе с папкой /src/app/cabinet

const CabinetLoginPage = () => {
  const router = useRouter();
  const { login } = useCabinetAuth();

  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginValue.trim() || !password.trim()) {
      setError('Введите логин и пароль');
      return;
    }
    // MOCK: любые данные принимаются
    login();
    router.replace('/cabinet');
  };

  return (
    <Box
      sx={{
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ bgcolor: 'primary.main', px: 3, py: 2 }}>
        <Typography color='white' fontWeight={700} variant='h6'>
          Андеррайтинг
        </Typography>
      </Box>

      <Container maxWidth='xs' sx={{ mt: 10 }}>
        <Paper elevation={3} sx={{ borderRadius: 2, p: 4 }}>
          <Typography align='center' fontWeight={600} mb={0.5} variant='h5'>
            Добрый день!
          </Typography>
          <Typography align='center' color='text.secondary' mb={3} variant='body2'>
            Войдите в систему, чтобы начать работу
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              label='Логин'
              onChange={(e) => {
                setLoginValue(e.target.value);
                setError('');
              }}
              sx={{ mb: 2 }}
              value={loginValue}
            />
            <TextField
              fullWidth
              label='Пароль'
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              sx={{ mb: error ? 2 : 3 }}
              type='password'
              value={password}
            />
            {error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Button fullWidth size='large' type='submit' variant='contained'>
              Начать работу!
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CabinetLoginPage;
