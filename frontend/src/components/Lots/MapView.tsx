import React from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Lot } from './LotsTable';

interface Props {
  lots: Lot[];
}

const MapView: React.FC<Props> = ({ lots }) => {
  const first = lots.find(l => l.coordinates && l.coordinates.length);
  const center: [number, number] = first ? [first.coordinates![0][0], first.coordinates![0][1]] : [0, 0];

  return (
    <MapContainer center={center} zoom={13} style={{ height: 400, width: '100%', marginTop: 16 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {lots.map(l => (
        l.coordinates ? (
          <Polygon key={l.id} positions={l.coordinates} pathOptions={{ color: 'blue' }}>
            <Popup>{l.name}</Popup>
          </Polygon>
        ) : null
      ))}
    </MapContainer>
  );
};

export default MapView;