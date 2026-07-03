import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Fácil de cambiar
const BRAND_NAME = `Markvera`;
const BRAND_URL = `https://markvera.com`;
const SUPPORT_EMAIL = `sales@clickential.com.mx`;
const BRAND_LOGO = `https://nexorithm.com.mx/title-dark.png`;
const PRODUCT_IMAGE="https://nexorithm.com.mx/logo-dark.png"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
}

function escapeHtml(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shell(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>${BRAND_NAME}</title>
      </head>
      <body
        style="
          margin:0;
          padding:0;
          background:
            radial-gradient(circle at top left, rgba(236,72,153,0.16), transparent 24%),
            radial-gradient(circle at top right, rgba(168,85,247,0.14), transparent 28%),
            radial-gradient(circle at bottom center, rgba(99,102,241,0.10), transparent 30%),
            #05050a;
          font-family: Arial, Helvetica, sans-serif;
          color:#ffffff;
        "
      >
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="background:#05050a; padding:28px 14px;"
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  max-width:720px;
                  width:100%;
                  border-collapse:separate;
                  border-spacing:0;
                "
              >
                ${content}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function heroBlock(badge: string, title: string, subtitle: string) {
  return `
    <tr>
      <td
        style="
          padding:0;
          background:
            linear-gradient(135deg, rgba(8,8,16,1) 0%, rgba(15,10,28,1) 52%, rgba(38,16,65,1) 100%);
          border:1px solid rgba(236,72,153,0.18);
          border-bottom:none;
        "
      >
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding:30px 32px 24px 32px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td valign="top">
                    <div
                      style="
                        display:inline-block;
                        margin-bottom:14px;
                        padding:8px 14px;
                        background:rgba(168,85,247,0.12);
                        border:1px solid rgba(168,85,247,0.28);
                        color:#e9d5ff;
                        font-size:11px;
                        font-weight:800;
                        letter-spacing:0.16em;
                        text-transform:uppercase;
                      "
                    >
                      ${escapeHtml(badge)}
                    </div>

                    <h1
                      style="
                        margin:0;
                        font-size:34px;
                        line-height:1.03;
                        letter-spacing:-0.04em;
                        color:#ffffff;
                        font-weight:900;
                      "
                    >
                      ${escapeHtml(title)}
                    </h1>

                    <p
                      style="
                        margin:14px 0 0 0;
                        max-width:560px;
                        font-size:15px;
                        line-height:1.8;
                        color:rgba(255,255,255,0.76);
                      "
                    >
                      ${escapeHtml(subtitle)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px 32px;">
              <div
                style="
                  height:1px;
                  background:linear-gradient(90deg, transparent, rgba(236,72,153,0.85), rgba(168,85,247,0.9), transparent);
                "
              ></div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function sectionStart() {
  return `
    <tr>
      <td
        style="
          padding:0;
          background:#070810;
          border-left:1px solid rgba(236,72,153,0.12);
          border-right:1px solid rgba(236,72,153,0.12);
        "
      >
  `;
}

function sectionEnd() {
  return `
      </td>
    </tr>
  `;
}

function footerBlock() {
  return `
    <tr>
      <td
        style="
          padding:0;
          background:linear-gradient(180deg, rgba(7,8,16,1) 0%, rgba(3,4,9,1) 100%);
          border:1px solid rgba(236,72,153,0.12);
          border-top:none;
        "
      >
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding:26px 32px 28px 32px;">
              <div
                style="
                  height:1px;
                  margin-bottom:18px;
                  background:linear-gradient(90deg, transparent, rgba(236,72,153,0.7), rgba(168,85,247,0.8), transparent);
                "
              ></div>

              <p
                style="
                  margin:0;
                  font-size:12px;
                  line-height:1.8;
                  color:rgba(255,255,255,0.62);
                  text-align:center;
                "
              >
                ${BRAND_NAME} · desarrollo de software y aplicaciones a medida.
              </p>

              <p
                style="
                  margin:8px 0 0 0;
                  font-size:11px;
                  line-height:1.7;
                  color:rgba(255,255,255,0.42);
                  text-align:center;
                "
              >
                © 2026 · ${BRAND_NAME}
              </p>

              <div style="margin-top:20px; text-align:center;">
                <a href="${BRAND_URL}" style="text-decoration:none;">
                  <img
                    src="${BRAND_LOGO}"
                    alt="${BRAND_NAME}"
                    style="display:block; margin:0 auto; max-width:180px; width:180px; height:auto; border:0;"
                  />
                </a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

function infoGrid(items: { label: string; value: string; href?: string }[]) {
  const cells = items
    .map(
      (item) => `
        <td valign="top" style="padding:0 8px 0 0;">
          <table
            role="presentation"
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="
              background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
              border:1px solid rgba(236,72,153,0.14);
            "
          >
            <tr>
              <td style="padding:18px 18px 16px 18px;">
                <p
                  style="
                    margin:0 0 7px 0;
                    font-size:11px;
                    line-height:1;
                    letter-spacing:0.16em;
                    text-transform:uppercase;
                    font-weight:800;
                    color:rgba(233,213,255,0.95);
                  "
                >
                  ${escapeHtml(item.label)}
                </p>
                ${
                  item.href
                    ? `<a href="${escapeHtml(item.href)}" style="font-size:15px; line-height:1.6; color:#ffffff; text-decoration:none; font-weight:700;">${escapeHtml(item.value)}</a>`
                    : `<p style="margin:0; font-size:15px; line-height:1.6; color:#ffffff; font-weight:700;">${escapeHtml(item.value)}</p>`
                }
              </td>
            </tr>
          </table>
        </td>
      `
    )
    .join("");

  return `
    <table
      role="presentation"
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="margin-top:22px; table-layout:fixed;"
    >
      <tr>
        ${cells}
      </tr>
    </table>
  `;
}

function formatOrderItem(item: any) {
  const source = item?.product ?? item ?? {};
  const qty = Number(item?.quantity ?? item?.qty ?? 1);
  const unitPrice = Number(source?.price ?? item?.price ?? 0);
  const total = unitPrice * qty;

  const name = escapeHtml(String(source?.name ?? item?.name ?? "Servicio"));
  const description = escapeHtml(
    String(
      source?.description ??
        source?.specs?.[0] ??
        item?.description ??
        "Solución digital pensada para productividad, escalabilidad y rendimiento."
    )
  );
  const image = String(source?.image ?? item?.image ?? PRODUCT_IMAGE);

  return `
    <table
      role="presentation"
      width="100%"
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="
        margin-bottom:20px;
        overflow:hidden;
        border:1px solid rgba(255,255,255,0.08);
        background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
      "
    >
      <tr>
        <td style="padding:18px;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td valign="top" style="width:120px; padding-right:16px;">
                <img
                  src="${escapeHtml(image)}"
                  alt="${name}"
                  width="120"
                  height="120"
                  style="
                    display:block;
                    width:120px;
                    height:120px;
                    object-fit:cover;
                    border-radius:18px;
                    border:1px solid rgba(255,255,255,0.08);
                  "
                />
              </td>

              <td valign="top">
                <div
                  style="
                    display:inline-block;
                    margin-bottom:10px;
                    padding:7px 12px;
                    background:rgba(236,72,153,0.10);
                    border:1px solid rgba(236,72,153,0.20);
                    color:#f9a8d4;
                    font-size:11px;
                    font-weight:800;
                    letter-spacing:0.16em;
                    text-transform:uppercase;
                  "
                >
                  Servicio contratado
                </div>

                <h3
                  style="
                    margin:0 0 8px 0;
                    font-size:21px;
                    line-height:1.12;
                    color:#ffffff;
                    font-weight:900;
                    letter-spacing:-0.03em;
                  "
                >
                  ${name}
                </h3>

                <p
                  style="
                    margin:0 0 16px 0;
                    font-size:14px;
                    line-height:1.8;
                    color:rgba(255,255,255,0.72);
                  "
                >
                  ${description}
                </p>

                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td valign="top">
                      <p
                        style="
                          margin:0 0 4px 0;
                          font-size:11px;
                          color:rgba(255,255,255,0.48);
                          text-transform:uppercase;
                          letter-spacing:0.08em;
                          font-weight:700;
                        "
                      >
                        Cantidad
                      </p>
                      <p style="margin:0; font-size:18px; color:#ffffff; font-weight:900;">
                        ${qty}
                      </p>
                    </td>

                    <td align="right" valign="top">
                      <p
                        style="
                          margin:0 0 4px 0;
                          font-size:11px;
                          color:rgba(255,255,255,0.48);
                          text-transform:uppercase;
                          letter-spacing:0.08em;
                          font-weight:700;
                        "
                      >
                        Total
                      </p>
                      <p style="margin:0; font-size:22px; color:#e9d5ff; font-weight:900; letter-spacing:-0.03em;">
                        ${formatCurrency(total)}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { orderId, amount, customer, items, metadata } = body;

    if (!orderId || !amount || !customer || !items || !items.length) {
      return NextResponse.json(
        { error: "Información de orden incompleta." },
        { status: 400 }
      );
    }

    const fullName = String(
      [customer.nombre, customer.apellido].filter(Boolean).join(" ")
    ).trim();

    const customerAddressExtra = customer.direccion2
      ? `, ${escapeHtml(String(customer.direccion2))}`
      : "";

    const orderNote = escapeHtml(String(metadata?.notes || "Sin notas"));

    const itemsHTML = items.map(formatOrderItem).join("");

    const customerHtml = shell(`
      ${heroBlock(
        `Orden #${escapeHtml(String(orderId))}`,
        "Confirmación de compra",
        "Tu pago fue aprobado. Ya estamos procesando tu servicio y preparando el siguiente paso contigo."
      )}

      ${sectionStart()}
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="padding:34px;"
        >
          <tr>
            <td>
              <h2
                style="
                  margin:0 0 10px 0;
                  font-size:30px;
                  line-height:1.08;
                  letter-spacing:-0.04em;
                  color:#ffffff;
                "
              >
                Gracias por tu compra, ${escapeHtml(fullName || String(customer.nombre || ""))}
              </h2>

              <p
                style="
                  margin:0;
                  font-size:15px;
                  line-height:1.85;
                  color:rgba(255,255,255,0.76);
                "
              >
                Hemos recibido y verificado tu pago con éxito. Tu orden ya quedó registrada en ${BRAND_NAME}.
              </p>

              ${infoGrid([
                { label: "Orden", value: `#${String(orderId)}` },
                { label: "Estado", value: "Pago confirmado" },
              ])}
            </td>
          </tr>

          <tr>
            <td style="padding-top:24px;">
              ${itemsHTML}
            </td>
          </tr>

          <tr>
            <td>
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  margin-top:6px;
                  overflow:hidden;
                  border:1px solid rgba(56,189,248,0.18);
                  background:linear-gradient(180deg, rgba(168,85,247,0.10), rgba(236,72,153,0.05));
                "
              >
                <tr>
                  <td style="padding:22px;">
                    <p
                      style="
                        margin:0 0 8px 0;
                        font-size:11px;
                        color:#f9a8d4;
                        font-weight:800;
                        letter-spacing:0.16em;
                        text-transform:uppercase;
                      "
                    >
                      Total pagado
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:40px;
                        line-height:1;
                        color:#ffffff;
                        font-weight:900;
                        letter-spacing:-0.05em;
                      "
                    >
                      ${formatCurrency(Number(amount))}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-top:22px;">
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  overflow:hidden;
                  border:1px solid rgba(255,255,255,0.08);
                  background:rgba(255,255,255,0.03);
                "
              >
                <tr>
                  <td style="padding:22px;">
                    <p
                      style="
                        margin:0 0 10px 0;
                        font-size:11px;
                        font-weight:800;
                        color:#f9a8d4;
                        text-transform:uppercase;
                        letter-spacing:0.16em;
                      "
                    >
                      Dirección asignada
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.9;
                        color:rgba(255,255,255,0.80);
                      "
                    >
                      ${escapeHtml(String(customer.direccion || ""))}${customerAddressExtra}<br />
                      ${escapeHtml(String(customer.ciudad || ""))}, ${escapeHtml(String(customer.estado || ""))}, CP ${escapeHtml(String(customer.cp || ""))}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      ${sectionEnd()}

      ${footerBlock()}
    `);

    const internalHtml = shell(`
      ${heroBlock(
        `Orden #${escapeHtml(String(orderId))}`,
        "Nueva contratación confirmada",
        "Se registró una orden nueva desde el sitio. Revisa el detalle del cliente, el monto y el servicio contratado."
      )}

      ${sectionStart()}
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="padding:34px;"
        >
          <tr>
            <td>
              <div
                style="
                  display:inline-block;
                  margin-bottom:18px;
                  padding:8px 14px;
                  background:rgba(56,189,248,0.12);
                  border:1px solid rgba(56,189,248,0.28);
                  color:#7dd3fc;
                  font-size:11px;
                  font-weight:800;
                  letter-spacing:0.16em;
                  text-transform:uppercase;
                "
              >
                Orden interna
              </div>

              <h2
                style="
                  margin:0 0 12px 0;
                  font-size:32px;
                  line-height:1.08;
                  letter-spacing:-0.04em;
                  color:#ffffff;
                "
              >
                ${formatCurrency(Number(amount))} procesados con éxito
              </h2>

              <p
                style="
                  margin:0;
                  font-size:15px;
                  line-height:1.85;
                  color:rgba(255,255,255,0.76);
                "
              >
                La compra quedó registrada correctamente. Este correo resume al cliente, la orden y el importe pagado.
              </p>

              ${infoGrid([
                { label: "Cliente", value: String(fullName || "") },
                {
                  label: "Correo",
                  value: String(customer.email || ""),
                  href: `mailto:${String(customer.email || "")}`,
                },
                { label: "Teléfono", value: String(customer.telefono || "") },
              ])}
            </td>
          </tr>

          <tr>
            <td style="padding-top:24px;">
              ${itemsHTML}
            </td>
          </tr>

          <tr>
            <td>
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  margin-top:6px;
                  overflow:hidden;
                  border:1px solid rgba(255,255,255,0.08);
                  background:rgba(255,255,255,0.03);
                "
              >
                <tr>
                  <td style="padding:22px;">
                    <p
                      style="
                        margin:0 0 10px 0;
                        font-size:11px;
                        font-weight:800;
                        color:#f9a8d4;
                        text-transform:uppercase;
                        letter-spacing:0.16em;
                      "
                    >
                      Notas de la orden
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.9;
                        color:rgba(255,255,255,0.80);
                      "
                    >
                      ${orderNote}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-top:22px;">
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  overflow:hidden;
                  border:1px solid rgba(56,189,248,0.16);
                  background:linear-gradient(180deg, rgba(56,189,248,0.08), rgba(37,99,235,0.05));
                "
              >
                <tr>
                  <td style="padding:22px;">
                    <p
                      style="
                        margin:0 0 8px 0;
                        font-size:11px;
                        font-weight:800;
                        color:#7dd3fc;
                        text-transform:uppercase;
                        letter-spacing:0.16em;
                      "
                    >
                      Monto total
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:38px;
                        line-height:1;
                        color:#ffffff;
                        font-weight:900;
                        letter-spacing:-0.05em;
                      "
                    >
                      ${formatCurrency(Number(amount))}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-top:22px;">
              <table
                role="presentation"
                width="100%"
                border="0"
                cellspacing="0"
                cellpadding="0"
                style="
                  overflow:hidden;
                  border:1px solid rgba(255,255,255,0.08);
                  background:rgba(255,255,255,0.03);
                "
              >
                <tr>
                  <td style="padding:22px;">
                    <p
                      style="
                        margin:0 0 10px 0;
                        font-size:11px;
                        font-weight:800;
                        color:#f9a8d4;
                        text-transform:uppercase;
                        letter-spacing:0.16em;
                      "
                    >
                      Dirección del cliente
                    </p>

                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.9;
                        color:rgba(255,255,255,0.80);
                      "
                    >
                      ${escapeHtml(String(customer.direccion || ""))}${customerAddressExtra}<br />
                      ${escapeHtml(String(customer.ciudad || ""))}, ${escapeHtml(String(customer.estado || ""))}, CP ${escapeHtml(String(customer.cp || ""))}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      ${sectionEnd()}

      ${footerBlock()}
    `);

    await Promise.all([
      resend.emails.send({
        from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
        to: [String(customer.email || "")],
        subject: `Confirmación de compra #${orderId} - ${BRAND_NAME}`,
        html: customerHtml,
      }),
      resend.emails.send({
        from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
        to: [SUPPORT_EMAIL],
        replyTo: String(customer.email || ""),
        subject: `NUEVA CONTRATACIÓN #${orderId}`,
        html: internalHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error enviando correos:", error);

    return NextResponse.json(
      { error: error?.message || "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}