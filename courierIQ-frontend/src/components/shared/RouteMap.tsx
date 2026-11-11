import Map, {
  Marker,
  GeolocateControl,
  NavigationControl,
  Source,
  Layer,
  type MapRef,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

interface RouteMapProps {
  pickupCoords?: { latitude: number; longitude: number } | null;
  dropoffCoords?: { latitude: number; longitude: number } | null;
}

export const RouteMap = ({ pickupCoords, dropoffCoords }: RouteMapProps) => {
  const [viewState, setViewState] = useState({
    longitude: -1.0232,
    latitude: 7.9465,
    zoom: 5.5,
  });

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        setViewState({
          latitude: lat,
          longitude: long,
          zoom: 14,
        });
      });
  }, []);

  useEffect(() => {
    // Only run this if BOTH pins exist on the map
    if (pickupCoords && dropoffCoords && mapRef.current) {
      // Calculate the Bounding Box (The perfect rectangle that fits both pins)
      const minLng = Math.min(pickupCoords.longitude, dropoffCoords.longitude);
      const minLat = Math.min(pickupCoords.latitude, dropoffCoords.latitude);
      const maxLng = Math.max(pickupCoords.longitude, dropoffCoords.longitude);
      const maxLat = Math.max(pickupCoords.latitude, dropoffCoords.latitude);

      // Tell Mapbox to fly there! (Padding adds nice empty space around the edges)
      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 80, duration: 1000 },
      );
    }
  }, [pickupCoords, dropoffCoords]); // <-- This tells React to run this every time the pins change!

  const routeData =
    pickupCoords && dropoffCoords
      ? {
          type: "Feature" as const,
          properties: {},
          geometry: {
            type: "LineString" as const,
            coordinates: [
              [pickupCoords.longitude, pickupCoords.latitude],
              [dropoffCoords.longitude, dropoffCoords.latitude],
            ],
          },
        }
      : null;

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-border">
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        {...viewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        onMove={(event) => setViewState(event.viewState)}
      >
        {pickupCoords && (
          <Marker
            latitude={pickupCoords.latitude}
            longitude={pickupCoords.longitude}
            color="red"
          />
        )}

        {dropoffCoords && (
          <Marker
            latitude={dropoffCoords.latitude}
            longitude={dropoffCoords.longitude}
            color="blue"
          />
        )}

        {routeData && (
          <Source id="route-source" type="geojson" data={routeData}>
            <Layer
              id="route-layer"
              type="line"
              paint={{
                "line-color": "#3b41c5",
                "line-width": 4,
              }}
            />
          </Source>
        )}

        <GeolocateControl
          position="top-right"
          trackUserLocation={true}
          // showUserHeading={true}
        />
        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
};
