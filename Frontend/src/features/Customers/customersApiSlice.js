import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const customersAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1,
});

const initialState = customersAdapter.getInitialState();

export const customersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => "/customers",
      transformResponse: (responseData) => {
        const loadedCustomers = responseData.map((customer) => {
          customer.id = customer._id;
          return customer;
        });
        return customersAdapter.setAll(initialState, loadedCustomers);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Customer", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Customer", id })),
            ]
          : [{ type: "Customer", id: "LIST" }],
    }),
    addNewCustomer: builder.mutation({
      query: (initialCustomer) => ({
        url: "/customers",
        method: "POST",
        body: initialCustomer,
      }),
      invalidatesTags: [{ type: "Customer", id: "LIST" }],
    }),
    updateCustomer: builder.mutation({
      query: (initialCustomer) => ({
        url: "/customers",
        method: "PATCH",
        body: initialCustomer,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Customer", id: arg.id }],
    }),
    deleteCustomer: builder.mutation({
      query: ({ id }) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Customer", id: arg.id }],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useAddNewCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  selectCustomerById,
} = customersApiSlice;