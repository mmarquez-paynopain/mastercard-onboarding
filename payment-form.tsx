"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  Check,
  ChevronDown,
  CreditCard,
  Lock,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en_US", label: "English (US)", flag: "🇺🇸" },
  { code: "it_IT", label: "Italiano", flag: "🇮🇹" },
  { code: "es_ES", label: "Español", flag: "🇪🇸" },
  { code: "fr_FR", label: "Français", flag: "🇫🇷" },
  { code: "de_DE", label: "Deutsch", flag: "🇩🇪" },
];

const translations = {
  en_US: {
    back: "Back",
    registerClickToPay: "Register for Click to Pay",
    cardholderName: "Cardholder's name",
    cardholderSurname: "Cardholder's surname",
    cardNumber: "Card number",
    expirationDate: "Expiration Date",
    cvvSecurityCode: "CVV security code",
    cardholderAddress: "Cardholder's address",
    privacyPolicy: "Privacy Policy",
    enroll: "Enroll",
    cookiePolicy: "Cookie Policy",
    accessibilityStatement: "Accessibility statement",
    namePlaceholder: "Name",
    lastNamePlaceholder: "Last Name",
    cardNumberPlaceholder: "0000 0000 0000 0000",
    expirationPlaceholder: "MM/YY",
    cvvPlaceholder: "000",
    emailPlaceholder: "name@email.com",
    poweredBy: "Powered By",
    registrationSuccessTitle: "Registration completed!",
    registrationSuccessMessage:
      "Your card has been successfully registered in Click to Pay.",
    registerAnotherCard: "Register another card",
  },
  it_IT: {
    back: "Indietro",
    registerClickToPay: "Registrati a Click to Pay",
    cardholderName: "Nome del titolare",
    cardholderSurname: "Cognome del titolare",
    cardNumber: "Numero della carta",
    expirationDate: "Data di scadenza",
    cvvSecurityCode: "Codice di sicurezza CVV",
    cardholderAddress: "Indirizzo del titolare",
    privacyPolicy: "Informativa sulla privacy",
    enroll: "Registrati",
    cookiePolicy: "Politica dei cookie",
    accessibilityStatement: "Dichiarazione di accessibilità",
    namePlaceholder: "Nome",
    lastNamePlaceholder: "Cognome",
    cardNumberPlaceholder: "0000 0000 0000 0000",
    expirationPlaceholder: "MM/AA",
    cvvPlaceholder: "000",
    emailPlaceholder: "nome@email.com",
    poweredBy: "Offerto da",
    registrationSuccessTitle: "Registrazione completata!",
    registrationSuccessMessage:
      "La tua carta è stata registrata correttamente in Click to Pay.",
    registerAnotherCard: "Registrare un'altra carta",
  },
  es_ES: {
    back: "Atrás",
    registerClickToPay: "Regístrate en Click to Pay",
    cardholderName: "Nombre del titular",
    cardholderSurname: "Apellido del titular",
    cardNumber: "Número de tarjeta",
    expirationDate: "Fecha de caducidad",
    cvvSecurityCode: "Código de seguridad CVV",
    cardholderAddress: "Dirección del titular",
    privacyPolicy: "Política de privacidad",
    enroll: "Inscribirse",
    cookiePolicy: "Política de cookies",
    accessibilityStatement: "Declaración de accesibilidad",
    namePlaceholder: "Nombre",
    lastNamePlaceholder: "Apellido",
    cardNumberPlaceholder: "0000 0000 0000 0000",
    expirationPlaceholder: "MM/AA",
    cvvPlaceholder: "000",
    emailPlaceholder: "nombre@email.com",
    poweredBy: "Desarrollado por",
    registrationSuccessTitle: "¡Registro completado!",
    registrationSuccessMessage:
      "Tu tarjeta ha sido registrada correctamente en Click to Pay.",
    registerAnotherCard: "Registrar otra tarjeta",
  },
  fr_FR: {
    back: "Retour",
    registerClickToPay: "Inscrivez-vous à Click to Pay",
    cardholderName: "Nom du titulaire",
    cardholderSurname: "Prénom du titulaire",
    cardNumber: "Numéro de carte",
    expirationDate: "Date d'expiration",
    cvvSecurityCode: "Code de sécurité CVV",
    cardholderAddress: "Adresse du titulaire",
    privacyPolicy: "Politique de confidentialité",
    enroll: "S'inscrire",
    cookiePolicy: "Politique des cookies",
    accessibilityStatement: "Déclaration d'accessibilité",
    namePlaceholder: "Nom",
    lastNamePlaceholder: "Prénom",
    cardNumberPlaceholder: "0000 0000 0000 0000",
    expirationPlaceholder: "MM/AA",
    cvvPlaceholder: "000",
    emailPlaceholder: "nom@email.com",
    poweredBy: "Propulsé par",
    registrationSuccessTitle: "Inscription terminée !",
    registrationSuccessMessage:
      "Votre carte a été enregistrée avec succès dans Click to Pay.",
    registerAnotherCard: "Enregistrer une autre carte",
  },
  de_DE: {
    back: "Zurück",
    registerClickToPay: "Registrieren für Click to Pay",
    cardholderName: "Name des Karteninhabers",
    cardholderSurname: "Nachname des Karteninhabers",
    cardNumber: "Kartennummer",
    expirationDate: "Ablaufdatum",
    cvvSecurityCode: "CVV-Sicherheitscode",
    cardholderAddress: "Adresse des Karteninhabers",
    privacyPolicy: "Datenschutzrichtlinie",
    enroll: "Registrieren",
    cookiePolicy: "Cookie-Richtlinie",
    accessibilityStatement: "Barrierefreiheitserklärung",
    namePlaceholder: "Name",
    lastNamePlaceholder: "Nachname",
    cardNumberPlaceholder: "0000 0000 0000 0000",
    expirationPlaceholder: "MM/JJ",
    cvvPlaceholder: "000",
    emailPlaceholder: "name@email.com",
    poweredBy: "Unterstützt von",
    registrationSuccessTitle: "Registrierung abgeschlossen!",
    registrationSuccessMessage:
      "Ihre Karte wurde erfolgreich bei Click to Pay registriert.",
    registerAnotherCard: "Eine weitere Karte registrieren",
  },
};

