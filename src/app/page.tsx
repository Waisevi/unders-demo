'use client';

import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { Box, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import Link from 'next/link';

const APPS = [
  {
    description: 'Рабочее место андеррайтера. Обработка заявок, поиск клиентов, статистика.',
    href: '/cabinet',
    icon: <AssignmentIndOutlinedIcon sx={{ fontSize: 52 }} />,
    title: 'Личный кабинет',
  },
  {
    description: 'Мониторинг распределения заявок в режиме реального времени.',
    href: '/panel',
    icon: <DashboardCustomizeOutlinedIcon sx={{ fontSize: 52 }} />,
    title: 'Панель управления',
  },
];

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh', pt: 5 }}>
      <Container maxWidth='sm' sx={{ mt: 0 }}>
        <Typography align='center' fontWeight={700} mb={1} variant='h4'>
          Андеррайтинг
        </Typography>
        <Typography align='center' color='text.secondary' mb={6}>
          Выберите приложение для работы
        </Typography>

        <Box display='grid' gap={3} gridTemplateColumns={{ sm: '1fr 1fr', xs: '1fr' }}>
          {APPS.map((app) => (
            <Card
              key={app.href}
              sx={{
                '&:hover': {
                  boxShadow: '0 8px 22px rgba(111, 90, 182, 0.15)',
                  transform: 'translateY(-1px)',
                },
                borderRadius: 2,
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
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
    </Box>
  );
};

export default Home;
