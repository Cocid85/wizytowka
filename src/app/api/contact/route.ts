import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Walidacja
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      );
    }

    // Wysyłanie emaila do właściciela
    const { data, error } = await resend.emails.send({
      from: 'Kontakt <onboarding@resend.dev>', // Zmień na zweryfikowaną domenę
      to: ['ms.akademiaair@gmail.com'],
      replyTo: email,
      subject: `Nowa wiadomość z formularza kontaktowego od ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
          <h2 style="color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">
            Nowa wiadomość z formularza kontaktowego
          </h2>
          
          <div style="margin-top: 30px;">
            <p style="margin: 10px 0;"><strong style="color: #00ff41;">Imię i nazwisko:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #00ff41;">Email:</strong> <a href="mailto:${email}" style="color: #ef4444;">${email}</a></p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #2a2a2a; border-left: 4px solid #ef4444; border-radius: 5px;">
            <h3 style="color: #ffffff; margin-top: 0;">Wiadomość:</h3>
            <p style="color: #cccccc; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #888; font-size: 12px;">
            <p>Wiadomość wysłana z formularza kontaktowego na stronie.</p>
          </div>
        </div>
      `,
      text: `
Nowa wiadomość z formularza kontaktowego

Imię i nazwisko: ${name}
Email: ${email}

Wiadomość:
${message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Błąd podczas wysyłania wiadomości' },
        { status: 500 }
      );
    }

    // Wysyłanie emaila potwierdzającego do klienta
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
                <!-- Header z gradientem -->
                <tr>
                  <td style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center;">
                    <div style="color: #ffffff; font-size: 28px; font-weight: bold; margin-bottom: 10px;">
                      ✓ Wiadomość Otrzymana
                    </div>
                    <div style="color: rgba(255,255,255,0.9); font-size: 16px;">
                      Dziękuję za kontakt!
                    </div>
                  </td>
                </tr>
                
                <!-- Logo Section -->
                <tr>
                  <td style="padding: 30px; text-align: center; background-color: #1a1a1a;">
                    <div style="color: #ffffff; font-size: 24px; font-weight: bold; margin-bottom: 10px; letter-spacing: 2px;">
                      MS AKADEMIA
                    </div>
                    <div style="width: 80px; height: 3px; background: linear-gradient(90deg, #ef4444 0%, #00ff41 100%); margin: 0 auto; border-radius: 2px;"></div>
                  </td>
                </tr>
                
                <!-- Treść -->
                <tr>
                  <td style="padding: 30px; color: #ffffff;">
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #e5e5e5;">
                      Cześć <strong style="color: #ef4444;">${name}</strong>,
                    </p>
                    
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #e5e5e5;">
                      Dziękuję za wiadomość! Otrzymałem Twoją wiadomość i <strong style="color: #00ff41;">odezwę się do Ciebie w ciągu 24 godzin</strong>.
                    </p>
                    
                    <div style="background-color: #2a2a2a; border-left: 4px solid #00ff41; padding: 20px; margin: 30px 0; border-radius: 5px;">
                      <p style="margin: 0; font-size: 14px; color: #cccccc; line-height: 1.6;">
                        <strong style="color: #00ff41;">Twoja wiadomość:</strong><br>
                        <span style="color: #ffffff; white-space: pre-wrap;">${message}</span>
                      </p>
                    </div>
                    
                    <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 1.6; color: #e5e5e5;">
                      W międzyczasie, jeśli masz pilne pytania, możesz skontaktować się ze mną bezpośrednio:
                    </p>
                    
                    <div style="margin: 25px 0; padding: 20px; background-color: #2a2a2a; border-radius: 8px;">
                      <p style="margin: 5px 0; font-size: 14px; color: #cccccc;">
                        <strong style="color: #ef4444;">📧 Email:</strong> 
                        <a href="mailto:ms.akademiaair@gmail.com" style="color: #00ff41; text-decoration: none;">ms.akademiaair@gmail.com</a>
                      </p>
                      <p style="margin: 5px 0; font-size: 14px; color: #cccccc;">
                        <strong style="color: #ef4444;">📱 Telefon:</strong> 
                        <a href="tel:+48691409400" style="color: #00ff41; text-decoration: none;">+48 691 409 400</a>
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px; background-color: #0f0f0f; text-align: center; border-top: 1px solid #2a2a2a;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #ffffff; font-weight: bold;">
                      Do zobaczenia!
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #888;">
                      MS Akademia - Tworzę aplikacje i strony internetowe
                    </p>
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #2a2a2a;">
                      <p style="margin: 0; font-size: 11px; color: #666;">
                        Ta wiadomość została wysłana automatycznie. Proszę nie odpowiadać na ten email.
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const confirmationText = `
Wiadomość Otrzymana - Dziękuję za kontakt!

Cześć ${name},

Dziękuję za wiadomość! Otrzymałem Twoją wiadomość i odezwę się do Ciebie w ciągu 24 godzin.

Twoja wiadomość:
${message}

Kontakt:
Email: ms.akademiaair@gmail.com
Telefon: +48 691 409 400

Do zobaczenia!
MS Akademia - Tworzę aplikacje i strony internetowe
    `;

    // Wysyłanie potwierdzenia do klienta
    const { data: confirmationData, error: confirmationError } = await resend.emails.send({
      from: 'MS Akademia <onboarding@resend.dev>',
      to: [email],
      subject: '✓ Otrzymałem Twoją wiadomość - MS Akademia',
      html: confirmationHtml,
      text: confirmationText,
    });

    if (confirmationError) {
      console.error('Resend confirmation error:', confirmationError);
      // Nie przerywamy procesu - główny email został wysłany
    }

    return NextResponse.json(
      { success: true, message: 'Wiadomość została wysłana pomyślnie' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  }
}

