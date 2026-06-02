import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { Box, Button, Paper, Typography } from '@mui/material';

type EmptyStateProps = {
  actionLabel?: string;
  description: string;
  onAction?: () => void;
  title: string;
};

export const EmptyState = ({ actionLabel, description, onAction, title }: EmptyStateProps) => (
  <Paper
    sx={{
      alignItems: 'center',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      p: 4,
      textAlign: 'center',
    }}
  >
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: 'tableSurface',
        borderRadius: '50%',
        color: 'primary.main',
        display: 'flex',
        height: 52,
        justifyContent: 'center',
        mb: 1,
        width: 52,
      }}
    >
      <InboxOutlinedIcon />
    </Box>
    <Typography fontWeight={600} variant='subtitle1'>
      {title}
    </Typography>
    <Typography color='text.secondary' variant='body2'>
      {description}
    </Typography>
    {actionLabel && onAction && (
      <Button onClick={onAction} sx={{ mt: 1 }} variant='outlined'>
        {actionLabel}
      </Button>
    )}
  </Paper>
);
