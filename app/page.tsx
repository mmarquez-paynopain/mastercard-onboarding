"use client";

export default function Page() {
  return (
    <iframe
      src="/payment-form-iframe"
      width="100%"
      height="1000"
      style={{ border: "none", minHeight: "900px" }}
      title="Payment Form"
      sandbox="allow-scripts allow-forms allow-same-origin"
    />
  );
}
