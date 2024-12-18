import React from 'react';
import { useOutletContext } from 'react-router-dom';
import TicketsChart from '../features/customer_suppport-tickets/TicketsChart';
import MyBookingsChart from './MyBookingsChart';

const Dashboard: React.FC = () => {
  const { user_id } = useOutletContext<{ user_id: number }>();

  return (
    <div className='min-h-screen'>
      <TicketsChart user_id={user_id} />
      <MyBookingsChart user_id={user_id} />
    </div>
  );
};

export default Dashboard;