export default function PaymentForm() {
  const [selectedLanguage, setSelectedLanguage] = useState("es_ES");
  const t = translations[selectedLanguage];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showIframe, setShowIframe] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const storedLang =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedLanguage")
        : null;
    if (storedLang) setSelectedLanguage(storedLang);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", selectedLanguage);
    }
  }, [selectedLanguage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log("Token received:", data.order?.token);

        const [panExpirationMonth, panExpirationYear] = expiryDate.split("/");

        try {
          const encrypted = await window.mcCheckoutService.encryptCard({
            primaryAccountNumber: cardNumber,
            panExpirationMonth,
            panExpirationYear,
            cardSecurityCode: cvv,
            cardholderFirstName: firstName,
            cardholderLastName: lastName,
          });
          console.log("Card encrypted successfully:", encrypted);

          setShowIframe(true);

          setTimeout(async () => {
            try {
              if (iframeRef.current && iframeRef.current.contentWindow) {
                const payload =
                  await window.mcCheckoutService.checkoutWithNewCard({
                    windowRef: iframeRef.current.contentWindow,
                    encryptedCard: encrypted.encryptedCard,
                    cardBrand: encrypted.cardBrand,
                    recognitionTokenRequested: true,
                    rememberMe: true,
                    consumer: {
                      emailAddress: email,
                      firstName: firstName,
                      lastName: lastName,
                    },
                    dpaTransactionOptions: {
                      dpaAcceptedBillingCountries: [],
                      dpaAcceptedShippingCountries: [],
                      dpaBillingPreference: "NONE",
                      dpaShippingPreference: "NONE",
                      dpaLocale: selectedLanguage,
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
                          dynamicDataType:
                            "CARD_APPLICATION_CRYPTOGRAM_SHORT_FORM",
                        },
                      ],
                      confirmPayment: false,
                      transactionAmount: {
                        transactionAmount: 0,
                        transactionCurrencyCode: "EUR",
                      },
                    },
                  });

                const checkoutActionCode = payload.checkoutActionCode;
                if ("COMPLETE" === checkoutActionCode) {
                  console.log("Checkout with card successful:", payload);

                  fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      token: data.order?.token,
                      payload: JSON.stringify(payload),
                    }),
                  })
                    .then((response) => response.json())
                    .then(async (data) => {
                      console.log("Payment response:", data);
                      setShowIframe(false);
                      setRegistrationSuccess(true);
                    })
                    .catch((error) => {
                      console.error("Error during payment:", error);
                      setShowIframe(false);
                    });
                } else {
                  console.log("Checkout with card not completed:", payload);
                  setShowIframe(false);
                }
              } else {
                console.error("No se pudo obtener la referencia del iframe.");
                setShowIframe(false);
              }
            } catch (error) {
              console.error("Error in checkoutWithNewCard:", error);
              setShowIframe(false);
            }
          }, 300);
        } catch (error) {
          console.error("Error with checkout:", error);
          setShowIframe(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching token:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {registrationSuccess ? (
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <Card className="p-8 flex flex-col items-center">
              <Check className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-center">
                {t.registrationSuccessTitle}
              </h2>
              <p className="text-gray-700 text-center mb-4">
                {t.registrationSuccessMessage}
              </p>
              <Button
                className="mt-2"
                onClick={() => setRegistrationSuccess(false)}
              >
                {t.registerAnotherCard}
              </Button>
            </Card>
          </div>
        </main>
      ) : (
        <>
          <header className="w-full max-w-3xl mx-auto p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 flex items-center"></div>
            </div>
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center text-gray-700"
                  >
                    {
                      languages.find((lang) => lang.code === selectedLanguage)
                        ?.flag
                    }{" "}
                    {
                      languages.find((lang) => lang.code === selectedLanguage)
                        ?.label
                    }
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      className="flex items-center justify-between"
                      onClick={() => setSelectedLanguage(language.code)}
                    >
                      <span>
                        {language.flag} {language.label}
                      </span>
                      {selectedLanguage === language.code && (
                        <Check className="h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
              <div className="bg-black rounded-lg p-4 mb-4 flex items-center justify-center">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    <div className="w-8 h-8 rounded-full bg-red-500"></div>
                    <div className="w-8 h-8 rounded-full bg-yellow-500 -ml-4"></div>
                  </div>
                  <span className="text-white">{t.registerClickToPay}</span>
                </div>
              </div>

              <Card className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t.cardholderName}
                      </label>
                      <Input
                        id="firstName"
                        placeholder={t.namePlaceholder}
                        className="border-gray-300"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t.cardholderSurname}
                      </label>
                      <Input
                        id="lastName"
                        placeholder={t.lastNamePlaceholder}
                        className="border-gray-300"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t.cardNumber}
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="cardNumber"
                        placeholder={t.cardNumberPlaceholder}
                        className="pl-10 border-gray-300"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t.expirationDate}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="expiryDate"
                          placeholder={t.expirationPlaceholder}
                          className="pl-10 border-gray-300"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t.cvvSecurityCode}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="cvv"
                          placeholder={t.cvvPlaceholder}
                          className="pl-10 border-gray-300"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t.cardholderAddress}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={t.emailPlaceholder}
                        className="pl-10 border-gray-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <Link
                      href="https://www.mastercard.us/en-us/vision/corp-responsibility/commitment-to-privacy/privacy.html"
                      target="_blank"
                      className="text-[#ee1b4e] text-sm hover:underline"
                    >
                      {t.privacyPolicy}
                    </Link>
                    <Button
                      type="submit"
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                    >
                      {t.enroll}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </main>

          {showIframe && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <iframe
                ref={iframeRef}
                id="clicktopay-modal"
                width="480"
                height="600"
                title="Click to Pay"
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                }}
              ></iframe>
            </div>
          )}

          <footer className="w-full max-w-3xl mx-auto p-4 flex justify-center items-center border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-[#ee1b4e]">
              <span>{t.poweredBy}</span>
              <Link
                href="https://paynopain.com"
                target="_blank"
                className="flex items-center hover:underline"
              >
                <span className="font-semibold">PaynoPain</span>
              </Link>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
