<<<<<<< HEAD
import { Suspense } from "react";
import ReturnPageContent from "./ReturnPageContent";
export const dynamic = "force-dynamic";

const ReturnPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReturnPageContent />;
    </Suspense>
=======
"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useCartStore } from "@/store/cartStore";
import axios from "axios";
import { CircleCheck, CircleX } from "lucide-react";
import { useSearchParams } from "next/navigation";


const ReturnPage = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;
      const res = await axios(
        `/api/stripe/checkout-session?session_id=${sessionId}`
      );
      setPaymentStatus(res.data.payment_status);

      if (res.data.payment_status === "paid") {
        clearCart();
      }
    };
    fetchSession();
  }, [sessionId, clearCart]);

  return (
    
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex h-full w-full items-center justify-center"
      >
        {paymentStatus === "paid" && (
          <div className="flex flex-col items-center justify-center gap-4">
            <span>
              <CircleCheck className="w-30 h-30 text-lime-400" />
            </span>
            <h1 className="text-3xl text-zinc-600">ชำระเงิน สำเร็จ</h1>
          </div>
        )}
        {paymentStatus === "unpaid" && (
          <div className="flex flex-col items-center justify-center gap-4">
            <span>
              <CircleX className="w-30 h-30 text-red-400" />
            </span>
            <h1 className="text-3xl text-zinc-600">ชำระเงิน ไม่สำเร็จ</h1>
          </div>
        )}
        {paymentStatus === "error" && (
          <div className="flex flex-col items-center justify-center gap-4">
            <span>
              <CircleX className="w-30 h-30 text-red-400" />
            </span>
            <h1 className="text-3xl text-zinc-600">
              เกิดข้อผิดพลาดในการตรวจสอบ
            </h1>
          </div>
        )}
      </motion.div>
>>>>>>> 6277ac9e3a2e18893c6de4d8f5cc8b08cfef143e
  );
};

export default ReturnPage;
