from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from typing import Optional

app = FastAPI(title="Passanten API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# CSV laden
df = pd.read_csv("Gesamtdatensatz.csv")
print(f"Daten geladen: {len(df)} Zeilen")
print(f"Spalten: {list(df.columns)}")

# Spalten definieren basierend auf deinem Datensatz
location_col = 'location_name'
timestamp_col = 'timestamp'
adults_col = 'adult_pedestrians_count'
children_col = 'child_pedestrians_count'
total_col = 'pedestrians_count'

# Timestamp zu Datetime konvertieren
df[timestamp_col] = pd.to_datetime(df[timestamp_col], errors='coerce')

print(f"Verwende Spalten:")
print(f"  Standort: {location_col}")
print(f"  Zeit: {timestamp_col}")
print(f"  Erwachsene: {adults_col}")
print(f"  Kinder: {children_col}")

@app.get("/")
def status():
    return {
        "status": "API aktiv",
        "zeilen": len(df),
        "spalten": list(df.columns)
    }

@app.get("/api/locations")
def get_locations():
    locations = df[location_col].dropna().unique().tolist()
    return {"locations": sorted(locations)}

@app.get("/api/timeseries")
def get_timeseries(location: Optional[str] = None):
    data = df.copy()
    
    # Nach Standort filtern
    if location and location != 'all':
        data = data[data[location_col] == location]
    
    # Nach Zeit sortieren
    data = data.sort_values(timestamp_col)
    
    result = []
    
    # Erwachsene hinzufuegen
    for _, row in data.head(500).iterrows():
        if pd.notna(row[adults_col]) and row[adults_col] > 0:
            result.append({
                'hour': row[timestamp_col].isoformat() if pd.notna(row[timestamp_col]) else '',
                'count': int(row[adults_col]),
                'age_group': 'Erwachsene',
                'location_name': row[location_col]
            })
    
    # Kinder hinzufuegen
    for _, row in data.head(500).iterrows():
        if pd.notna(row[children_col]) and row[children_col] > 0:
            result.append({
                'hour': row[timestamp_col].isoformat() if pd.notna(row[timestamp_col]) else '',
                'count': int(row[children_col]),
                'age_group': 'Kinder',
                'location_name': row[location_col]
            })
    
    return result

@app.get("/api/location-comparison")
def get_location_comparison():
    result = []
    
    for location in df[location_col].unique():
        location_data = df[df[location_col] == location]
        
        adults_sum = int(location_data[adults_col].sum())
        children_sum = int(location_data[children_col].sum())
        
        result.append({
            'location_name': location,
            'age_group': 'Erwachsene',
            'count': adults_sum
        })
        
        result.append({
            'location_name': location,
            'age_group': 'Kinder',
            'count': children_sum
        })
    
    return result

@app.get("/api/statistics")
def get_statistics(location: Optional[str] = None):
    data = df.copy()
    
    # Nach Standort filtern
    if location and location != 'all':
        data = data[data[location_col] == location]
    
    # Zahlen berechnen
    total_adults = int(data[adults_col].sum())
    total_children = int(data[children_col].sum())
    total = total_adults + total_children
    
    avg_adults = round(data[adults_col].mean(), 1)
    avg_children = round(data[children_col].mean(), 1)
    
    children_percentage = round((total_children / total * 100), 1) if total > 0 else 0
    
    # Peak Hour finden
    if not data.empty:
        data['hour'] = data[timestamp_col].dt.hour
        hourly = data.groupby('hour')[total_col].sum()
        peak_hour = int(hourly.idxmax()) if not hourly.empty else 0
    else:
        peak_hour = 0
    
    return {
        "totalAdults": total_adults,
        "totalChildren": total_children,
        "total": total,
        "avgAdults": avg_adults,
        "avgChildren": avg_children,
        "childrenPercentage": children_percentage,
        "peakHour": f"{peak_hour}:00 Uhr",
        "entries": len(data)
    }

@app.get("/api/map-data")
def get_map_data():
    result = []
    
    for i, location in enumerate(df[location_col].unique()):
        location_data = df[df[location_col] == location]
        
        adults_sum = int(location_data[adults_col].sum())
        children_sum = int(location_data[children_col].sum())
        total = adults_sum + children_sum
        
        result.append({
            'location_name': location,
            'lat': 47.5 + i * 0.01,
            'lon': 7.6 + i * 0.01,
            'adults': adults_sum,
            'children': children_sum,
            'total': total
        })
    
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)