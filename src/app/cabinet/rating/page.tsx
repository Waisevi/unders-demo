'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { EmptyState } from '@/components/ui/empty-state';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useCabinetAuth } from '@/hooks/use-cabinet-auth';

// ============================================================
// MOCK DATA — удалить вместе с папкой /src/app/cabinet
// ============================================================
const MOCK_STATS = [
  {
    all: 23,
    all_new: 14,
    all_repeated: 9,
    approved_all: 15,
    approved_new: 9,
    approved_repeated: 6,
    full_name: 'Иванова М.П.',
    rejected_all: 8,
    rejected_new: 5,
    rejected_repeated: 3,
  },
  {
    all: 31,
    all_new: 20,
    all_repeated: 11,
    approved_all: 19,
    approved_new: 12,
    approved_repeated: 7,
    full_name: 'Козлов В.А.',
    rejected_all: 12,
    rejected_new: 8,
    rejected_repeated: 4,
  },
  {
    all: 17,
    all_new: 10,
    all_repeated: 7,
    approved_all: 10,
    approved_new: 6,
    approved_repeated: 4,
    full_name: 'Семенова Е.С.',
    rejected_all: 7,
    rejected_new: 4,
    rejected_repeated: 3,
  },
  {
    all: 28,
    all_new: 15,
    all_repeated: 13,
    approved_all: 20,
    approved_new: 11,
    approved_repeated: 9,
    full_name: 'Морозов Д.К.',
    rejected_all: 8,
    rejected_new: 4,
    rejected_repeated: 4,
  },
  {
    all: 19,
    all_new: 12,
    all_repeated: 7,
    approved_all: 11,
    approved_new: 7,
    approved_repeated: 4,
    full_name: 'Петрова И.Л.',
    rejected_all: 8,
    rejected_new: 5,
    rejected_repeated: 3,
  },
];

type SortKey = keyof StatRow;
type StatRow = (typeof MOCK_STATS)[number];
// ============================================================

const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'full_name', label: 'ФИО' },
  { key: 'all', label: 'Всего рассм.' },
  { key: 'approved_all', label: 'Одобрено всего' },
  { key: 'rejected_all', label: 'Отказов всего' },
  { key: 'all_new', label: 'Новых рассм.' },
  { key: 'approved_new', label: 'Одобрено новых' },
  { key: 'rejected_new', label: 'Отказов новых' },
  { key: 'all_repeated', label: 'Повторных рассм.' },
  { key: 'approved_repeated', label: 'Одобрено повт.' },
  { key: 'rejected_repeated', label: 'Отказов повт.' },
];

const CabinetRatingPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useCabinetAuth();

  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [sortKey, setSortKey] = useState<SortKey>('full_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isTableLoading, setIsTableLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/cabinet/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsTableLoading(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  const sorted = useMemo(
    () =>
      MOCK_STATS.toSorted((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (typeof av === 'string') {
          const result = (av as string).localeCompare(bv as string);
          return sortOrder === 'asc' ? result : -result;
        }
        const result = (av as number) - (bv as number);
        return sortOrder === 'asc' ? result : -result;
      }),
    [sortKey, sortOrder],
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortOrder(key === 'full_name' ? 'asc' : 'desc');
  };

  const renderTableContent = () => {
    if (isTableLoading) {
      return (
        <Box p={2}>
          <TableSkeleton cols={10} rows={6} />
        </Box>
      );
    }

    if (sorted.length === 0) {
      return (
        <Box p={2}>
          <EmptyState
            description='Измените параметры фильтрации, чтобы отобразить статистику.'
            title='Нет данных для таблицы'
          />
        </Box>
      );
    }

    return (
      <Table size='small' stickyHeader>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.100' }}>
            {COLUMNS.map(({ key, label }) => {
              const isCurrentSort = sortKey === key;
              const iconRotation =
                isCurrentSort && sortOrder === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)';

              return (
                <TableCell
                  key={key}
                  onClick={() => handleSort(key)}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Box alignItems='center' display='flex' gap={0.5}>
                    {label}
                    <UnfoldMoreIcon
                      sx={{
                        fontSize: 14,
                        opacity: isCurrentSort ? 1 : 0.3,
                        transform: iconRotation,
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </Box>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((row) => (
            <TableRow hover key={row.full_name}>
              <TableCell>{row.full_name}</TableCell>
              <TableCell>{row.all}</TableCell>
              <TableCell>
                {row.approved_all} ({pct(row.approved_all, row.all)}%)
              </TableCell>
              <TableCell>
                {row.rejected_all} ({pct(row.rejected_all, row.all)}%)
              </TableCell>
              <TableCell>{row.all_new}</TableCell>
              <TableCell>
                {row.approved_new} ({pct(row.approved_new, row.all_new)}%)
              </TableCell>
              <TableCell>
                {row.rejected_new} ({pct(row.rejected_new, row.all_new)}%)
              </TableCell>
              <TableCell>{row.all_repeated}</TableCell>
              <TableCell>
                {row.approved_repeated} ({pct(row.approved_repeated, row.all_repeated)}%)
              </TableCell>
              <TableCell>
                {row.rejected_repeated} ({pct(row.rejected_repeated, row.all_repeated)}%)
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  if (isLoading || !isAuthenticated) {
    return (
      <Box alignItems='center' display='flex' justifyContent='center' minHeight='100vh'>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar elevation={0} position='static'>
        <Toolbar sx={{ flexWrap: 'wrap', gap: 1, py: 1 }}>
          <Button
            color='inherit'
            component={Link}
            href='/cabinet'
            startIcon={<ArrowBackIcon />}
            sx={{ mr: 2 }}
          >
            Назад
          </Button>
          <Typography fontWeight={700} sx={{ flexGrow: 1, letterSpacing: '0.2px' }} variant='h6'>
            Статистика по обработанным заявкам
          </Typography>
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

      <Container maxWidth='xl' sx={{ py: 3 }}>
        <Paper sx={{ borderRadius: 2, mb: 3, p: 3 }}>
          <Box alignItems='center' display='flex' flexWrap='wrap' gap={2}>
            <Typography variant='body1'>Дата:</Typography>
            <TextField
              onChange={(e) => setDate(e.target.value)}
              size='small'
              slotProps={{ inputLabel: { shrink: true } }}
              type='date'
              value={date}
            />
          </Box>
        </Paper>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          {renderTableContent()}
        </TableContainer>
      </Container>
    </Box>
  );
};

export default CabinetRatingPage;
