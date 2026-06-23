import nodemailer from "nodemailer";
import { SITE_URL } from "@/lib/site";

export type EmailTemplate = "confirmed" | "reminder" | "completed";

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: Number(SMTP_PORT) === 587 ? false : true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

function absoluteUrl(url?: string | null) {
  if (!url) return null;
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

const templateContent: Record<
  EmailTemplate,
  { subject: (itemLabel: string) => string; icon: string; title: string; body: (fullName: string, itemLabel: string) => string }
> = {
  confirmed: {
    subject: (itemLabel) => `Rezervasyonunuz Onaylandı - ${itemLabel}`,
    icon: "https://cdn-icons-png.flaticon.com/512/845/845646.png",
    title: "Rezervasyonunuz Onaylandı",
    body: (fullName, itemLabel) =>
      `Sayın ${fullName}, ${itemLabel} için rezervasyonunuz onaylanmıştır. Aşağıda rezervasyon detaylarınızı bulabilirsiniz.`,
  },
  reminder: {
    subject: (itemLabel) => `Hatırlatma - ${itemLabel} Yaklaşıyor`,
    icon: "https://cdn-icons-png.flaticon.com/512/2838/2838779.png",
    title: "Rezervasyonunuza 1 Gün Kaldı",
    body: (fullName, itemLabel) =>
      `Sayın ${fullName}, ${itemLabel} rezervasyonunuzun başlangıcına 1 gün kaldı. Sizi aramızda görmekten mutluluk duyacağız.`,
  },
  completed: {
    subject: (itemLabel) => `Teşekkür Ederiz - ${itemLabel}`,
    icon: "https://cdn-icons-png.flaticon.com/512/411/411736.png",
    title: "Bizi Tercih Ettiğiniz İçin Teşekkür Ederiz",
    body: (fullName, itemLabel) =>
      `Sayın ${fullName}, ${itemLabel} sona ermiştir. Bizi tercih ettiğiniz için teşekkür ederiz. Şikayet ve önerilerinizi bize iletebilirsiniz.`,
  },
};

type ReservationEmailInput = {
  to: string;
  fullName: string;
  logoUrl?: string | null;
  itemLabel: string;
  dateRangeText: string;
  detailRows: { label: string; value: string }[];
  template: EmailTemplate;
};

export async function sendReservationEmail(input: ReservationEmailInput) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("SMTP yapılandırılmamış, e-posta gönderilmedi.");
    return;
  }

  const logo = absoluteUrl(input.logoUrl);
  const content = templateContent[input.template];

  const detailRowsHtml = input.detailRows
    .map(
      (row) => `
        <tr>
          <td style="padding:8px 0;color:#8d6e63;font-size:14px;width:140px;">${row.label}</td>
          <td style="padding:8px 0;color:#3e2723;font-size:14px;font-weight:600;">${row.value}</td>
        </tr>`
    )
    .join("");

  const html = `
  <div style="background:#f5f0ed;padding:32px 16px;font-family:Segoe UI,Arial,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8ddd8;">
      <div style="background:#6d4c41;padding:28px 32px;text-align:center;">
        ${logo ? `<img src="${logo}" alt="Özkar Grup" style="height:48px;object-fit:contain;" />` : `<span style="color:#fff;font-size:20px;font-weight:700;">Özkar Grup Rent a Car</span>`}
      </div>
      <div style="padding:32px;">
        <table style="width:100%;margin-bottom:20px;" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;width:40px;">
              <img src="${content.icon}" width="28" height="28" alt="" />
            </td>
            <td>
              <h1 style="margin:0;font-size:20px;color:#3e2723;">${content.title}</h1>
              <p style="margin:6px 0 0;font-size:14px;color:#6d4c41;">${content.body(input.fullName, input.itemLabel)}</p>
            </td>
          </tr>
        </table>

        <table style="width:100%;background:#f9f5f3;border-radius:12px;padding:16px;" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:16px 20px;">
              <table style="width:100%;" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;color:#8d6e63;font-size:14px;width:140px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/2693/2693507.png" width="16" height="16" alt="" style="vertical-align:middle;margin-right:6px;" />Tarih
                  </td>
                  <td style="padding:8px 0;color:#3e2723;font-size:14px;font-weight:600;">${input.dateRangeText}</td>
                </tr>
                ${detailRowsHtml}
              </table>
            </td>
          </tr>
        </table>

        <div style="margin-top:24px;display:flex;align-items:center;gap:8px;">
          <img src="https://cdn-icons-png.flaticon.com/512/179/179323.png" width="20" height="20" alt="" />
          <p style="margin:0;font-size:13px;color:#8d6e63;">
            Sorularınız için bize WhatsApp veya telefon üzerinden +90 541 912 14 61 numarasından ulaşabilirsiniz.
          </p>
        </div>
      </div>
      <div style="background:#f9f5f3;padding:16px 32px;text-align:center;font-size:12px;color:#a1887f;">
        Özkar Grup Rent a Car · ${SITE_URL.replace("https://", "")}
      </div>
    </div>
  </div>`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"Özkar Grup Rent a Car" <${process.env.SMTP_USER}>`,
    to: input.to,
    subject: content.subject(input.itemLabel),
    html,
  });
}
