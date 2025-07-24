import { FC, PropsWithChildren } from 'react';
import { container } from './example.css';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export const Example: FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch('/api/todos');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={container}>
      {children} <Button variant="contained">Click me</Button>
      <div>
        Fetching data:{' '}
        {data?.map((todo: { id: string | number; title: string }) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </div>
    </div>
  );
};
