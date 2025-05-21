import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://src.mastercard.com/srci/integration/components/src-ui-kit/src-ui-kit.css"
        />
        <script
          type="module"
          src="https://src.mastercard.com/srci/integration/components/src-ui-kit/src-ui-kit.esm.js"
        ></script>
        <script src="https://sandbox.src.mastercard.com/srci/integration/2/lib.js?srcDpaId=1cc38e29-2bf8-4318-8a98-8aad0a51c840_dpa0&locale=es_ES"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
