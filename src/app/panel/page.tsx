'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { EmptyState } from '@/components/ui/empty-state';

// ============================================================
// MOCK DATA — удалить вместе с папкой /src/app/panel
// ============================================================
const MOCK_QUEUE = 7;
const MOCK_QUEUE_EXTERNAL = 3;

type Order = {
  active: boolean;
  clientShortName: null | string;
  employeeLastFirstName: string;
  id: number;
  lateness: boolean;
  orderCreatedAtPassed: null | number;
  repeat: boolean;
  secondsLeft: null | number;
  secondsWaiting: number;
  startWorkTime: string;
  working: boolean;
};

type PanelFilter = 'all' | 'in-work' | 'on-break';

const INITIAL_ORDERS: Order[] = [
  {
    active: true,
    clientShortName: 'Петров И.С.',
    employeeLastFirstName: 'Иванова М.П.',
    id: 1,
    lateness: false,
    orderCreatedAtPassed: 1820,
    repeat: false,
    secondsLeft: 423,
    secondsWaiting: 0,
    startWorkTime: '09:02',
    working: true,
  },
  {
    active: true,
    clientShortName: 'Смирнов А.Б.',
    employeeLastFirstName: 'Козлов В.А.',
    id: 2,
    lateness: false,
    orderCreatedAtPassed: 700,
    repeat: true,
    secondsLeft: 245,
    secondsWaiting: 0,
    startWorkTime: '09:05',
    working: true,
  },
  {
    active: false,
    clientShortName: null,
    employeeLastFirstName: 'Семенова Е.С.',
    id: 3,
    lateness: false,
    orderCreatedAtPassed: null,
    repeat: false,
    secondsLeft: null,
    secondsWaiting: 1800,
    startWorkTime: '09:00',
    working: false,
  },
  {
    active: true,
    clientShortName: null,
    employeeLastFirstName: 'Морозов Д.К.',
    id: 4,
    lateness: false,
    orderCreatedAtPassed: null,
    repeat: false,
    secondsLeft: null,
    secondsWaiting: 0,
    startWorkTime: '08:58',
    working: false,
  },
  {
    active: true,
    clientShortName: 'Кузнецов В.В.',
    employeeLastFirstName: 'Петрова И.Л.',
    id: 5,
    lateness: true,
    orderCreatedAtPassed: 3620,
    repeat: false,
    secondsLeft: 65,
    secondsWaiting: 0,
    startWorkTime: '09:10',
    working: false,
  },
];
// ============================================================

const fmtHHMM = (s: number) =>
  `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}`;

