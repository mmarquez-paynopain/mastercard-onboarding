import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mastercard ClickToPay onboarding",
  description: "Mastercard ClickToPay onboarding",
  generator: "PaynoPain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated">
      <head>
        <link
          rel="stylesheet"
          href="https://src.mastercard.com/srci/integration/components/src-ui-kit/src-ui-kit.css"
        />
        <script
          type="module"
          src="https://src.mastercard.com/srci/integration/components/src-ui-kit/src-ui-kit.esm.js"
        ></script>
        <script src="https://src.mastercard.com/srci/integration/2/lib.js?srcDpaId=f8b5c36f-efd6-409a-8102-588dc785d707&locale=es_ES"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
