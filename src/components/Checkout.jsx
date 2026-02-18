import { useContext, useEffect } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import InputElement from "./InputElement";
import Button from "./Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const Checkout = () => {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const totalAmount = items.reduce((prevPrice, item) => {
    return prevPrice + item?.quantity * item?.price;
  }, 0);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const handleFinish = () => {
    (hideCheckout(), clearCart(), clearData(), notifyMe());
  };
  const handleFormSubmit = (formData) => {
    const customerData = Object.fromEntries(formData);

    try {
      sendRequest(
        JSON.stringify({
          order: {
            items,
            customer: customerData,
          },
        }),
      );
    } catch (error) {
      console.log("Failed to send order Details to backend", error);
    }
  };
  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2 style={{ color: "green" }}>Success !!</h2>
        <p>Your order Placed Successfully!!</p>
        <p>We will notifiy your order details via email.</p>
        <p className="model-action">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={progress === "checkout"} onClose={hideCheckout}>
      <form action={handleFormSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(totalAmount)}</p>

        <InputElement label="Full-Name" id="name" type="text" />
        <InputElement label="Email" type="email" id="email" />
        <InputElement label="Street" type="text" id="street" />
        <div className="control-row">
          <InputElement label="Postal Code" type="text" id="postal-code" />
          <InputElement label="City" type="text" id="city" />
        </div>

        {error && (
          <Error title="Failed to send Order details" message={error} />
        )}
        <p className="modal-actions">
          <Button
            disabled={isSending}
            type="button"
            onClick={hideCheckout}
            textOnly
          >
            Close
          </Button>
          <Button disabled={isSending === true}>
            {isSending ? "Submitting..." : "Submit"}
          </Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
