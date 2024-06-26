Aby uruchomić aplikację, należy:

- uruchomić polecenie "docker-compose up" z poziomu root projektu
- wejść do konsoli administratora keycloak i przekopiować klucz publiczny realmu oraz klucz prywatny klienta my-api do pliku server.js w miejsce: "realmPublicKey" oraz "secret"
- uruchomić komendę "npm install" oraz odpalić serwer node za pomocą "node server.js" (obie czynności z poziomu "app")
- uruchomić komendę "npm install" oraz odpalić serwer frontend za pomocą npm run dev (z poziomu "app")


Aplikacja jest prostym połączeniem dotychczasowych laboratoriów. Mamy podstawowe zabezpieczenie ścieżki "Secured Page", która wymaga zalogowania dowolnego usera, oraz zabezpieczenie ścieżki "Admin Page", która wymaga zalogowania kontem z rolą administratora.


Przechodząc do podstrony "Secured Page" wysyłany jest request na zabezpieczony endpoint http://localhost:3000/hello, który dopuszcza tylko żądania, które w headerze mają ważny token otrzymany od serwera autoryzacyjnego Keycloak (w tym przypadku otrzymany przy logowaniu po przekierowaniu z aplikacji). W odpowiedzi serwer wysyła tajną wiadomość, która jest wyświetlana na stronie.