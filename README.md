# MngrA – Správa směn a pracovníků

MngrA - backend -> aplikace pro manažery, která umožňuje evidovat pracovníky a plánovat jejich pracovní směny + hlídání aby žádný pracovník nebyl přiřazen do dvou překrývajících se směn


## Úkol 3 - backend

Komunikace - http
Data - jako JSON přímo na disk - oddělené soubory (pracovník, směna) - místo databáze - jednodušší a přehlednější


## Struktura aplikace

3 vrstvy

**Controller** - přijmout a přeposlat požadavky ze zatím neexistujícího frontendu (úkol4)

**ABL (Application Business Layer)** - business logika

**DAO (Data Access Object)** - ukládání na disk


## Datové entity

**Pracovník (Worker)** – A person who can be assigned to work shifts. Unikátní ID a jméno.

**Směna (Shift)** – A work shift scheduled on a specific date and time. Unikátní ID, datum, čas začátku, čas konce a seznam ID přiřazených pracovníků. Jedna směna může mít více pracovníků, jeden pracovník nesmí mít dvě překrývající se směny.


## API endpointy

Server naslouchá na portu 8888. Pro každou entitu existuje pět operací – vytvoření, načtení jednoho záznamu, načtení seznamu všech záznamů, úprava a smazání. Celkem tedy deset endpointů.


### Pracovník
- `GET /worker/list` – seznam všech pracovníků
- `GET /worker/get?id=XXX` – pracovník podle ID
- `POST /worker/create` – nový pracovník
- `POST /worker/update` – edit existujícího pracovníka
- `POST /worker/delete` – smazat pracovníka

### Směna
- `GET /shift/list` – seznam všech směn
- `GET /shift/get?id=XXX` – směna podle ID
- `POST /shift/create` – vytvořit směnu (avoids overlaps)
- `POST /shift/update` – edit existující směny (avoids overlaps)
- `POST /shift/delete` – smaže směnu

## Validace


Vstup validován pomocí podmínek – z důvodu jednodušší implementace. Např:

- Ověření zadání data - `!date` → chyba: `"Datum směny je povinné."`
- Čas začátku a konce - `!startTime` `||` `!endTime` → chyba: `"Začátek směny je povinný."`
- Existující ID - `!workerExists` → chyba: `"Pracovník nenalezen."`
- No overlapping - `overlap` → chyba: `"Pracovník již má směnu v tomto časovém rozmezí."`

HTTP stavový kód `400` `^` `404`


## Spuštění

```bash
cd server
npm install
node app.js
```

Server je dostupný na adrese `http://localhost:8888`.


## Technologie

- Node.js
- Express.js