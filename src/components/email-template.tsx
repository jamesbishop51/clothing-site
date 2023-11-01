import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  total: number;
  cart: Array<{
    product: {
      code: string;
      Price: number;
    };
    colour: {
      Name: string;
    };
    quantity: number;
  }>;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  total,
  cart,
  email,
  address,
  city,
  state,
  postalCode,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <h2>Your Order:</h2>
    <p>Total Price: {total}</p>
    <h3>Cart Items:</h3>
    {cart.map((item, index) => (
      <div key={index}>
        <p>Item {index + 1}:</p>
        <p>Product Code: {item.product.code}</p>
        <p>Product Color Name: {item.colour.Name}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Total Price: {item.product.Price * item.quantity}</p>
      </div>
    ))}
    <h3>Shipping Info:</h3>
    <p>Email: {email}</p>
    <p>Shipping Address: {address}</p>
    <p>City: {city}</p>
    <p>State/Province: {state}</p>
    <p>Postal Code: {postalCode}</p>
  </div>
);
