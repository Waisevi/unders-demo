import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

export const Example: FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch('/api/todos');
      return res.json();
    },
    queryKey: ['todos'],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-color-[#4a90e2] text-md p-md rounded-md text-center text-[#fff]'>
      {children} <Button variant='contained'>Click me</Button>
      <div>
        Fetching data:{' '}
        {data?.map((todo: { id: number | string; title: string }) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </div>
    </div>
  );
};
