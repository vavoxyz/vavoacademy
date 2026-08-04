# Vavo Academy

Gotowy, statyczny landing page sprzedażowy pod GitHub Pages. Domena docelowa: `vavoacademy.pl`.

## Publikacja na GitHub Pages

Wrzuć wszystkie pliki z paczki bezpośrednio do głównego katalogu repozytorium i zachowaj plik `CNAME`. Po aktualizacji odczekaj kilka minut, a następnie sprawdź stronę również w trybie incognito na telefonie.

## Obowiązkowe ustawienie w Stripe

W edycji Payment Link przejdź do zakładki **After payment**, wybierz przekierowanie klienta na własną stronę i wpisz:

`https://vavoacademy.pl/dziekujemy.html`

Dzięki temu klient po opłaceniu preorderu zobaczy potwierdzenie i możliwe będzie poprawne mierzenie zakupów.

## TikTok Pixel

1. W TikTok Ads Manager otwórz **Tools → Events Manager → Data Sources**.
2. Utwórz lub wybierz Pixel dla `vavoacademy.pl` i skopiuj Pixel ID.
3. Otwórz `tracking-config.js` i wklej identyfikator między cudzysłowy przy `tiktokPixelId`.
4. Po publikacji zaakceptuj cookies na stronie i sprawdź w TikTok Pixel Helper zdarzenia `ViewContent`, `InitiateCheckout` oraz `CompletePayment`.

Do czasu wpisania Pixel ID strona działa normalnie, ale nie wysyła danych do TikToka i nie pokazuje banera zgody.

## Kontrola przed reklamą

1. W Stripe wykonaj testową płatność 50 zł i sprawdź przekierowanie oraz wiadomość potwierdzającą.
2. Upewnij się, że limit Payment Link nadal wynosi 50 skutecznych płatności.
3. Sprawdź przyciski zakupu, regulamin, politykę prywatności i widok mobilny.
4. Zweryfikuj `https://vavoacademy.pl/sitemap.xml` w Google Search Console.
