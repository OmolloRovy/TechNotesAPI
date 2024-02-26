import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectPaymentById } from './paymentsApiSlice'

import React from 'react'

const Payment = ({paymentId}) => {
  const payment = useSelector(state => selectPaymentById(state, paymentId))

  const navigate = useNavigate()

  if (payment) {
      const created = new Date(payment.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

      const updated = new Date(payment.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

      const handleEdit = () => navigate(`/dash/payments/${paymentId}`)

      return (
          <tr className="table__row">
              <td className="table__cell note__username">{payment.name}</td>
              <td className="table__cell note__username">{payment.amountPaid}</td>
              <td className="table__cell note__username">{payment.change}</td>
              <td className="table__cell note__username">{payment.otherMethod}</td>
              <td className="table__cell note__created">{created}</td>
              <td className="table__cell note__updated">{updated}</td>
            
              <td className="table__cell">
                  <button
                      className="icon-button table__button"
                      onClick={handleEdit}
                  >
                      <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
              </td>
          </tr>
      )

  } else return null
}

export default Payment