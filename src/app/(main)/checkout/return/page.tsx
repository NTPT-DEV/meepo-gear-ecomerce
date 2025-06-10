import { Suspense } from "react";
import ReturnPageContent from "./ReturnPageContent";
export const dynamic = "force-dynamic";

const ReturnPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReturnPageContent />;
    </Suspense>

  );
};

export default ReturnPage;
