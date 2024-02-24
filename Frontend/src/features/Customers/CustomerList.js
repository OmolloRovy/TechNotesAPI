import { useGetCustomersQuery } from './customersApiSlice';
import Customer from './Customer';

const CustomerList = () => {
  const {
    data: customers,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCustomersQuery();

  // ...

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}
      {isSuccess && (
        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__username">
                Username
              </th>
              <th scope="col" className="table__th user__username">
                Name
              </th>
              <th scope="col" className="table__th user__username">
                Email
              </th>
              <th scope="col" className="table__th user__username">
                Address
              </th>
              <th scope="col" className="table__th user__username">
                Phone Number
              </th>
              <th scope="col" className="table__th user__username">
                Device Details
              </th>
              <th scope="col" className="table__th user__edit">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.ids.map((customerId) => (
              <Customer key={customerId} customerId={customerId} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CustomerList;