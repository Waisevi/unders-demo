import type { KnipConfig } from 'knip';

// example configuration
const config: KnipConfig = {
  ignoreDependencies: [
    'merge-refs',
    'dayjs',
    'cva',
    'clsx',
    '@mui/icons-material',
    '@testing-library/user-event',
  ],
  ignoreFiles: [],
  ignoreIssues: {},
};

export default config;
