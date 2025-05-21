"use client";

import { useEffect, useState } from "react";
import PaymentForm from "../payment-form";

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch((process.env.NEXT_PUBLIC_PAYLANDS_URL + "/payment") as string, {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.NEXT_PUBLIC_PAYLANDS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signature: process.env.NEXT_PUBLIC_PAYLANDS_SIGNATURE,
        amount: 0,
        operative: "AUTHORIZATION",
        secure: true,
        customer_ext_id: "mastercard_clicktopay_onboarding",
        currency: "EUR",
        service: process.env.NEXT_PUBLIC_PAYLANDS_SERVICE,
        description: "mastercard clicktopay onboarding",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.order?.token ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    window.mcCheckoutService = new MastercardCheckoutServices();

    const initParams = {
      srcDpaId: "1cc38e29-2bf8-4318-8a98-8aad0a51c840_dpa0",
      cardBrands: ["mastercard", "visa"],
      dpaTransactionOptions: {
        dpaAcceptedBillingCountries: [],
        dpaAcceptedShippingCountries: [],
        dpaBillingPreference: "NONE",
        dpaShippingPreference: "NONE",
        dpaLocale: "es_ES",
        consumerNameRequested: false,
        consumerEmailAddressRequested: false,
        consumerPhoneNumberRequested: false,
        threeDsPreference: "NONE",
        authenticationPreferences: {
          payloadRequested: "AUTHENTICATED",
        },
        merchantCategoryCode: "0001",
        merchantCountryCode: "ES",
        acquirerBIN: "545301",
        acquirerMerchantId: "SRC3DS",
        paymentOptions: [
          {
            dpaDynamicDataTtlMinutes: 15,
            dynamicDataType: "CARD_APPLICATION_CRYPTOGRAM_SHORT_FORM",
          },
        ],
        confirmPayment: false,
        transactionAmount: {
          transactionAmount: 0,
          transactionCurrencyCode: "EUR",
        },
      },
      dpaData: {
        dpaName: "PaynoPain",
        dpaPresentationName: "PaynoPain",
      },
      checkoutExperience: "WITHIN_CHECKOUT",
    };

    console.log(
      "Initializing Mastercard Checkout Services with params:",
      initParams
    );

    window.mcCheckoutService.init(initParams);
  }, []);

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span>Cargando...</span>
        </div>
      ) : (
        <PaymentForm token={token} />
      )}
    </>
  );
}
