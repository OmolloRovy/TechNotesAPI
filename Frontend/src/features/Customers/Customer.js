
import { useNavigate } from 'react';
import { useSelector } from 'react-redux';
import { selectCustomerById } from './customersApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"

import React from 'react'

const Customer = ({customerId}) => {
    const customer = useSelector((state) => selectCustomerById(state, customerId));
    const navigate = useNavigate()
    if (customer){
        const handleEdit = () => navigate(`/dash/customers/${customerId}`)
        const cellStatus = customer.active ? '' : 'table__cell--inactive'
        return (
            <tr className="table__row user">
                <td className={`table__cell`}>{customer.name}</td>
                <td className={`table__cell ${cellStatus}`}>{customer.email}</td>
                <td className={`table__cell`}>{customer.address}</td>
                <td className={`table__cell`}>{customer.phone_number}</td>
                <td className={`table__cell`}>{customer.device_details}</td>
                <td className={`table__cell`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    }else return null
}

export default Customer
