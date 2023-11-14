import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
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
    size:{
      Size: string;
    }
  }>;
  email: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  postalCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  total,
  cart,
  phoneNumber,
  email,
  address,
  city,
  state,
  postalCode,
}) => (
  <div>
    <h1>
      Order for: {firstName} {lastName}
    </h1>
    <h2>Your Order:</h2>
    <p>Total Price: {total}</p>
    <h3>Cart Items:</h3>
    <table
      style={{ width: "100%", textAlign: "center", border: "1px solid black" }}
    >
      <thead>
        <tr>
          <th>Item</th>
          <th>Product Code</th>
          <th>Colour</th>
          <th>Quantity</th>
          <th>Size</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.product.code}</td>
            <td>{item.colour.Name}</td>
            <td>{item.quantity}</td>
            <td>{item.size.Size}</td>
            <td>{item.product.Price * item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <h3>Shipping Info:</h3>
    <p>
      Name: {firstName} {lastName}
    </p>
    <p>Email: {email}</p> 
    <p>Phone Number: {phoneNumber}</p>
    <p>Shipping Address: {address}</p>
    <p>City: {city}</p>
    <p>County: {state}</p>
    <p>Postal Code: {postalCode}</p>
  </div>
);
