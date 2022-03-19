import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51Ka9YiCCpYPvPp5QeH0C2FGXPTLjZgPILAe6LY1F5dZeKqWI5m38q8B5waGlf4qzpIOVBcHQ7wgQIaJkMbRLwwMq00QISBud4u";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment Successful");
      })
      .catch((error) => {
        console.log("Payment error:", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please make sure you are using the provided credit card"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
