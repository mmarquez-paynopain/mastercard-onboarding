"use client";

import { useEffect, useState } from "react";
import PaymentForm from "../payment-form";

export default function Page() {
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

  return <PaymentForm />;
}
