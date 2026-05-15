'use client';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import Link from 'next/link';

const APPS = [
  {
    description: 'Рабочее место андеррайтера. Обработка заявок, поиск клиентов, статистика.',
    href: '/cabinet',
    icon: <AccountCircleIcon sx={{ fontSize: 52 }} />,
    title: 'Личный кабинет',
  },
  {
    description: 'Мониторинг распределения заявок в режиме реального времени.',
    href: '/panel',
    icon: <DashboardIcon sx={{ fontSize: 52 }} />,
    title: 'Панель управления',
  },
];

const Home = () => {
  return (
    <Container maxWidth='sm' sx={{ mt: 10 }}>
      <Typography align='center' fontWeight={700} mb={1} variant='h4'>
        Андеррайтинг
      </Typography>
      <Typography align='center' color='text.secondary' mb={6}>
        Выберите приложение для работы
      </Typography>

      <Box display='flex' gap={3}>
        {APPS.map((app) => (
          <Card
            key={app.href}
            sx={{ borderRadius: 2, display: 'flex', flex: 1, flexDirection: 'column' }}
          >
            <CardContent sx={{ flexGrow: 1, pt: 4, textAlign: 'center' }}>
              <Box color='primary.main' mb={1.5}>
                {app.icon}
              </Box>
              <Typography fontWeight={600} mb={1} variant='h6'>
                {app.title}
              </Typography>
              <Typography color='text.secondary' variant='body2'>
                {app.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button component={Link} fullWidth href={app.href} variant='contained'>
                Открыть
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
