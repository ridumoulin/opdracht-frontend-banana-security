# Opdrachtbeschrijving

## Inleiding

Het toonaangevende bedrijf Banana Security specialiseert zich in het bewaren van geheimen. Hun datacenter staat vol met
persoonlijke geheimen van klanten die het te veel moeite vinden om ze zelf te onthouden. Banana Security is al meer dan
een jaar van plan haar klanten de mogelijkheid te geven hun gegevens online te bekijken. Dit mag natuurlijk alleen
bekeken worden wanneer de gebruiker ingelogd is. Deze implementatie zou eigenlijk verzorgd worden door hun werknemer
Tim, [maar ze hebben hem helaas moeten ontslaan](https://speld.nl/2016/01/08/icter-tim-ging-een-jaar-offline-en-nu-is-hij-ontslagen/)
. Daarom huren ze jou in om de klus te klaren!

![screenshot](src/assets/screenshot.png)

## Applicatie starten

Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de `node_modules` door het volgende
commando in de terminal te runnen:

```
npm install
```

Wanneer dit klaar is, kun je de applicatie starten met behulp van:

```
npm start
```

of gebruik de WebStorm knop (npm start). Open [http://localhost:3000](http://localhost:3000/) om de pagina in de browser
te bekijken. Begin met het maken van wijzigingen in `src/App.js`: elke keer als je een bestand opslaat, zullen de
wijzigingen te zien zijn op de webpagina.

## Randvoorwaarden

De applicatie heeft op dit moment al vier pagina's met werkende routing:

1. Home pagina (`/`)
2. Profiel pagina (`/profile`)
3. Sign in (login) pagina (`/signin`)
4. Sign up (registratie) pagina (`/signup`)

Je gaat de volgende concepten implementeren:

* Je implementeert React Context doormiddel van een custom Provider component (`AuthContext.js`);
* Je hebt nog geen echte invoervelden nodig voor het inloggen. Het in- en uitlog-proces is niets meer dan een simpele
  state-toggle die wordt beheerd in de context:

```javascript
const [isAuth, toggleIsAuth] = useState(false);
```

* De navigatiebalk laat alleen een _uitlog_-knop zien bij `true` (ingelogd) of de _inlog_- en _registratie_-knoppen
  bij `false` (niet ingelogd). Deze data komt uit de context;
* De profielpagina is alleen te bezoeken wanneer de gebruiker is ingelogd;
* Wanneer de gebruiker het inlog-_formulier_ op de Sign in pagina verstuurd, wordt de `login`-functie uit de context
  aangeroepen. Deze functie doet het volgende:
    * Zet de state op `true`;
    * Logt 'Gebruiker is ingelogd!' in de console
    * Stuurt de gebruiker door naar de profielpagina
* Wanneer de gebruiker op de _uitlog_-knop drukt, wordt de `logout`-functie uit de context aangeroepen. Deze functie
  doet het volgende:
    * Zet de state op `false`;
    * Logt 'Gebruiker is uitgelogd!' in de console
    * Stuurt de gebruiker door naar de homepagina

## Stappenplan

Als je niet zo goed weet waar je moet beginnen, kun je onderstaand stappenplan volgen:

1. Maak een context-bestand (`AuthContext.js`) met daarin (je raadt het niet!) een `AuthContext`.
2. Creer dan het custom Provider-component. Uit dit component return je het echte `AuthContext.Provider` component.
3. Zorg ervoor dat we het custom Provider-component zometeen om de applicatie kunnen wikkelen door de children property
   te implementeren.
4. Maak een data-object aan die je meegeeft aan de `value`-property en zet daar wat test-data in.
5. Wrap dit om het `<App />`-component in `index.js`
6. Lees de context uit in één van de pagina-componenten om te kijken of jouw eerste opzet functioneel is (
   met `useContext`)
7. Gelukt? Top. Dan is het tijd om state aan te maken in het custom Provider-component. Noem deze
   state-variabele `isAuth` of `isAuthenticated` en zet de initiële waarde op `false`. Geef de waarde van de state mee
   aan het data object.
8. Lees deze authenticatie-status uit in het `<NavBar />` component. Krijg je het te zien in de console? Zorg er dan
   voor dat je op basis van deze status een inloggen- en registreren-knop laat zien, **of** alleen een uitlog-knop.
9. Schrijf een inlog-functie in het custom Provider-component en maak deze beschikbaar in het data-object. In de
   randvoorwaarden staat beschreven wat deze functie moet doen.
10. Maak de knop in het formulier in `SignIn.js` functioneel. Als het formulier wordt _gesubmit_, roep je de
    login-functie uit de context aan!
11. Schrijf een uitlog-functie in het custom Provider-component en maak deze beschikbaar in het data-object. In de
    randvoorwaarden staat beschreven wat deze functie moet doen.
12. Maak de knop in de navigatie (`NavBar.js`) functioneel. Als erop wordt geklikt, roep je de logout-functie uit de
    context aan!
13. Ten slotte kun je de route naar `/profile` beveiligen met een private route.

## Bonus-opdrachten
**Bonus 1:**
* Maak alvast invoervelden in het login- en registratie-formulier die de gebruiker zou kunnen invullen. Voor het inlog-formulier zijn dat _emailadres_ en _wachtwoord_. Voor het registratieformulier zijn dat _emailadres_, _wachtwoord_ en _gebruikersnaam_. Je hoeft nog
  niets met de ingevulde data te doen, dit komt pas volgende les!

**Bonus 2:**
* Breidt de state uit van een boolean naar een object. De initiele waarde moet er zo uitzien: `{isAuth: false, user: ''}`
* Nu de state een object is, werkt het togglen van `isAuth` natuurlijk ook anders in de login- en logout-functie. Pas dit aan zodat het weer werkt!
* Zorg ervoor dat de inhoud van de state (dus de keys `isAuth` en `user`) worden doorgegeven in het data-object.
* Zorg er dan nu voor dat het _emailadres_ wordt meegegeven bij het aanroepen van de login functie vanuit `SignIn.js`
* Zorg ervoor dat er in het custom Provider-component voor gezorgd wordt dat dat emailadres wordt opgeslagen onder `user` in de state.
* Laat, als er een gebruiker is ingelogd, het emailadres zien in de navigatie.
