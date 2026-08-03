# Vavo Academy — ekran preorderowy

Gotowa statyczna paczka pod GitHub Pages lub Vercel.

## Pliki

- `index.html` — główny ekran
- `style.css` — wygląd i wersja mobilna
- `script.js` — delikatny ruch tła
- `vavo-hero.webp` — tło hero
- `favicon.svg` — ikona strony
- `regulamin.html` i `polityka-prywatnosci.html` — robocze strony prawne

## Przed publikacją reklam

1. Uzupełnij regulamin i politykę prywatności prawdziwymi danymi.
2. Sprawdź link Stripe w `index.html` (`data-checkout`).
3. W Stripe upewnij się, że link ma limit 50 płatności.
4. Zrób płatność testową przed włączeniem reklam.

## Publikacja

Wrzuć całą zawartość folderu do repozytorium GitHub. Vercel wykryje statyczną stronę automatycznie; katalog główny projektu powinien zawierać `index.html`.
