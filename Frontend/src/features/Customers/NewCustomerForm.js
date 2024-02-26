import React from 'react'
import { useState, useEffect } from "react"
import { useAddNewCustomerMutation } from "./customersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const USER_REGEX = /@.com/
const NewCustomerForm = () => {
  const [addNewCustomer, {
            isLoading,
            isSuccess,
            isError,
            error
        }] = useAddNewCustomerMutation()
        const navigate = useNavigate()

            const [name, setName] = useState('')
            const [email, setEmail] = useState('')
            const [validEmail, setValidEmail] = useState(false)
            const [address, setAddress] = useState('')
            const [phone_number, setPhone_number] = useState('')
            const [device_details, setDevice_details] = useState('')
 
            useEffect(() => {
              setValidEmail(USER_REGEX.test(email))
          }, [email])

          useEffect(() => {
            if (isSuccess) {
                setName('')
                setEmail('')
                setAddress('')
                setPhone_number('')
                setDevice_details('')
                navigate('/dash/customers')
            }
        }, [isSuccess, navigate])
        const onNameChanged = e => setName(e.target.value)
        const onEmailChanged = e => setEmail(e.target.value)
        const onAddressChanged = e => setAddress(e.target.value)
        const onPhone_numberChanged = e => setPhone_number(e.target.value)
        const onDevice_detailsChanged = e => setDevice_details(e.target.value)

        const canSave = [name.length, validEmail, address.length, phone_number.length, device_details.length].every(Boolean) && !isLoading

        const onSaveUserClicked = async (e) => {
          e.preventDefault()
          if (canSave) {
              await addNewCustomer({ name,email,address,phone_number,device_details })
          }
      }


  return (
    <div>NewCustomerForm</div>
  )
}

export default NewCustomerForm



// const NewUserForm = () => {

//     const [addNewUser, {
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     }] = useAddNewUserMutation()

//     const navigate = useNavigate()

//     const [username, setUsername] = useState('')
//     const [validUsername, setValidUsername] = useState(false)
//     const [password, setPassword] = useState('')
//     const [validPassword, setValidPassword] = useState(false)
//     const [roles, setRoles] = useState(["Employee"])


//     useEffect(() => {
//         setValidPassword(PWD_REGEX.test(password))
//     }, [password])// check the isSuccess status 

    

//     const onUsernameChanged = e => setUsername(e.target.value)
//     const onPasswordChanged = e => setPassword(e.target.value)

//     const onRolesChanged = e => {
//         const values = Array.from(
//             e.target.selectedOptions, //HTMLCollection 
//             (option) => option.value
//         )
//         setRoles(values)
//     }



//     const options = Object.values(ROLES).map(role => {
//         return (
//             <option
//                 key={role}
//                 value={role}

//             > {role}</option >
//         )
//     })

//     const errClass = isError ? "errmsg" : "offscreen"
//     const validUserClass = !validUsername ? 'form__input--incomplete' : ''
//     const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
//     const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


//     const content = (
//         <>
//             <p className={errClass}>{error?.data?.message}</p>

//             <form className="form" onSubmit={onSaveUserClicked}>
//                 <div className="form__title-row">
//                     <h2>New User</h2>
//                     <div className="form__action-buttons">
//                         <button
//                             className="icon-button"
//                             title="Save"
//                             disabled={!canSave}
//                         >
//                             <FontAwesomeIcon icon={faSave} />
//                         </button>
//                     </div>
//                 </div>
//                 <label className="form__label" htmlFor="username">
//                     Username: <span className="nowrap1">[3-20 letters]</span></label>
//                 <input
//                     className={`form__input ${validUserClass}`}
//                     id="username"
//                     name="username"
//                     type="text"
//                     autoComplete="off"
//                     value={username}
//                     onChange={onUsernameChanged}
//                 />

//                 <label className="form__label" htmlFor="password">
//                     Password: <span className="nowrap1">[4-12 chars incl. !@#$%]</span></label>
//                 <input
//                     className={`form__input ${validPwdClass}`}
//                     id="password"
//                     name="password"
//                     type="password"
//                     value={password}
//                     onChange={onPasswordChanged}
//                 />

//                 <label className="form__label" htmlFor="roles">
//                     ASSIGNED ROLES:</label>
//                 <select
//                     id="roles"
//                     name="roles"
//                     className={`form__select ${validRolesClass}`}
//                     multiple={true}
//                     size="3"
//                     value={roles}
//                     onChange={onRolesChanged}
//                 >
//                     {options}
//                 </select>

//             </form>
//         </>
//     )

//     return content
// }
// export default NewUserForm