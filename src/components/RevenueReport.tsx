import React, { useEffect, useState } from 'react';
import { useGetBookingsQuery, TBookedHouses } from '../features/houses/BookingsApi';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const RevenueReport: React.FC = () => {
  const { data: bookings, isLoading, isError } = useGetBookingsQuery();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (bookings) {
      // Aggregate total revenue
      const revenueByStatus = bookings.reduce((acc: any, booking: TBookedHouses) => {
        acc[booking.booking_status] = (acc[booking.booking_status] || 0) + booking.total_amount;
        return acc;
      }, {});

      const labels = Object.keys(revenueByStatus);
      const data = Object.values(revenueByStatus);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Total Revenue',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [bookings]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading bookings</div>;
  }

  return (
    <div className="chart-container" style={{ width: '300px', height: '300px' }}>
      <h2 className="text-xl mb-2">Revenue Report</h2>
      {chartData ? (
        <Pie
          data={chartData}
          options={{
            plugins: {
              legend: {
                position: 'left', // Set the legend position to the left
                labels: {
                  usePointStyle: false, // Display labels as point styles
                },
              },
            }
          }}
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default RevenueReport;
