import React, { forwardRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../Checkout-Field";
import { postOrder } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { resetCart } from "../../store/cartSlice";

const CheckoutModal = forwardRef((props, ref) => {
  const items = useSelector((state) => state.cart.items);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderStatus, setOrderStatus] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  };

  const onSubmit = async (values) => {
    const { message, status } = await postOrder({
      items: items,
      customer: values,
    });
    setOrderMessage(message);
    setOrderStatus(status);
    setShowAlert(true);
    ref.current.close();

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    dispatch(resetCart());
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("E-Mail Address is required")
      .email("Invalid email"),
    street: Yup.string().required("Street is required"),
    postalCode: Yup.string().required("Postal Code is required"),
    city: Yup.string().required("City is required"),
  });

  return createPortal(
    <>
      {showAlert && (
        <div className="alert">
          <Alert
            variant="filled"
            severity={orderStatus == 201 ? "success" : "error"}
          >
            {orderMessage}
          </Alert>
        </div>
      )}
      <dialog ref={ref} className="modal">
        <h2>Checkout</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <Form>
              <FormField label="Name" name="name" />
              <FormField label="E-Mail Address" name="email" />
              <FormField label="Street" name="street" />
              <div className="control-row">
                <FormField
                  label="Postal Code"
                  name="postalCode"
                  placeholder="13611"
                />
                <FormField label="City" name="city" />
              </div>
              <div className="modal-actions">
                <button
                  className="text-button"
                  type="button"
                  onClick={() => ref.current.close()}
                >
                  Close
                </button>
                <button className="button" type="submit">
                  Submit Order
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </dialog>
    </>,
    document.getElementById("modal")
  );
});

export default CheckoutModal;
