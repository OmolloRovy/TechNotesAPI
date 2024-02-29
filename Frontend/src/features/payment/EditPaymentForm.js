import { useState, useEffect } from "react";
import {
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} from "./paymentsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditPaymentForm = ({ payment, customers }) => {
  const [updatePayment, { isLoading, isSuccess, isError, error }] =
    useUpdatePaymentMutation();

  const [
    deletePayment,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeletePaymentMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(payment.name);
  const [amountPaid, setAmountPaid] = useState(payment.amountPaid);
  const [change, setChange] = useState(payment.change);
  const [otherMethods, setOtherMethods] = useState(payment.otherMethods);
  const [text, setText] = useState(payment.text);
  const [customerId, setCustomerId] = useState(customers[0].id);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setAmountPaid("");
      setChange("");
      setOtherMethods("");
      setText("");
      setCustomerId("");
      navigate("/dash/payments");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onAmountPaidChanged = (e) => setAmountPaid(e.target.value);
  const onChangeChanged = (e) => setChange(e.target.value);
  const onOtherMethodsChanged = (e) => setOtherMethods(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCustomerIdChanged = (e) => setCustomerId(e.target.value);

  const canSave =
    [name, amountPaid, change, otherMethods, text, customerId].every(Boolean) &&
    !isLoading;

    const onSavePaymentClicked = async (e) => {
      e.preventDefault();
      if (canSave) {
        try {
          await updatePayment({
            customer: customerId,
            name,
            amountPaid,
            change,
            otherMethods,
            text,
          });
        } catch (err) {
          
          console.error("Error updating payment:", err);
         
        }
      }
    };

  const onDeletePaymentClicked = async () => {
    await deletePayment({ id: payment.id });
  };

  const created = new Date(payment.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(payment.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = customers.map((customer) => {
    return (
      <option key={customer.id} value={customer.id}>
        {" "}
        {customer.name}
      </option>
    );
  });
  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const validNameClass = !name ? "form__input--incomplete" : "";
  const validAmountPaidClass = !amountPaid ? "form__input--incomplete" : "";
  const validChangeClass = !change ? "form__input--incomplete" : "";
  const validOtherMethodsClass = !otherMethods ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";
  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Payment #{payment.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSavePaymentClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeletePaymentClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Customer Name
        </label>
        <input
          className={`form__input ${validNameClass}`}
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={onNameChanged}
        />
        <label className="form__label" htmlFor="title">
          Amount Paid
        </label>
        <input
          className={`form__input ${validAmountPaidClass}`}
          id="amountPaid"
          name="amountPaid"
          type="text"
          autoComplete="off"
          value={amountPaid}
          onChange={onAmountPaidChanged}
        />
        <label className="form__label" htmlFor="title">
          Return Change
        </label>
        <input
          className={`form__input ${validChangeClass}`}
          id="change"
          name="change"
          type="text"
          autoComplete="off"
          value={change}
          onChange={onChangeChanged}
        />

        <label className="form__label" htmlFor="title">
          Other Methods Used
        </label>
        <input
          className={`form__input ${validOtherMethodsClass}`}
          id="otherMethods"
          name="otherMethods"
          type="text"
          autoComplete="off"
          value={otherMethods}
          onChange={onOtherMethodsChanged}
        />

        <label className="form__label" htmlFor="text">
          Remarks{" "}
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="customername"
        >
          Payment from:{" "}
        </label>
        <select
          id="customername"
          name="customername"
          className="form__select"
          value={customerId}
          onChange={onCustomerIdChanged}
        >
          {options}
        </select>
        <div className="form__divider">
          <p className="form__created">
            Created:
            <br />
            {created}
          </p>
          <p className="form__updated">
            Updated:
            <br />
            {updated}
          </p>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditPaymentForm;
