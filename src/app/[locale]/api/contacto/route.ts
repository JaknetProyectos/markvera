import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Fácil de cambiar
const SUPPORT_EMAIL = `sales@clickential.com.mx`;
const BRAND_NAME = `Markvera`;
const BRAND_URL = `https://markvera.com`;
const BRAND_LOGO = `https://nexorithm.com.mx/title-dark.png`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatMessage(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
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
                  max-width:700px;
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

function heroBlock(pretitle: string, title: string, subtitle: string) {
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
                      ${escapeHtml(pretitle)}
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
                  background:linear-gradient(90deg, transparent, rgba(236,72,153,0.7), rgba(168,85,247,0.8), transparent);
                  margin-bottom:18px;
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
            overflow:hidden;
          "
        >
          <tr>
            <td style="padding:18px 18px 16px 18px;">
              <p
                style="
                  margin:0 0 8px 0;
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (nombre, email, mensaje)" },
        { status: 400 }
      );
    }

    const rawNombre = String(nombre).trim();
    const rawEmail = String(email).trim();
    const rawMensaje = String(mensaje).trim();

    const safeNombre = escapeHtml(rawNombre);
    const safeEmail = escapeHtml(rawEmail);
    const safeMessage = formatMessage(rawMensaje);

    const internalHtml = shell(`
      ${heroBlock(
        "Nuevo contacto",
        "Nuevo mensaje desde Markvera",
        "Se recibió una solicitud desde el formulario de contacto del sitio. Revisa la información y da seguimiento desde tu equipo."
      )}

      ${sectionStart()}
        <table
          role="presentation"
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="padding:30px 32px 8px 32px;"
        >
          <tr>
            <td>
              <div
                style="
                  display:inline-block;
                  margin-bottom:18px;
                  padding:7px 13px;
                  background:rgba(236,72,153,0.10);
                  border:1px solid rgba(236,72,153,0.20);
                  color:#f9a8d4;
                  font-size:11px;
                  font-weight:800;
                  letter-spacing:0.16em;
                  text-transform:uppercase;
                "
              >
                Lead entrante
              </div>

              <h2
                style="
                  margin:0 0 12px 0;
                  font-size:26px;
                  line-height:1.15;
                  letter-spacing:-0.03em;
                  color:#ffffff;
                "
              >
                ${safeNombre}
              </h2>

              <p
                style="
                  margin:0;
                  font-size:15px;
                  line-height:1.8;
                  color:rgba(255,255,255,0.72);
                "
              >
                Solicitud relacionada con desarrollo de software y aplicaciones.
              </p>

              ${infoGrid([
                { label: "Nombre", value: rawNombre },
                {
                  label: "Correo",
                  value: rawEmail,
                  href: `mailto:${rawEmail}`,
                },
              ])}
            </td>
          </tr>

          <tr>
            <td style="padding-top:22px;">
              <div
                style="
                  padding:22px;
                  background:
                    linear-gradient(180deg, rgba(168,85,247,0.10), rgba(236,72,153,0.05));
                  border:1px solid rgba(236,72,153,0.16);
                "
              >
                <p
                  style="
                    margin:0 0 12px 0;
                    font-size:11px;
                    line-height:1;
                    letter-spacing:0.16em;
                    text-transform:uppercase;
                    font-weight:800;
                    color:#f9a8d4;
                  "
                >
                  Mensaje
                </p>

                <p
                  style="
                    margin:0;
                    font-size:15px;
                    line-height:1.9;
                    color:rgba(255,255,255,0.88);
                  "
                >
                  ${safeMessage}
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 0 30px 0;">
              <div
                style="
                  padding:16px 18px;
                  background:rgba(255,255,255,0.03);
                  border:1px solid rgba(236,72,153,0.12);
                  color:rgba(255,255,255,0.58);
                  font-size:12px;
                  line-height:1.75;
                "
              >
                Responder desde <strong style="color:#ffffff;">${escapeHtml(SUPPORT_EMAIL)}</strong> y continuar el seguimiento por correo.
              </div>
            </td>
          </tr>
        </table>
      ${sectionEnd()}

      ${footerBlock()}
    `);

    const userHtml = shell(`
      ${heroBlock(
        "Mensaje recibido",
        "Gracias, ya recibimos tu mensaje",
        "Tu solicitud quedó registrada. El equipo de Markvera la revisará y te responderá por correo."
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
            <td align="center">
              <h2
                style="
                  margin:0;
                  font-size:30px;
                  line-height:1.08;
                  letter-spacing:-0.04em;
                  color:#ffffff;
                "
              >
                Hola, ${safeNombre}
              </h2>

              <p
                style="
                  margin:14px auto 0 auto;
                  max-width:520px;
                  font-size:15px;
                  line-height:1.85;
                  color:rgba(255,255,255,0.76);
                "
              >
                Recibimos tu mensaje correctamente. En breve revisaremos tu solicitud y te responderemos al correo que compartiste.
              </p>

              ${infoGrid([
                {
                  label: "Correo registrado",
                  value: rawEmail,
                  href: `mailto:${rawEmail}`,
                },
                { label: "Sitio", value: BRAND_NAME, href: BRAND_URL },
              ])}
            </td>
          </tr>

          <tr>
            <td style="padding-top:22px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <table
                      role="presentation"
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        background:
                          linear-gradient(180deg, rgba(168,85,247,0.12), rgba(236,72,153,0.06));
                        border:1px solid rgba(236,72,153,0.14);
                      "
                    >
                      <tr>
                        <td style="padding:22px;">
                          <p
                            style="
                              margin:0 0 10px 0;
                              font-size:11px;
                              line-height:1;
                              letter-spacing:0.16em;
                              text-transform:uppercase;
                              font-weight:800;
                              color:#f9a8d4;
                            "
                          >
                            Tu mensaje
                          </p>
                          <p
                            style="
                              margin:0;
                              font-size:14px;
                              line-height:1.9;
                              color:rgba(255,255,255,0.88);
                            "
                          >
                            ${safeMessage}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:28px 0 8px 0;">
              <a
                href="${BRAND_URL}"
                style="
                  display:inline-block;
                  padding:14px 22px;
                  background:linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
                  color:#ffffff;
                  text-decoration:none;
                  font-size:14px;
                  font-weight:800;
                  letter-spacing:0.01em;
                  border:1px solid rgba(236,72,153,0.24);
                "
              >
                Volver a ${BRAND_NAME}
              </a>
            </td>
          </tr>
        </table>
      ${sectionEnd()}

      ${footerBlock()}
    `);

    await Promise.all([
      resend.emails.send({
        from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
        to: [SUPPORT_EMAIL],
        replyTo: rawEmail,
        subject: `Nuevo mensaje web: ${rawNombre}`,
        html: internalHtml,
      }),
      resend.emails.send({
        from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
        to: [rawEmail],
        subject: `Hemos recibido tu mensaje - ${BRAND_NAME}`,
        html: userHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error enviando correos:", error);

    return NextResponse.json(
      {
        error: error?.message || "Error al procesar la solicitud",
      },
      { status: 500 }
    );
  }
}