const fmtDHHM = (s: number) => {
  const days = Math.floor(s / 86_400);
  const hours = Math.floor((s % 86_400) / 3600);
  const minutes = Math.floor(((s % 86_400) % 3600) / 60);
  if (days > 0) {
    const hourPart = hours > 0 ? ` ${hours}ч` : '';
    return `${days}д${hourPart}`;
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const fmtTimer = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}ч ${String(m).padStart(2, '0')}м`;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

const timerColor = (o: Order): 'error' | 'success' => {
  if (o.secondsLeft === null) return 'success';
  const limit = (o.repeat ? 5 : 10) * 60;
  return o.secondsLeft > limit ? 'error' : 'success';
};

const tickOrder = (o: Order): Order => ({
  ...o,
  orderCreatedAtPassed: o.orderCreatedAtPassed === null ? null : o.orderCreatedAtPassed + 1,
  secondsLeft: o.secondsLeft === null ? null : o.secondsLeft + 1,
  secondsWaiting: o.active ? o.secondsWaiting : o.secondsWaiting + 1,
});

const tickOrders = (prev: Order[]) => prev.map((o) => tickOrder(o));

const PanelPage = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeFilter, setActiveFilter] = useState<PanelFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(tickOrders);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'in-work') {
      return orders.filter((order) => order.working);
    }
    if (activeFilter === 'on-break') {
      return orders.filter((order) => !order.active);
    }
    return orders;
  }, [activeFilter, orders]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box display='flex' flexWrap='wrap' gap={2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Paper
              key={`skeleton-${i}`}
              sx={{ borderRadius: 2, flex: '1 1 220px', maxWidth: 280, minHeight: 220, p: 2.5 }}
            >
              <Skeleton height={28} width='62%' />
              <Skeleton height={20} sx={{ mt: 1 }} width='40%' />
              <Skeleton height={32} sx={{ mt: 1.5 }} width='52%' />
              <Skeleton height={16} sx={{ mt: 4 }} width='100%' />
              <Skeleton height={16} sx={{ mt: 0.7 }} width='86%' />
            </Paper>
          ))}
        </Box>
      );
    }

    if (filteredOrders.length === 0) {
      return (
        <EmptyState
          actionLabel='Показать все заявки'
          description='Попробуйте переключить фильтр, чтобы увидеть карточки.'
          onAction={() => setActiveFilter('all')}
          title='Нет карточек по выбранному фильтру'
        />
      );
    }

    return (
      <Box display='flex' flexWrap='wrap' gap={2}>
        {filteredOrders.map((order) => (
          <Paper
            key={order.id}
            sx={{
              '&:hover': {
                boxShadow: '0 8px 22px rgba(111, 90, 182, 0.15)',
                transform: 'translateY(-1px)',
              },
              border: '1px solid',
              borderColor: order.active ? 'primary.light' : 'divider',
              borderRadius: 2,
              display: 'flex',
              flex: '1 1 220px',
              flexDirection: 'column',
              maxWidth: 280,
              minHeight: 220,
              opacity: order.active ? 1 : 0.6,
              p: 2.5,
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            }}
          >
            {/* Employee name */}
            <Box alignItems='center' display='flex' justifyContent='space-between' mb={1.5}>
              <Typography color='text.primary' fontWeight={700} variant='subtitle1'>
                {order.employeeLastFirstName}
              </Typography>
              {order.active ? (
                <TaskAltIcon color='primary' sx={{ fontSize: 18 }} />
              ) : (
                <PauseCircleOutlineIcon color='disabled' sx={{ fontSize: 18 }} />
              )}
            </Box>

            {/* Client & timer */}
            {order.clientShortName ? (
              <Box mb={1.5}>
                <Box alignItems='center' display='flex' gap={0.5} mb={0.5}>
                  <Typography
                    color={order.working ? 'text.primary' : 'text.secondary'}
                    fontWeight={order.working ? 600 : 400}
                    variant='body2'
                  >
                    {order.clientShortName}
                  </Typography>
                  {order.repeat && <StarIcon sx={{ color: 'warning.main', fontSize: 14 }} />}
                </Box>
                {order.secondsLeft !== null && (
                  <Chip
                    color={timerColor(order)}
                    icon={<AccessTimeIcon />}
                    label={fmtTimer(order.secondsLeft)}
                    size='small'
                    sx={{ fontWeight: 700 }}
                  />
                )}
              </Box>
            ) : (
              <Typography color='text.secondary' mb={1.5} variant='body2'>
                {order.active ? 'Ожидает заявку' : 'На перерыве'}
              </Typography>
            )}

            {/* Info rows */}
            <Stack mt='auto' pt={1.5} spacing={0.5}>
              <Box display='flex' justifyContent='space-between'>
                <Typography color='text.secondary' variant='caption'>
                  Приход
                </Typography>
                <Typography
                  color={order.lateness ? 'error.main' : 'text.primary'}
                  fontWeight={600}
                  variant='caption'
                >
                  {order.startWorkTime}
                  {order.lateness && ' ⚠'}
                </Typography>
              </Box>

              {order.orderCreatedAtPassed !== null && (
                <Box display='flex' justifyContent='space-between'>
                  <Typography color='text.secondary' variant='caption'>
                    С создания заявки
                  </Typography>
                  <Typography color='text.primary' fontWeight={600} variant='caption'>
                    {fmtDHHM(order.orderCreatedAtPassed)}
                  </Typography>
                </Box>
              )}

              {!order.active && order.secondsWaiting > 0 && (
                <Box display='flex' justifyContent='space-between'>
                  <Typography color='text.secondary' variant='caption'>
                    На перерыве
                  </Typography>
                  <Typography color='warning.main' fontWeight={600} variant='caption'>
                    {fmtHHMM(order.secondsWaiting)}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Paper>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar elevation={0} position='static'>
        <Toolbar sx={{ flexWrap: 'wrap', gap: 1, py: 1 }}>
          <Button color='inherit' component={Link} href='/' startIcon={<HomeIcon />} sx={{ mr: 2 }}>
            Главная
          </Button>
          <Typography fontWeight={700} sx={{ flexGrow: 1, letterSpacing: '0.2px' }} variant='h6'>
            Распределяльщик 2000
          </Typography>
          <Stack alignItems='center' direction='row' spacing={3}>
            <Box textAlign='center'>
              <Typography color='rgba(255,255,255,0.7)' variant='caption'>
                Очередь
              </Typography>
              <Typography fontWeight={700} variant='h6'>
                {MOCK_QUEUE}
              </Typography>
            </Box>
            <Box textAlign='center'>
              <Typography color='rgba(255,255,255,0.7)' variant='caption'>
                Внешних
              </Typography>
              <Typography fontWeight={700} variant='h6'>
                {MOCK_QUEUE_EXTERNAL}
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth='xl' sx={{ py: 3 }}>
        <Stack direction='row' mb={2} spacing={1}>
          <Chip
            clickable
            color={activeFilter === 'all' ? 'primary' : 'default'}
            label='Все'
            onClick={() => setActiveFilter('all')}
            variant={activeFilter === 'all' ? 'filled' : 'outlined'}
          />
          <Chip
            clickable
            color={activeFilter === 'in-work' ? 'primary' : 'default'}
            label='В работе'
            onClick={() => setActiveFilter('in-work')}
            variant={activeFilter === 'in-work' ? 'filled' : 'outlined'}
          />
          <Chip
            clickable
            color={activeFilter === 'on-break' ? 'primary' : 'default'}
            label='На перерыве'
            onClick={() => setActiveFilter('on-break')}
            variant={activeFilter === 'on-break' ? 'filled' : 'outlined'}
          />
        </Stack>

        {renderContent()}
      </Container>
    </Box>
  );
};

export default PanelPage;
