import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface THouse {
  house_id: number;
  houseSpec_id: number;
  rental_rate:number;
  location_id:number;
  availability:string;
  images:string;
  created_at: string;
  updated_at: string;
  specification:{
     bedrooms: string;
     year_built: number;
     color: string;
     rooms:number;
     features:string;
     
  }
}

// Define the API slice
export const HouseAPI = createApi({
  reducerPath: 'houseAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://real-estate-api-1l8p.onrender.com',
    prepareHeaders: (headers) => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const token = userDetails?.token;
      console.log('Token:', token);
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['house'],
  endpoints: (builder) => ({
    getHouse: builder.query<THouse[], void>({
      query: () => 'houseData',
      providesTags: ['house'],
    }),
    createHouse: builder.mutation<THouse, Partial<THouse>>({
      query: (newHouse) => ({
        url: 'house',
        method: 'POST',
        body: newHouse,
      }),
      invalidatesTags: ['house'],
    }),
    updateHouse: builder.mutation<THouse, Partial<THouse>>({
      query: ({ house_id, ...rest }) => ({
        url: `house/${house_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['house'],
    }),
    deleteHouse: builder.mutation<{ success: boolean; house_id: number }, number>({
      query: (house_id) => ({
        url: `house/${house_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['house'],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetHouseQuery,
  useCreateHouseMutation,
  useUpdateHouseMutation,
  useDeleteHouseMutation,
}: any = HouseAPI;
