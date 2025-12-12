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

    // Wysyłanie emaila
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

