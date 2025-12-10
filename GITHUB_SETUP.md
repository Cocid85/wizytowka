# Instrukcja dodania projektu do GitHub

## ✅ Co już zostało zrobione:
- ✅ Repozytorium Git zostało zainicjalizowane
- ✅ Wszystkie pliki zostały dodane do Git
- ✅ Pierwszy commit został stworzony

## 📋 Kolejne kroki:

### 1. Stwórz repozytorium na GitHub

1. Przejdź na [GitHub.com](https://github.com) i zaloguj się
2. Kliknij przycisk **"+"** w prawym górnym rogu → **"New repository"**
3. Wypełnij formularz:
   - **Repository name**: `wizytowka` (lub inna nazwa)
   - **Description**: "Elegancka strona-wizytówka dla usług tworzenia aplikacji i stron internetowych"
   - **Visibility**: Wybierz Public lub Private
   - **NIE zaznaczaj** "Initialize this repository with a README" (już mamy commit)
4. Kliknij **"Create repository"**

### 2. Połącz lokalne repozytorium z GitHub

Po utworzeniu repozytorium GitHub pokaże Ci instrukcje. Użyj tych komend:

```bash
# Dodaj remote (zastąp YOUR_USERNAME swoją nazwą użytkownika GitHub)
git remote add origin https://github.com/YOUR_USERNAME/wizytowka.git

# Zmień nazwę brancha na main (jeśli GitHub używa main zamiast master)
git branch -M main

# Wyślij kod na GitHub
git push -u origin main
```

### 3. Alternatywnie - jeśli masz już repozytorium

Jeśli repozytorium już istnieje, użyj:

```bash
git remote add origin https://github.com/YOUR_USERNAME/wizytowka.git
git branch -M main
git push -u origin main
```

## 🔐 Uwaga dotycząca uwierzytelniania

GitHub wymaga uwierzytelniania. Masz dwie opcje:

### Opcja 1: Personal Access Token (PAT)
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Wygeneruj nowy token z uprawnieniami `repo`
3. Użyj tokena jako hasła przy `git push`

### Opcja 2: GitHub CLI
```bash
# Zainstaluj GitHub CLI i zaloguj się
gh auth login
```

### Opcja 3: SSH (zalecane dla długoterminowego użytkowania)
```bash
# Wygeneruj klucz SSH (jeśli nie masz)
ssh-keygen -t ed25519 -C "twoj-email@example.com"

# Skopiuj zawartość ~/.ssh/id_ed25519.pub
# Dodaj klucz w GitHub → Settings → SSH and GPG keys

# Użyj SSH URL zamiast HTTPS
git remote set-url origin git@github.com:YOUR_USERNAME/wizytowka.git
```

## 📝 Przydatne komendy Git

```bash
# Sprawdź status
git status

# Dodaj zmiany
git add .

# Stwórz commit
git commit -m "Opis zmian"

# Wyślij na GitHub
git push

# Pobierz zmiany z GitHub
git pull

# Zobacz historię commitów
git log --oneline
```

## 🚀 Po wgraniu na GitHub

Twój projekt będzie dostępny pod adresem:
```
https://github.com/YOUR_USERNAME/wizytowka
```

Możesz też włączyć GitHub Pages, aby udostępnić stronę:
1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main, folder: / (root)
4. Save

Strona będzie dostępna pod adresem:
```
https://YOUR_USERNAME.github.io/wizytowka
```

## ⚠️ Ważne pliki w .gitignore

Następujące pliki/katalogi NIE będą w repozytorium (są w .gitignore):
- `node_modules/` - zależności npm
- `.next/` - build Next.js
- `.env*.local` - pliki środowiskowe
- `*.log` - logi

To jest poprawne - te pliki nie powinny być w repozytorium.

