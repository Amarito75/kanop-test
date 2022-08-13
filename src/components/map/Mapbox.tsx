import React from "react";
import "./Mapbox.css";
import DeckGL from "@deck.gl/react/typed";
import StaticMap from "react-map-gl";
import { GoogleMapsOverlay as DeckOverlay } from "@deck.gl/google-maps/typed";
import { HeatmapLayer } from "@deck.gl/aggregation-layers/typed";

// Data API
const data = "https://tree-nation.com/api/projects";

function Mapbox() {
  // Mapbox token
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiYW1hcml0byIsImEiOiJjbDZuZjk1aHEwMGFhM2NxcGZ4ZnlnZ3YzIn0.XRzuAyGE0yFlQurbM7unZQ";

  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: 6.21,
    latitude: 10.46,
    zoom: 3,
    maxZoom: 10,
    pitch: 0,
    bearing: 0,
  };

  // Layers
  const layer = () =>
    new HeatmapLayer({
      id: "heatmap",
      data,
      stroked: true,
      opacity: 0.8,
      filled: true,
      radiusMinPixels: 5,
      radiusMaxPixels: 10,
      getPosition: (d) => [d.long, d.lat],
      getFillColor: [200, 0, 40, 150],
      pickable: true,
    });
  // Map style
  const MAP_STYLE = "mapbox://styles/mapbox/dark-v10";
  // Deck GL overlay
  const overlay = new DeckOverlay({
    layers: [layer()],
  });
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[layer()]}
    >
      <StaticMap mapboxAccessToken={MAPBOX_ACCESS_TOKEN} mapStyle={MAP_STYLE} />
    </DeckGL>
  );
}

export default Mapbox;
