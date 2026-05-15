'use client';

import BarChartIcon from '@mui/icons-material/BarChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Alert,
  AppBar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useCabinetAuth } from '@/hooks/use-cabinet-auth';

// ============================================================
// MOCK DATA — удалить вместе с папкой /src/app/cabinet
// ============================================================
const MOCK_EMPLOYEE = {
  lateness: false,
  name: 'Иванова Мария Петровна',
  scheduleFrom: '09:00',
  scheduleTo: '18:00',
  secondsWorked: 18_420,
  startWorkTime: '08:47',
};

const MOCK_APPLICATION = {
  client: 'Петров Иван Сергеевич',
  identify: false,
};

const MOCK_CLIENT_ID = '12345678';

const MOCK_CLAIMS = [
  {
    details: 'ПАО Тинькофф Банк',
    name: 'Петров И.С.',
    production: '78012/24/056812',
    subject: 'Взыскание долга',
    sum: '45 000 ₽',
  },
];

const PASSPORT_CHECKS = [
  { label: 'База недействительных паспортов', status: 'not-exists' },
  { label: 'Перечень террористов и экстремистов', status: 'not-exists' },
  { label: 'Перечень лиц, причастных к ОМУ', status: 'not-exists' },
  { label: 'Перечень лиц с блокировкой средств', status: 'not-exists' },
];

const MOCK_COMMENTS = [
  {
    comment: 'Клиент добросовестный, рекомендую одобрение.',
    created_at: '15.01.2024 10:30',
    underwriter: 'Сидорова А.В.',
  },
  {
    comment: 'Проверка паспорта прошла успешно.',
    created_at: '10.01.2024 14:22',
    underwriter: 'Козлова М.П.',
  },
];
// ============================================================

const fmtSeconds = (s: number) =>
  `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}`;

const checkSeverity = (status: string): 'error' | 'success' | 'warning' => {
  if (status === 'exists') return 'error';
  if (status === 'not-exists') return 'success';
  return 'warning';
};

const checkLabel = (status: string) => {
  if (status === 'exists') return 'Найден!';
  if (status === 'not-exists') return 'Не найден';
  return 'Сервис недоступен';
};

const CabinetPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useCabinetAuth();

  const [active, setActive] = useState(true);
  const [inWork, setInWork] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [clientText, setClientText] = useState('');
  const [textSaved, setTextSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/cabinet/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <Box alignItems='center' display='flex' justifyContent='center' minHeight='100vh'>
        <CircularProgress />
      </Box>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedId(searchId);
  };

  const clientFound = searchedId === MOCK_CLIENT_ID;

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar elevation={1} position='static'>
        <Toolbar>
          <Typography fontWeight={700} sx={{ flexGrow: 1 }} variant='h6'>
            Андеррайтинг — Личный кабинет
          </Typography>
          <Button
            color='inherit'
            component={Link}
            href='/cabinet/rating'
            startIcon={<BarChartIcon />}
            sx={{ mr: 1 }}
          >
            Статистика
          </Button>
          <Button
            color='inherit'
            onClick={() => {
              logout();
              router.replace('/cabinet/login');
            }}
            startIcon={<LogoutIcon />}
          >
            Выйти
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth='lg' sx={{ py: 3 }}>
        <Box alignItems='flex-start' display='flex' gap={3}>
          {/* ===== LEFT COLUMN ===== */}
          <Box sx={{ flexShrink: 0, width: 300 }}>
            {/* Greeting */}
            <Paper sx={{ borderRadius: 2, mb: 2, p: 3 }}>
              <Typography fontWeight={600} variant='h6'>
                Здравствуйте,
              </Typography>
              <Typography color='primary' fontWeight={700} mb={1} variant='h5'>
                {MOCK_EMPLOYEE.name}
              </Typography>
              <Typography color='text.secondary' variant='body2'>
                Готовы принимать заявки?
              </Typography>
            </Paper>

            {/* Active/Break toggle */}
            <Paper sx={{ borderRadius: 2, mb: 2, p: 3 }}>
              <Stack direction='row' mb={2} spacing={1}>
                <Button
                  color='success'
                  fullWidth
                  onClick={() => setActive(true)}
                  startIcon={<CheckCircleIcon />}
                  variant={active ? 'contained' : 'outlined'}
                >
                  Готов!
                </Button>
                <Button
                  color='warning'
                  fullWidth
                  onClick={() => setActive(false)}
                  startIcon={<CoffeeIcon />}
                  variant={active ? 'outlined' : 'contained'}
                >
                  Перерыв
                </Button>
              </Stack>
              <Chip
                color={active ? 'success' : 'warning'}
                label={active ? 'Принимаю заявки' : 'На перерыве'}
                size='small'
                variant='outlined'
              />
            </Paper>

            {/* Work schedule */}
            <Paper sx={{ borderRadius: 2, p: 3 }}>
              <Typography color='text.secondary' fontWeight={600} mb={2} variant='subtitle2'>
                Рабочий день
              </Typography>
              <Box display='grid' gap={2} gridTemplateColumns='1fr 1fr'>
                {[
                  { label: 'Начало', value: MOCK_EMPLOYEE.scheduleFrom },
                  { label: 'Приход', value: MOCK_EMPLOYEE.startWorkTime },
                  { label: 'Окончание', value: MOCK_EMPLOYEE.scheduleTo },
                  { label: 'Отработано', value: fmtSeconds(MOCK_EMPLOYEE.secondsWorked) },
                ].map(({ label, value }) => (
                  <Box key={label}>
                    <Typography color='text.secondary' display='block' variant='caption'>
                      {label}
                    </Typography>
                    <Typography fontWeight={600} variant='body1'>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>

          {/* ===== RIGHT COLUMN ===== */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            {/* Current application */}
            <Paper sx={{ borderRadius: 2, mb: 2, p: 3 }}>
              <Typography fontWeight={600} mb={2} variant='subtitle1'>
                Текущая заявка
              </Typography>
              <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
                {MOCK_APPLICATION.identify && (
                  <Alert severity='info' sx={{ mb: 1 }}>
                    Одобрено, нужна идентификация
                  </Alert>
                )}
                <Typography mb={2} variant='h6'>
                  {MOCK_APPLICATION.client}
                </Typography>
                {inWork ? (
                  <Chip color='primary' label='В работе' />
                ) : (
                  <Stack direction='row' spacing={1}>
                    <Button onClick={() => setInWork(true)} variant='contained'>
                      Взять в работу!
                    </Button>
                    <Button variant='outlined'>Отложить</Button>
                  </Stack>
                )}
              </Box>
            </Paper>

            {/* Client search */}
            <Paper sx={{ borderRadius: 2, mb: 2, p: 3 }}>
              <Typography fontWeight={600} mb={2} variant='subtitle1'>
                Поиск клиента
              </Typography>
              <form onSubmit={handleSearch}>
                <Stack alignItems='center' direction='row' spacing={2}>
                  <TextField
                    label='ID клиента'
                    onChange={(e) => setSearchId(e.target.value.replaceAll(/\D/g, '').slice(0, 8))}
                    placeholder='12345678'
                    size='small'
                    sx={{ flexGrow: 1 }}
                    value={searchId}
                  />
                  <Button disabled={!searchId} type='submit' variant='contained'>
                    Найти
                  </Button>
                </Stack>
              </form>
              <Typography color='text.secondary' display='block' mt={1} variant='caption'>
                Подсказка: введите 12345678 для демо-данных
              </Typography>
            </Paper>

            {/* Search results */}
            {searchedId && !clientFound && (
              <Alert severity='warning' sx={{ mb: 2 }}>
                Клиент {searchedId} не найден. Введите 12345678 для демо.
              </Alert>
            )}

            {clientFound && (
              <>
                {/* FSSP Claims */}
                <Paper sx={{ borderRadius: 2, mb: 2, p: 3 }}>
                  <Typography fontWeight={600} mb={2} variant='subtitle1'>
                    Исполнительные производства (ФССП)
                  </Typography>
                  <Table size='small'>
                    <TableHead>
                      <TableRow>
                        {['ФИО', 'Производство', 'Предмет', 'Взыскатель', 'Сумма'].map((h) => (
                          <TableCell key={h} sx={{ fontWeight: 600 }}>
                            {h}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {MOCK_CLAIMS.map((c, i) => (
                        <TableRow key={i}>
                          <TableCell>{c.name}</TableCell>
                          <TableCell>{c.production}</TableCell>
                          <TableCell>{c.subject}</TableCell>
                          <TableCell>{c.details}</TableCell>
                          <TableCell>{c.sum}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>

                {/* Passport checks */}
                <Paper sx={{ borderRadius: 2, mb: 2, p: 3 }}>
                  <Typography fontWeight={600} mb={2} variant='subtitle1'>
                    Проверки безопасности
                  </Typography>
                  <Stack spacing={1}>
                    {PASSPORT_CHECKS.map(({ label, status }) => (
                      <Alert key={label} severity={checkSeverity(status)}>
                        <strong>{label}:</strong> {checkLabel(status)}
                      </Alert>
                    ))}
                  </Stack>
                </Paper>

                {/* Comments */}
                <Paper sx={{ borderRadius: 2, p: 3 }}>
                  <Typography fontWeight={600} mb={2} variant='subtitle1'>
                    Комментарии андеррайтеров
                  </Typography>
                  <TextField
                    disabled={textSaved}
                    fullWidth
                    multiline
                    onChange={(e) => {
                      setClientText(e.target.value);
                      setTextSaved(false);
                    }}
                    placeholder='Добавьте комментарий...'
                    rows={4}
                    sx={{ mb: 2 }}
                    value={clientText}
                  />
                  {textSaved ? (
                    <Alert severity='success' sx={{ mb: 3 }}>
                      Комментарий сохранён
                    </Alert>
                  ) : (
                    <Button
                      disabled={!clientText}
                      onClick={() => setTextSaved(true)}
                      sx={{ mb: 3 }}
                      variant='contained'
                    >
                      Сохранить
                    </Button>
                  )}
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={2}>
                    {MOCK_COMMENTS.map((c, i) => (
                      <Box key={i}>
                        <Typography color='text.secondary' variant='caption'>
                          {c.created_at} — {c.underwriter}
                        </Typography>
                        <Typography mt={0.5} variant='body2'>
                          {c.comment}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CabinetPage;
