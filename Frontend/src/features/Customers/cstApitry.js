import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { client } from '../../api/client';

// ...

export const customersApi = createApi({
  reducerPath: 'customersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001', prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  } }),
  endpoints: builder => ({
    getCustomers: builder.query({
      query: () => '/customers',
      transformResponse: responseData => {
        const transformedData = responseData.map(customer => ({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          address: customer.address,
          phoneNumber: customer.phoneNumber,
          deviceDetails: customer.deviceDetails,
        }));

        return transformedData;
      },
    }),
  }),
});

export const { useGetCustomersQuery } = customersApi;