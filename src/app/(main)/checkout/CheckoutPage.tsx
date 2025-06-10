"use client"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const clientSecretData = searchParams.get("clientSecret");

  return (
    
      <div>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret: clientSecretData }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    
  );
};
export default CheckoutPage;
