import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const paymentParams = {
      signature: process.env.NEXT_PUBLIC_PAYLANDS_SIGNATURE,
      operative: "AUTHORIZATION",
      description: "Mastercard ClickToPay onboarding",
      amount: 0,
      service: process.env.NEXT_PUBLIC_PAYLANDS_SERVICE,
      secure: true,
      customer_ext_id: "click-to-pay-onboarding",
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_PAYLANDS_URL_V1 + "/payment",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYLANDS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentParams),
      }
    );

    const text = await response.text();
    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText} - ${text}`
      );
    }

    const result = JSON.parse(text);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error en /api/payment:", error.message);
    return NextResponse.json(
      { error: "Error en la solicitud de pago", details: error.message },
      { status: 500 }
    );
  }
}
