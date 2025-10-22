// api/create-preference.js Vercel
import mercadopago from "mercadopago";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const { items } = body;
    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ error: "Items vacíos" });
    }
    if (!process.env.MP_ACCESS_TOKEN) {
      return res.status(500).json({ error: "Falta MP_ACCESS_TOKEN" });
    }

    mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

    const preference = {
      items: items.map(i => ({
        title: String(i.title || "Servicio"),
        quantity: Number(i.qty || 1),
        currency_id: "CLP",
        unit_price: Number(i.price || 0),
      })),
      back_urls: {
        success: process.env.MP_SUCCESS_URL || "http://localhost:5173/checkout/success",
        failure: process.env.MP_FAILURE_URL || "http://localhost:5173/checkout",
        pending: process.env.MP_PENDING_URL || "http://localhost:5173/checkout",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    return res.status(200).json({ init_point: response.body.init_point });
  } catch (err) {
    console.error("MP error", err);
    return res.status(500).json({ error: "Server error" });
  }
}
