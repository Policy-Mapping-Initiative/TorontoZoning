import L from 'leaflet';

export const onMouseEvent = (event: L.LeafletMouseEvent, type: string) => {
  switch (type) {
    case 'over':
      event.target.setStyle({ fillOpacity: 0.5 });
      break;
    case 'out':
      event.target.setStyle({ fillOpacity: 0.2 });
      break;
    default:
      break;
  }
};
