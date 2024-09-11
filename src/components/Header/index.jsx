import React, { Fragment, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.jpg";
import { useSelector } from "react-redux";
import { CartModal } from "../Cart-Modal";
export const Header = () => {
  const cartItems = useSelector((state) => state.items);
  const cartItemsCount = useSelector(state=>state.count)
  const modalRef = useRef();
  const handleClose = () => {
    modalRef.current.closeModal()
  };
  const handleOpen = () => {
    modalRef.current.showModal()
  };

 
  return (
    <Fragment>
      <CartModal
        ref={modalRef}
        isModalOpen={handleOpen}
        handleClose={handleClose}
        cartItems={cartItems}
      />
      <div id="main-header">
        <div id="title">
          <img src={logo} />
          <h1>Fast Feast</h1>
        </div>
        <div className="cart">
          <h3 onClick={handleOpen}>Cart ({cartItemsCount})</h3>
        </div>
      </div>
    </Fragment>
  );
};
