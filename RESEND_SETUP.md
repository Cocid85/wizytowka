# Konfiguracja wysyłania emaili przez Resend

## Krok 1: Utwórz konto w Resend

1. Przejdź na https://resend.com
2. Zarejestruj się (darmowe konto)
3. Zweryfikuj swój email

## Krok 2: Utwórz API Key

1. Po zalogowaniu przejdź do https://resend.com/api-keys
2. Kliknij "Create API Key"
3. Nadaj nazwę (np. "Wizytówka Production")
4. Skopiuj wygenerowany klucz API (zaczyna się od `re_`)

## Krok 3: Skonfiguruj zmienną środowiskową

### Lokalnie (development):

1. Utwórz plik `.env.local` w głównym katalogu projektu
2. Dodaj:
```
RESEND_API_KEY=re_twoj_klucz_api_tutaj
```

### Na Vercel (production):

1. Przejdź do ustawień projektu na Vercel
2. Przejdź do sekcji "Environment Variables"
3. Dodaj nową zmienną:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Twój klucz API z Resend
4. Wybierz środowiska (Production, Preview, Development)
5. Zapisz

## Krok 4: Zweryfikuj domenę (opcjonalne, ale zalecane)

Domyślnie możesz wysyłać emaile z `onboarding@resend.dev`, ale lepiej zweryfikować własną domenę:

1. W Resend przejdź do "Domains"
2. Dodaj swoją domenę
3. Dodaj rekordy DNS zgodnie z instrukcjami
4. Po weryfikacji zmień w `src/app/api/contact/route.ts`:
   ```typescript
   from: 'Kontakt <kontakt@twoja-domena.pl>',
   ```

## Testowanie

Po skonfigurowaniu:
1. Uruchom serwer deweloperski: `npm run dev`
2. Wypełnij formularz kontaktowy na stronie
3. Sprawdź czy email dotarł na `ms.akademiaair@gmail.com`

## Limity darmowego planu

- 100 emaili dziennie
- 3000 emaili miesięcznie
- Wystarczy dla większości stron portfolio

## Wsparcie

Jeśli masz problemy:
- Dokumentacja Resend: https://resend.com/docs
- Sprawdź logi w konsoli przeglądarki (F12)
- Sprawdź logi na Vercel (jeśli wdrożone)

