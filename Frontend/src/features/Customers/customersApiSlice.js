import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { useGetCustomersQuery } from '@reduxjs/toolkit/query';

const customersAdapter = createEntityAdapter();

const initialState = customersAdapter.getInitialState();

export const getCustomers = createAsyncThunk(
  'customers/getCustomers',
  async () => {
    const response = await client.get('/customers');
    const { data } = response;

    const transformedData = data.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      address: customer.address,
      phoneNumber: customer.phoneNumber,
      deviceDetails: customer.deviceDetails,
    }));

    return transformedData;
  }
);

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCustomers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        customersAdapter.setAll(state, action.payload);
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default customersSlice.reducer;

export const { selectAll: selectCustomers } = customersAdapter.getSelectors(
  state => state.customers
);

export useGetCustomersQuery = () => useGetCustomersQuery('customers');