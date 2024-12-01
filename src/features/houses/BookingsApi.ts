import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TBookedHouses{
    booking_id:number;
    user_id:number;
    house_id:number;
    location_id:number;
    booking_date:string;
    ending_date:string;
    total_amount:number;
    booking_status:string;
    created_at:string;
    updated_at:string;
    msg?: string;
  }

export const BookingsAPI = createApi({
  reducerPath: 'bookingsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails')||'{}');
      const token=userDetails?.token;
      console.log('Token:', token);
      if (token) {
        headers.set('Authorization', `${token}`);
        
      }
      return headers;
    },
  }),
  tagTypes: ['bookings'],
  endpoints: (builder) => ({
    getBookingsById:builder.query<TBookedHouses,number>({
      query:(user_id)=>`bookings/${user_id}`,
      providesTags:['bookings'],
    }),
    getBookings: builder.query<TBookedHouses[], void>({
      query: () => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
        const user_id = userDetails?.user_id;
        return `bookings?user_id=${user_id}`;
      },
      providesTags: ['bookings'],
    }),
    createBookings: builder.mutation<TBookedHouses, Partial<TBookedHouses>>({
      query: (newBookings) => ({
        url: 'bookings',
        method: 'POST',
        body: newBookings,
      }),
      invalidatesTags: ['bookings'],
    }),
    updateBookings: builder.mutation<TBookedHouses, Partial<TBookedHouses>>({
      query: ({ booking_id, ...rest }) => ({
        url: `bookings/${booking_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['bookings'],
    }),
    deleteBookings: builder.mutation<{ success: boolean; booking_id: number }, number>({
      query: (booking_id) => ({
        url: `bookings/${booking_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bookings'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetBookingsByIdQuery,
  useGetBookingsQuery,
  useCreateBookingsMutation,
  useUpdateBookingsMutation,
  useDeleteBookingsMutation,
}:any = BookingsAPI;
