# 📅 Agenda PS

**Agenda personale di servizio** per operatori di polizia: turni, straordinari, buoni pasto, assenze, permessi e attività svolte, in un calendario stile Google Calendar.

È una **web app installabile (PWA)**: si apre dal browser, si installa sul telefono come un'app e funziona anche **offline**. Non serve nessun server: **tutti i dati restano sul dispositivo**.

> ⚠️ Strumento personale e non ufficiale. Non è un prodotto dell'Amministrazione. Le regole di calcolo (buono pasto, cambio turno, limiti dei permessi) sono indicative e configurabili: fa sempre fede la normativa vigente e quanto disposto dal proprio ufficio.

---

## ✨ Funzioni principali

**Turni**
- Schema settimanale con **settimane alternate A/B**, valido da una data scelta
- Turni con più fasce (es. `07:00-13:00, 13:30-16:30` con rientro)
- Sabati o giorni di riposo lavorati, festivi lavorati evidenziati

**Servizio del giorno**
- Orario effettivo e **straordinario emergente a più fasce** (es. pausa pranzo lavorata + seconda tranche serale)
- Calcolo automatico di **buono pasto** (singolo/doppio), **cambio turno** (d'ufficio / in programmazione), **ore notturne** (22–06)
- Promemoria per la **richiesta al dirigente** oltre le 4 ore di straordinario
- **Perquisizione** guidata: orario di inizio, slittamento del rientro, esterna e foglio di viaggio
- Attività esterne (servizio esterno, notifiche, udienze…), **Ordine pubblico** in sede / fuori sede, **Missione**
- **Attività d'ufficio** (360 c.p.p., SIT, interrogatorio, analisi dispositivi…) su uno o più giorni
- **Giornate di aggiornamento e addestramento** con conteggio annuale (tiro, tecniche operative, interesse generale, tematiche di settore)

**Assenze e permessi**
- CO, CS, congedo per esami, festività soppresse 937, riposo compensativo, recupero, donazione sangue, citazione in tribunale
- Permessi **a ore o a giornata intera**: L.104, permesso breve, sindacale, studio, con scelta **all'ingresso / in uscita**
- Inserimento su **periodi** ("fino al…") e **avvisi di sforamento** dei limiti annuali o mensili

**Calendario e riepiloghi**
- Vista mese e vista giorno con timeline, zoom e swipe
- Numero dell'**Ordine di Servizio** (giorno dell'anno) e numero di settimana
- **Riepilogo** per mese, anno o intervallo, con le sole "giornate particolari"
- Esportazione in **PDF** ed **Excel (CSV)**

**Dati e sicurezza**
- Database locale nel browser (IndexedDB)
- **Backup cifrato** AES-256-GCM (PBKDF2-SHA256) condivisibile su Drive o altrove
- Tema chiaro/scuro, avviso automatico degli aggiornamenti

---

## 📲 Installazione sul telefono

Apri il link della app dal browser e segui la schermata **"Installa Agenda PS"**:

| Telefono | Come si installa |
|---|---|
| **Android** (Chrome, Samsung Internet) | Pulsante **📲 Installa**, oppure menu ⋮ → *Installa app* |
| **iPhone** (Safari) | **Condividi ⬆︎** → *Aggiungi alla schermata Home* |
| Link aperto da WhatsApp/Telegram | Prima *Apri nel browser*, poi installa |

> Su iPhone i dati inseriti in Safari **non** passano all'app installata: installala prima di iniziare.

---

## 🔒 Privacy

- Nessun account, nessun server, nessuna statistica di utilizzo.
- I dati sono salvati **solo sul dispositivo**, nel browser o nell'app installata.
- Il repository contiene **solo il codice**: nessun dato personale o d'ufficio.
- Disinstallare l'app o cancellare i dati del sito **elimina tutto**: fai backup periodici (menu → *Backup*).

---

## 🔄 Aggiornamenti

Quando esce una nuova versione, l'app mostra l'avviso **"È uscita la versione vX"** con il pulsante **Aggiorna ora**. Si può anche controllare a mano da menu → **🔄 Verifica aggiornamenti**. I dati non vengono toccati.

---

## 🛠️ Pubblicare la propria copia

1. Fai un **fork** del repository (o caricane i file in un repository tuo).
2. **Settings → Pages → Source: GitHub Actions**.
3. A ogni modifica di `index.html` sul ramo `main`, il workflow pubblica il sito e **assegna il numero di versione** (`1.<numero pubblicazione>`).
4. Controlla l'esito in **Actions**: ✅ pubblicato, ❌ resta online la versione precedente.

### Struttura

```
index.html                  App completa (HTML + CSS + JS in un solo file)
sw.js                       Service worker: offline e aggiornamenti
manifest.webmanifest        Nome, icone e colori dell'app installata
icons/                      Icone 192/512 e maskable
.github/workflows/deploy.yml  Pubblicazione automatica su GitHub Pages
```

Nessuna dipendenza esterna, nessuna build: per provarla in locale basta un server statico, ad esempio `python3 -m http.server`, e aprire `http://localhost:8000`.

---

## ⚙️ Personalizzazione

Dalle **Impostazioni** dell'app si configurano:
- turni e schema settimanale
- spettanze annuali (CO, CS, 937, ore di permesso breve e studio, giornate 104)
- regole automatiche (soglia cambio turno, orari pranzo/cena, orario degli aggiornamenti)
- tipi di attività, indennità, giornate di aggiornamento
- intestazione dei report e festa del patrono

---

## 📄 Note

Riferimenti normativi citati nell'app, a solo titolo indicativo: art. 78 d.P.R. 782/1985 (permessi per studio), art. 37 d.P.R. 3/1957 (congedo straordinario), L. 104/1992.
