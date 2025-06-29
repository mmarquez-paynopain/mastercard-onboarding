import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(
      process.env.NEXT_PUBLIC_PAYLANDS_URL_V1 + "/payment/wallet",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYLANDS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature: process.env.NEXT_PUBLIC_PAYLANDS_SIGNATURE,
          order_uuid: body.order_uuid,
          wallet: "MASTERCARD",
          flow: "WEB",
          payload: body.payload,
        }),
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
    console.error("Error en /api/checkout:", error.message);
    return NextResponse.json(
      { error: "Error en la solicitud de pago", details: error.message },
      { status: 500 }
    );
  }
}
