import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const clientSecretData = searchParams.get("clientSecret");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret: clientSecretData }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </Suspense>
  );
};
export default CheckoutPage;
