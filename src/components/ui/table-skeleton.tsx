import { Box, Skeleton, Stack } from '@mui/material';

type TableSkeletonProps = {
  cols?: number;
  rows?: number;
};

export const TableSkeleton = ({ cols = 5, rows = 5 }: TableSkeletonProps) => (
  <Stack spacing={1}>
    <Box display='grid' gap={1} gridTemplateColumns={`repeat(${cols}, 1fr)`}>
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton height={36} key={`head-${i}`} variant='rounded' />
      ))}
    </Box>
    {Array.from({ length: rows }).map((_, r) => (
      <Box display='grid' gap={1} gridTemplateColumns={`repeat(${cols}, 1fr)`} key={`row-${r}`}>
        {Array.from({ length: cols }).map((_, c) => (
          <Skeleton height={30} key={`cell-${r}-${c}`} variant='rounded' />
        ))}
      </Box>
    ))}
  </Stack>
);
