import geopandas as gpd
import osmnx

boundary_geojson = gpd.read_file("./src/data/ZoningArea.json")
result = osmnx.geometries.geometries_from_polygon(boundary_geojson.iloc[0].geometry, tags = {"highway": True})
result.to_json()
