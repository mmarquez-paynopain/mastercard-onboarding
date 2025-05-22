"use client";

import { useEffect, useState } from "react";
import PaymentForm from "../payment-form";

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/proxy/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(async (data) => {
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
