from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from typing import Optional

app = FastAPI(title="Passanten API")

# CORS aktivieren
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# CSV laden
df = pd.read_csv("Gesamtdatensatz.csv")
print(f"Daten geladen: {len(df)} Zeilen")
print(f"Spalten: {df.columns.tolist()}")

# Spalten automatisch finden
location_col = 'Standort'
date_col = 'Datum'
time_col = 'Uhrzeit'
adults_col = 'Erwachsene'
children_col = 'Kinder'

# Falls Spalten anders heissen, hier anpassen
for col in df.columns:
    if 'standort' in col.lower() or 'location' in col.lower():
        location_col = col
    if 'datum' in col.lower() or 'date' in col.lower():
        date_col = col
    if 'zeit' in col.lower() or 'time' in col.lower():
        time_col = col
    if 'erwachsen' in col.lower() or 'adult' in col.lower():
        adults_col = col
    if 'kind' in col.lower() or 'child' in col.lower():
        children_col = col

print(f"Erkannte Spalten: Location={location_col}, Date={date_col}, Time={time_col}")
print(f"Erwachsene={adults_col}, Kinder={children_col}")

# ENDPOINT 1: Status
@app.get("/")
def status():
    return {
        "status": "API aktiv",
        "zeilen": len(df),
        "spalten": df.columns.tolist()
    }

# ENDPOINT 2: Alle Standorte
@app.get("/api/locations")
def get_locations():
    if location_col in df.columns:
        locations = df[location_col].dropna().unique().tolist()
    else:
        locations = []
    return {"locations": locations}

# ENDPOINT 3: Zeitreihen-Daten (Timechart)
@app.get("/api/timeseries")
def get_timeseries(location: Optional[str] = None):
    data = df.copy()
    
    # Nach Standort filtern
    if location and location != 'all' and location_col in df.columns:
        data = data[data[location_col] == location]
    
    # Datum und Zeit kombinieren
    if date_col in data.columns and time_col in data.columns:
        data['timestamp'] = pd.to_datetime(
            data[date_col].astype(str) + ' ' + data[time_col].astype(str),
            errors='coerce'
        )
    elif date_col in data.columns:
        data['timestamp'] = pd.to_datetime(data[date_col], errors='coerce')
    
    # Daten vorbereiten
    result = []
    
    for _, row in data.head(1000).iterrows():
        # Erwachsene
        if adults_col in row and pd.notna(row[adults_col]):
            result.append({
                'hour': str(row['timestamp']) if 'timestamp' in row else '',
                'count': int(row[adults_col]),
                'age_group': 'Erwachsene',
                'location_name': row[location_col] if location_col in row else 'Unbekannt'
            })
        
        # Kinder
        if children_col in row and pd.notna(row[children_col]):
            result.append({
                'hour': str(row['timestamp']) if 'timestamp' in row else '',
                'count': int(row[children_col]),
                'age_group': 'Kinder',
                'location_name': row[location_col] if location_col in row else 'Unbekannt'
            })
    
    return result

# ENDPOINT 4: Standort-Vergleich (Lokalisation)
@app.get("/api/location-comparison")
def get_location_comparison():
    if location_col not in df.columns:
        return []
    
    result = []
    
    for location in df[location_col].unique():
        location_data = df[df[location_col] == location]
        
        # Erwachsene
        if adults_col in df.columns:
            adults_sum = location_data[adults_col].sum()
            result.append({
                'location_name': location,
                'age_group': 'Erwachsene',
                'count': int(adults_sum)
            })
        
        # Kinder
        if children_col in df.columns:
            children_sum = location_data[children_col].sum()
            result.append({
                'location_name': location,
                'age_group': 'Kinder',
                'count': int(children_sum)
            })
    
    return result

# ENDPOINT 5: Statistiken
@app.get("/api/statistics")
def get_statistics(location: Optional[str] = None):
    data = df.copy()
    
    # Nach Standort filtern
    if location and location != 'all' and location_col in df.columns:
        data = data[data[location_col] == location]
    
    # Zahlen berechnen
    total_adults = int(data[adults_col].sum()) if adults_col in data.columns else 0
    total_children = int(data[children_col].sum()) if children_col in data.columns else 0
    total = total_adults + total_children
    
    # Durchschnitt pro Stunde
    avg_adults = round(data[adults_col].mean(), 1) if adults_col in data.columns else 0
    avg_children = round(data[children_col].mean(), 1) if children_col in data.columns else 0
    
    # Prozentsatz Kinder
    children_percentage = round((total_children / total * 100), 1) if total > 0 else 0
    
    return {
        "totalAdults": total_adults,
        "totalChildren": total_children,
        "total": total,
        "avgAdults": avg_adults,
        "avgChildren": avg_children,
        "childrenPercentage": children_percentage,
        "entries": len(data)
    }

# ENDPOINT 6: Map-Daten
@app.get("/api/map-data")
def get_map_data():
    if location_col not in df.columns:
        return []
    
    result = []
    for i, location in enumerate(df[location_col].unique()):
        location_data = df[df[location_col] == location]
        
        total_adults = int(location_data[adults_col].sum()) if adults_col in df.columns else 0
        total_children = int(location_data[children_col].sum()) if children_col in df.columns else 0
        
        result.append({
            'location_name': location,
            'lat': 47.5 + i * 0.01,
            'lon': 7.6 + i * 0.01,
            'adults': total_adults,
            'children': total_children,
            'total': total_adults + total_children
        })
    
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)