# Vavo Academy — landing kursu 250 zł

Gotowa statyczna paczka pod GitHub Pages lub Vercel.

## Pliki

- `index.html` — główny ekran
- `style.css` — wygląd i wersja mobilna
- `script.js` — delikatny ruch tła
- `vavo-mark.webp` — wygenerowany znak V wykorzystywany w intro i karcie kursu
- `favicon.svg` — ikona strony
- `regulamin.html` i `polityka-prywatnosci.html` — robocze strony prawne

## Przed publikacją reklam

1. Uzupełnij regulamin i politykę prywatności prawdziwymi danymi.
2. Utwórz nowy produkt Stripe za 250 zł i wstaw jego link do przycisku `data-checkout`.
3. Po wstawieniu linku usuń komunikat techniczny `checkout-note` i obsługę blokady w `script.js`.
4. Zrób płatność testową przed włączeniem reklam.

## Publikacja

Wrzuć całą zawartość folderu do repozytorium GitHub. Vercel wykryje statyczną stronę automatycznie; katalog główny projektu powinien zawierać `index.html`.
