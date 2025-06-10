import { Suspense } from "react";
import CheckoutPageContent from "./CheckoutPageContent";


const CheckoutPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
};
export default CheckoutPage;
