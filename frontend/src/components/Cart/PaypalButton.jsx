import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PaypalButtonWrapper = ({ amount, onSuccess, onError }) => {
  const [{ isPending, isResolved }] = usePayPalScriptReducer();

  if (isPending || !isResolved) {
    return <div>Loading PayPal...</div>;
  }

  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) =>
        actions.order.create({
          purchase_units: [
            {
              amount: { value: amount.toFixed(2) },
            },
          ],
        })
      }
      onApprove={(data, actions) =>
        actions.order.capture().then(onSuccess)
      }
      onError={onError}
    />
  );
};

export default PaypalButtonWrapper;
