# Bibliotheken: React-Leaflet und MUI

Beide Bibliotheken sind in diesem Projekt bereits vorinstalliert und werden mit den anderen Abhängigkeiten mit dem `npm i`-Befehl installiert.

Verschaff dir zunächst einen Überblick über den Code in diesem Projekt: In der App.css ist wieder ein Grid definiert (dieses Mal mit Klassen-Selektoren). Die App.jsx hat drei Kind-Komponenten: Header.jsx, Sidebar.jsx und Map.jsx. Die Daten kommen aus dem Ordner assets:

- 4.5_week.geojson.json - die Datei enthält aktuelle Erdbeben der Stufe 4.5 oder höher. (Quelle: USGS Feed, https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- plate_boundaries: Grenzverlauf tektonische Platten (Quelle: Hugo Ahlenius, Nordpil and Peter Bird, https://github.com/fraxen/tectonicplates/tree/master)

## 1. React-Leaflet

### Aufgabe 1.1 - Die MapContainer-Komponente anpassen:

Verändere in Map, MapContainer-Komponente die Werte für "center" und "zoom". Wähle dann für "zoom" einen Wert, welcher für eine globale Erdbebenkarte geeignet ist. <br>
**Achtung**:

- Um deine Änderungen zu sehen, musst du das Browserfenster manuell neu laden (z.B. mit STRG+R). Die _"Instanz"_ der Leaflet-Karte wird nicht durch React bzw "Hot Module Reloading" (des dev servers) überwacht und daher nicht automatisch aktualisiert.
- Beachte auch das "style"-Prop. Damit die Karte angezeigt werden kann, müsst du für den Container eine Höhen-Angabe definieren (hier bereits gemacht: 95vh - 95% des Browserfensters). Zusammen mit einem fehlenden Import des Leaflet-CSS (hier in der App.jsx) ist dies der häufigste Grund, warum eine Leaflet Karte nicht, oder nur unvollständig, angezeigt wird.

### Aufgabe 1.2 - Die Basiskarte (TileLayer) ändern:

Du benötigst zumindest eine "TileLayer" Komponente, damit Leaflet eine Karte rendern kann. Beachte die Angaben von URL (Link zur Karte) und Attribution (Quellenangabe). Du findest weitere Basiskarten [hier](https://leaflet-extras.github.io/leaflet-providers/preview/). Wähle eine passende Karte aus der Liste (links, z.B. "Stadia.StamenTerrain") aus. Der Dialog (Mitte, oben) zeigt dir im Code-Beispiel die zugehörige URL und Attribution an. Kopiere beide Werte und ersetze die Strings in deiner TileLayer-Komponente.
**Achtung**: In der URL musst du `.{ext}` für die Dateiendung durch `.png` ersetzen.

### Aufgabe 1.3 - Vector Overlays plotten.

Die Datenbasis enthält Punktdaten für das Epizentrum des Erdbebens ([USGS Metadaten](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)). Statt einer "Marker"-Komponente können wir mit "CircleMarker" ([Leaflet](https://leafletjs.com/reference.html#circlemarker), [React-Leaflet](https://react-leaflet.js.org/docs/example-vector-layers/)) Kreisflächen plotten. Schau dir die verlinkte Dokumentation kurz an, um zu verstehen, welche "Props" erwartet werden. Passe dann diese Props an:

- center: Ersetze "position" durch "center" (Marker verwendet "position, CircleMarker "center"). Beachte auch, dass [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) Koordinaten in der Reihenfolge lon, lat, depth definiert, Leaflet aber lat,lon erwartet. Man muss also immer die jeweiligen Dokumentation mit im Blick behalten :/

- radius: Erwartet einen Zahlenwert. Verwende dazu die Magnitude ("mag"). Du kannst den Wert direkt im Prop multiplizieren bzw. exponentieren (z.B. mit `** 2`) um die Kreisflächen zu vergrössern.

- pathOptions: Vergib einen Farbwert. Du kannst auch Hex-Werte verwenden. Achte auf die doppelte Klammer (`{{}}`) - analog zu Inline-Stilen.

### Aufgabe 1.4 - Ein GeoJSON einbinden.

Die Datei plate_boundaries.geojson.json im Ordner "assets" ist ein GeoJSON, welches die Grenzen der tektonischen Platten enthält. Die Props der Komponente sind [hier](https://react-leaflet.js.org/docs/api-components/#geojson) beschrieben.

- Importiere zunächst die Komponente - du kannst `GeoJSON` einfach der import-Liste am Anfang der Map.jsx hinzufügen.
- Füge dann diesen Code hinter der TileLayer-Komponente und vor `earthquakes.map...`ein: `<GeoJSON data={null} />`
- Importiere die JSON-Datei mit den Grenzen und ändere den Wert des "data"-prop (aktuell: "null") - orientiere dich dabei am Import der Erdbebendaten.

### Aufgabe 1.5 - Interaktion erlauben - ein Erdbeben fokussieren und in React State speichern

Du möchtest mithilfe eines Buttons im Popup Informationen über ein spezielles Erdbeben erhalten (und diese später in der Seitenleiste anzeigen). Führe folgende Schritte aus:

- Füge der App.jsx einen useStateHook hinzu. Der "default"-Wert sollte ein leeres Objekt (`{}`) sein.
- Erstelle in der Map.jsx, innerhalb der Popup-Komponente, ein HTML button-Element mit onClick-Handler.
- Leite deine setState-Funktion aus dem Hook mittels Props von der App.jsx an die Map.jsx und übergib sie an den onClick-Handler. Sie soll einfach "d" in State speichern (d ist das jeweilige Erdbeben - die Variable stammt aus der map()-Funktion oberhalb)
- Teste mit einem console.log() der State-Variable in der App.jsx sowie durch Klicks auf Buttons in verschiedenen Erdbeben-Popups, dass das jeweilige Erdbeben in React State gespeichert wird.
- Debugging: Hast du Props auf der Eltern- UND der Kindkomponente definiert? Verwendest du für Props geschwungene Klammern (`{}`) in der Kind-Komponente (Map.jsx)? Ist dein onClick-Handler richtig?

### Aufgabe 1.6 - Fokussiertes Erdbeben in Seitenleiste anzeigen

Übergib die State-Variable deines Hooks mit Props an die Sidebar.jsx. Gestalte die Seitenleiste so, dass Informationen wie Ort (place), Magnitude (mag), Lat / Lon, Datum / Uhrzeit (time) aus dem jeweils fokussierten Erdbeben (Aufgabe 1.5) angezeigt werden.

**Achtung**: Dein "Default-State" im Hook ist ein leeres Objekt und wird erst mit einem Klick auf ein Button im Popup mit Daten gefüllt. Daher musst du in der Seitenleiste auch den Fall beachten, dass Daten aus dem Erdbebenobjekt (noch) nicht existieren. Eine Abfrage wie `<p>Lat: {d.geometry.coordinates[1]}</p>` auf einem leeren Objekt führt zu einem Fehler (siehe Browserkonsole). Schreibe die Abfrage stattdessen so: `<p>Lat: {earthquake.geometry?.coordinates?.[1] ?? ""}</p>`
Für die Zeitangabe verwende diesen Code:

```
// Parst den Zeitstempel in ms zu einem Datumsstring, falls das Objekt die Eigenschaft "time" hat:
{earthquake.properties?.time
  ? new Date(earthquake.properties.time).toLocaleString()
  : ""}
```

**Syntax-Erklärung:**

- Die Fragezeichen markieren, dass das eine Eigenschaft/Property (hier "geometry", bzw. "coordinates") des Objekts möglicherweise nicht existiert. Stichwort: "optional chaining" (`?.`)
- Das doppelte Fragezeichen versucht den Wert linksseitig zu lesen. Ist dieser "undefined" (weil das leere Objekt die Eigenschaften nicht hat), so wird der Wert rechtsseitig (der leere String "") zurückgegeben anstatt das ein Fehler angezeigt wird. Stichwort: "Nullish coalescing operator" (`??`).

## 2. Material UI (MUI)

[Material UI](https://mui.com/material-ui/getting-started/) ist eine Komponenten-Bibliothek für UI-Elemente. Anstatt Elemente (z.B. Buttons) oder Element-Gruppen (z.B. Tabellen) mit HTML und CSS von Grund auf selbst entwerfen zu müssen, bietet die von Google entwickelte Bibliothek einen Katalog mit vorgefertigten Elementen. MUI eignet sich besonders für die Verwendung mit React.

Am einfachsten ist es [UI-Komponenten](https://mui.com/material-ui/all-components/) direkt aus den Code-Beispielen der Material UI Webseite in den eigenen Code zu kopieren und diese weiter anzupassen. Dabei sollten zunächst alle nicht benötigten Bestandteile entfernt werden. Die [Component API](https://mui.com/material-ui/api/accordion/) listet alle möglichen Anpassungsmöglichkeiten ("props", vergleichbar mit HTML Attributen) auf. Eine weitere Anpassung der Stile kann über das [sx-prop](https://mui.com/material-ui/customization/how-to-customize/) und analog zu Inline-CSS erfolgen. Auch ein style-prop funktioniert in den meisten Fällen.

## Aufgabe 2.1 - Einen HTML-Buttonelement durch die MUI-Buttonkomponente ersetzen.

Für manche HTML-Elemente gibt es ein direktes Äquivalent in MUI. Schau dir die [Dokumentation] zur "Button"-Komponente an. Du kannst den Button mit Props wie "variant", "color" oder "size" anpassen. Beachte, dass fast ausschliesslich vordefinierte Werte (Strings) verwendet werden müssen. Diese findest du in der [ComponentAPI](https://mui.com/material-ui/api/button/) zum Button.

- Importiere "Button" von MUI und ersetze das HTML-Element mit der MUI-Komponente. Der onClick-Handler funktioniert auch mit MUI - hier musst du nichts ändern.
- Verwende eine für dich passende Kombination aus den drei obengenannten Props um den Button anzupassen.

## Aufgabe 2.2 - Den App-Namen mit der Typography-Komponente gestalten.

Für manche HTML-Elemente gibt es kein direktes Äquivalent, diese sind stattdessen in einer generischen MUI-Komponente zusammengefasst und / oder umbenannt. Statt der h1-h6-Elemente aus HTML verwendet MUI "Typography" und steuert die Grösse wieder über das "variant"-Prop.

- Finde in der Dokumentation die Komponente und implementiere sie im Header (mit beliebigem "variant"-Prop). Die Roboto font ist bereits installiert.
- Definiere auf der Komponente das "sx"-Prop. Hier kannst du Inline-Stile wie mit dem "style"-Attribut in HTML vergeben. Verwende für die Farbe ("color") der Überschrift einen Hex-Code (String mit #-Prefix).

## Aufgabe 2.3 - Die Seitenleiste mit der Card-Komponente gestalten

(Diese Aufgabe baut auf 1.6 auf. Wenn du diese aus Zeitgründen nicht machen konntest, mach bei Aufgabe 2.4 weiter und hole 1.6 und 2.3 später nach.)

Für manche MUI-Komponenten gibt es kein HTML-Äquivalent. Sie bestehen meist aus einer Mehrzahl an weitere MUI-Komponenten, die in einem bestimmten Kontext gruppiert sind und angepasst werden können. Schau dir das erste Code-Beispiel zur [Card](https://mui.com/material-ui/react-card/) (Abschnitt "Introduction") an. Sie besteht aus Komponenten wie CardContent, CardActions und Typography um eine Oberfläche zu definieren. Die [ComponentApi](https://mui.com/material-ui/api/card-content/) beschreibt diese und weitere, verwandte Komponenten.

- Benutze den Beispiel-Code als Vorlage um deine Seitenleiste mit MUI zu gestalten. Ignoriere das Code-Schnipsel aus dem Beispielcode welches die "Bullets" definiert (`const bull = ...`). Achte wieder auf die Imports, wenn du weitere MUI-Komponenten verwendest.

## Aufgabe 2.4 - Mit einem MUI-Slider die React-Leaflet Karte steuern.

Die Erdbebenkarte verwendet aktuell den Wert Magnitude und einen fixen Faktor (Aufgabe 1.3) um den Radius der "CircleMarker"-Komponente zu ändern. Dieser Radius soll nun mithilfe eines Sliders in der Sidebar gesteuert werden.

- Definiere in der Sidebar unter der Card-Komponente, aber noch innerhalb des `<aside>...</aside>`-Elements (oder zumindest im return-Statement der Sidebar-Komponente), einen MUI Slider. Verwende das Code-Beispiel vom "Discrete Slider".
- Setze das min-Prop auf 1 (die Zahl, nicht der String), max auf 3, step auf 0.5 (Punkt, nicht Komma).
- Definiere in der App.jsx einen weiteren useStateHook. Der "Default-Wert" sollte 1 (die Zahl, nicht der String) sein.
- Leite sowohl die State-Variable und setState-Funktion an die Sidebar-Komponente mit "React Props" weiter.
- Entferne vom Slider das "defaultValue"-Prop und füge das value-Prop hinzu - der Wert sollte die State-Variable sein, die du mit Props weitergegeben hast.
- Füge dem Slider einen onChange-Handler hinzu. Für die Verwendung der setState-Funktion im onChange-Handler findest du in der Slider-Dokumentation im Code-Beispiel von "continous sliders" ein Beispiel:

```
const handleChange = (event, newValue) => {
setValue(newValue);
};

   <Slider aria-label="Volume" value={value} onChange={handleChange} />
```

- Reiche nun noch deine State-Variable aus der App.jsx an die Map.jsx weiter und ersetze den fixen Wert zur Multiplikation aus Aufgabe 1.3 mit dieser (Beispiel: `radius={d.properties.mag ** size}`). Ggf. musst du die Props (min, max, step) im Slider noch anpassen
- Teste den Slider - wenn alles funktioniert hat, sollte sich der Radius der Kreise nun mithilfe des Sliders steuern lassen!
- Falls du den Slider in der Seitenleiste verkleinern möchtest, kannst du um ihn herum mit MUI eine Box definieren:

```
      <Box sx={{ width: 200, p: 2 }}>
        <Slider
        ...
        />
      </Box>

```
