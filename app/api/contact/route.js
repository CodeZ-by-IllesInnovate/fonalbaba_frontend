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

    // Nodemailer konfiguráció
    const transporter = nodemailer.createTransport({
      host: "mail.fonalbaba.hu", // SMTP szerver (pl. Gmail vagy más szolgáltató)
      port: 465, // Port (pl. 465 SSL-hez)
      secure: true, // SSL használata
      auth: {
        user: process.env.EMAIL_USER, // E-mail fiók
        pass: process.env.EMAIL_PASS, // Jelszó vagy App Password
      },
    });

    // E-mail tartalom (HTML modern dizájnnal)
    const mailOptions = {
      from: `"Kapcsolatfelvétel" <${process.env.EMAIL_USER}>`,
      to: `${email}`, // Az e-mail cím, ahová küldeni szeretnéd
      subject: `Kapcsolatfelvétel: ${subject}`,
      html: `
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
              color: #2563eb;
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
              background-color: #2563eb;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
              text-align: center;
              margin-top: 20px;
            }
            .btn:hover {
              background-color: #1e40af;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header">Kapcsolatfelvételi Üzenet</h1>
            <p class="paragraph"><span class="highlight">Név:</span> ${name}</p>
            <p class="paragraph"><span class="highlight">E-mail:</span> ${email}</p>
            <p class="paragraph"><span class="highlight">Tárgy:</span> ${subject}</p>
            <p class="paragraph"><span class="highlight">Üzenet:</span><br>${message}</p>
            <a href="mailto:${email}" class="btn">Válasz az üzenetre</a>
            <div class="footer">
              Ezt az üzenetet a kapcsolatfelvételi űrlapon keresztül küldték:<br>
              <a href="https://fonalbaba.hu" style="color: #2563eb;">fonalbaba.hu</a>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // E-mail küldése
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Üzenet elküldve!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Hiba történt az üzenet elküldésekor." }),
      { status: 500 }
    );
  }
}
