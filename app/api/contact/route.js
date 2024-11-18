import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Minden mező kitöltése kötelező!" }),
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Érvénytelen e-mail cím!" }),
        {
          status: 400,
        }
      );
    }

    // Nodemailer konfiguráció
    const transporter = nodemailer.createTransport({
      host: "mail.fonalbaba.hu", // SMTP szerver
      port: 465, // Port SSL-hez
      secure: true, // SSL használata
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const getOwnerEmailHtml = (name, email, subject, message) => `
      <!DOCTYPE html>
      <html lang="hu">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kapcsolatfelvétel</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            color: #5A5A5A;
          }
          .paragraph {
            font-size: 16px;
            line-height: 1.5;
            color: #4b5563;
            margin-bottom: 16px;
          }
          .highlight {
            font-weight: bold;
            color: #111827;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            margin-top: 20px;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #5A5A5A;
            background-color: #E8DCC5;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
          }
          .btn:hover {
            background-color: #E8DCC5;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="header">Új kapcsolatfelvételi üzenet</h1>
          <p class="paragraph"><span class="highlight">Feladó neve:</span> ${name}</p>
          <p class="paragraph"><span class="highlight">Feladó e-mail címe:</span> ${email}</p>
          <p class="paragraph"><span class="highlight">Tárgy:</span> ${subject}</p>
          <p class="paragraph"><span class="highlight">Üzenet:</span><br>${message}</p>
          <a href="mailto:${email}" class="btn">Válasz az üzenetre</a>
          <div class="footer">
            Ezt az üzenetet a kapcsolatfelvételi űrlapon keresztül küldték:<br>
            <a href="https://fonalbaba.hu" style="color: #5A5A5A;">fonalbaba.hu</a>
          </div>
        </div>
      </body>
      </html>
    `;

    const getConfirmationEmailHtml = (name, subject, message) => `
       <!DOCTYPE html>
      <html lang="hu">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Köszönjük a kapcsolatfelvételt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
            color: #5A5A5A;
          }
          .paragraph {
            font-size: 16px;
            line-height: 1.5;
            color: #4b5563;
            margin-bottom: 16px;
          }
          .highlight {
            font-weight: bold;
            color: #111827;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #6b7280;
            margin-top: 20px;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #5A5A5A;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
          }
          .btn:hover {
            background-color: #444444;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="header">Köszönjük a kapcsolatfelvételt!</h1>
          <p class="paragraph">
            Kedves ${name},
          </p>
          <p class="paragraph">
            Köszönjük, hogy üzenetet küldtél nekünk! Igyekszünk a lehető leghamarabb válaszolni neked. Az üzeneted részleteit lent találod:
          </p>
          <p class="paragraph"><span class="highlight">Tárgy:</span> ${subject}</p>
          <p class="paragraph"><span class="highlight">Üzenet:</span><br>${message}</p>
          <p class="paragraph">
            Ha további kérdésed van, nyugodtan vedd fel velünk a kapcsolatot itt: 
            <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.
          </p>
          <div class="footer">
            Üdvözlettel,<br>
            <strong>Fonalbaba Amirgurumi</strong><br>
            Gondár Ibolya csapata
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: `"Fonalbaba Amirgurumi - Gondár Ibolya" <${process.env.EMAIL_USER}>`,
        to: process.env.OWNER_EMAIL,
        subject: `Új kapcsolatfelvételi üzenet: ${subject}`,
        html: getOwnerEmailHtml(name, email, subject, message),
      });
    } catch (error) {
      console.error("Hiba a tulajdonosnak szóló e-mail küldésénél:", error);
    }

    try {
      await transporter.sendMail({
        from: `"Fonalbaba Amirgurumi - Gondár Ibolya" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Köszönjük, hogy kapcsolatba léptél velünk!`,
        html: getConfirmationEmailHtml(name, subject, message),
      });
    } catch (error) {
      console.error("Hiba a visszaigazoló e-mail küldésénél:", error);
    }

    return new Response(
      JSON.stringify({
        message: "Az üzeneted és a visszaigazolás sikeresen elküldve!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Hiba történt:", error);
    return new Response(
      JSON.stringify({ error: "Hiba történt az üzenet elküldésekor." }),
      { status: 500 }
    );
  }
}
