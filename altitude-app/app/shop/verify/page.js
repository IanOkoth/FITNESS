"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fmtPrice } from "../../lib/merch";
import { useCart } from "../../components/CartProvider";

export default function VerifyPage() {
  const { clear } = useCart();
  const [state, setState] = useState({ status: "checking" });

  useEffect(() => {
    const reference = new URLSearchParams(window.location.search).get(
      "reference"
    );
    if (!reference) {
      setState({ status: "failed" });
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `/api/checkout/verify?reference=${encodeURIComponent(reference)}`
        );
        const data = await res.json();
        if (data.status === "success") {
          clear();
          setState({ status: "success", amount: data.amount });
        } else if (data.configured === false) {
          setState({ status: "unconfigured" });
        } else {
          setState({ status: "failed" });
        }
      } catch {
        setState({ status: "failed" });
      }
    })();
    // clear is stable from context; run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="verifyWrap">
      <div className="verifyCard">
        {state.status === "checking" && (
          <>
            <h1>Confirming payment…</h1>
            <p>Hold on while we check with the payment provider.</p>
          </>
        )}
        {state.status === "success" && (
          <>
            <h1>Payment received</h1>
            <p>
              Thank you — your order is confirmed
              {state.amount ? ` (${fmtPrice(state.amount)})` : ""}. We&apos;ll be
              in touch about delivery shortly.
            </p>
            <Link className="btn btn-primary" href="/#shop">
              Back to the store
            </Link>
          </>
        )}
        {state.status === "failed" && (
          <>
            <h1>Payment not completed</h1>
            <p>
              We couldn&apos;t confirm your payment. You weren&apos;t charged, or
              the payment was cancelled. Please try again.
            </p>
            <Link className="btn btn-primary" href="/#shop">
              Back to the store
            </Link>
          </>
        )}
        {state.status === "unconfigured" && (
          <>
            <h1>Store in setup</h1>
            <p>Online payments aren&apos;t live yet. Please order on WhatsApp.</p>
            <Link className="btn btn-primary" href="/#shop">
              Back to the store
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
