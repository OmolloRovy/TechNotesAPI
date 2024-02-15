import React from 'react'

const CustomerList = () => {
  return (
    <div>CustomerList</div>
  )
}

export default CustomerList


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
// import React from "react";
// import { useGetCustomersQuery } from "./customersApiSlice";
// import Customer from "./Customer";


// const CustomerList = () => {
//   const { data, isLoading, isSuccess, isError } = useGetCustomersQuery();

//   let content;

//   if (isLoading) {
//     content = <p>Loading...</p>;
//   }

//   if (isError) {
//     content = <p className="errmsg">Error fetching customers list.</p>;
//   }

//   if (isSuccess) {
//     const { ids } = data;

//     if (ids.length > 0) {
//       content = ids.map((id) => <Customer key={id} id={id} />);
//     } else {
//       content = <p>No customers found.</p>;
//     }
//   }

//   return content;
// };

// export default CustomerList;