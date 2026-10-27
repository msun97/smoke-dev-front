import { useEffect, useState } from 'react';
import { Position } from '../app/page';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type MarkerData = {
  positions: Position[];
};

export const useMarkerData = () => {
  const [markerData, setMarkerData] = useState<MarkerData | null>(null);

  useEffect(() => {
    const fetchMarkerData = async () => {
      const res = await fetch(`${API_URL}/map/marker`);
      const data = await res.json();
      setMarkerData(data);
    };

    fetchMarkerData();
  }, []);

  return markerData;
};
