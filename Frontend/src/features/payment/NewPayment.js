import { useSelector } from 'react-redux'
import { selectAllCustomers } from '../Customers/customersApiSlice'
import NewPaymentForm from './NewPaymentForm'

const NewPayment  = () => {
    const customers = useSelector(selectAllCustomers)

    if (!customers?.length) return <p>Not Currently Available</p>

    const content = <NewPaymentForm customers={customers} />

    return content
}
export default NewPayment  