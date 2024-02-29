import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPaymentById } from './paymentsApiSlice'
import { selectAllCustomers } from '../Customers/customersApiSlice'
import EditPaymentForm from './EditPaymentForm'
const EditPayment = () => {
  const { id } = useParams()

    const payment = useSelector(state => selectPaymentById(state, id))
    const customers = useSelector(selectAllCustomers)

    const content =payment  && customers ? <EditPaymentForm payment={payment} customers={customers} /> : <p>Loading...</p>

    return content
}

export default EditPayment