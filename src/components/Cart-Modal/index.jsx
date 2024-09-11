import React, { forwardRef, Fragment, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutModal from "../Checkout-Modal";

export const CartModal = forwardRef(function CartModal(
  { cartItems },
  ref
) {
  const dispatch = useDispatch();
  const totalPrice = useSelector((state) => state.totalPrice);
  const checkoutModalRef=useRef()
  const handleCheckout=()=>{
    ref.current.close()
    checkoutModalRef.current.showModal()
  }
  return createPortal(
    <Fragment>
      <dialog ref={ref} className="modal">
        {cartItems.length > 0 ? (
          <>
            <h2>Your Cart</h2>
            <ul>
              {cartItems.map((item, index) => {
                return (
                  <li className="cart-item" key={index}>
                    <p>
                      {item.name} - {item.quantity} x {item.price}
                    </p>
                    <div className="cart-item-actions">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({ type: "removeFromCart", itemId: item.id })
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({ type: "addToCart", item: item })
                        }
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <span className="cart-total">${totalPrice}</span>
            <div className="modal-actions">
              <button
                className="text-button"
                onClick={() => ref.current.close()}
              >
                Close
              </button>
              <button className="button" onClick={handleCheckout}>Go To Checkout</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="empty-cart">Your Cart Is Empty!</h2>
            <div className="modal-actions">
              <button className="button" onClick={() => ref.current.close()}>
                Close
              </button>
            </div>
          </>
        )}
      </dialog>
      <CheckoutModal ref={checkoutModalRef}/>
    </Fragment>,
    document.getElementById("modal")
  );
});
