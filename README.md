# Vavo Academy — landing preorderu 50 zł

Gotowa statyczna paczka pod GitHub Pages lub Vercel.

## Pliki

- `index.html` — główny ekran
- `style.css` — wygląd i wersja mobilna
- `script.js` — delikatny ruch tła
- `vavo-logo-white.png` — biały znak V z przezroczystym tłem
- `favicon.svg` — ikona strony
- `regulamin.html` i `polityka-prywatnosci.html` — robocze strony prawne

## Przed publikacją reklam

1. Uzupełnij regulamin i politykę prywatności prawdziwymi danymi.
2. Sprawdź link Stripe w przycisku `data-checkout` — powinien pobierać jednorazowo 50 zł.
3. W Stripe pozostaw limit 50 płatności dla ceny preorderowej.
4. Zrób płatność testową przed włączeniem reklam.

## Publikacja

Wrzuć całą zawartość folderu do repozytorium GitHub. Vercel wykryje statyczną stronę automatycznie; katalog główny projektu powinien zawierać `index.html`.
