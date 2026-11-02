import { useCallback, useEffect, useState } from 'react';
import { Position } from '../app/page';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type MarkerData = {
  positions: Position[];
};

// 마커 목록 조회, 실패 시 null
const fetchMarkerData = async (): Promise<MarkerData | null> => {
  try {
    const res = await fetch(`${API_URL}/map/marker`);
    if (!res.ok) throw new Error(`marker fetch failed: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const useMarkerData = () => {
  const [markerData, setMarkerData] = useState<MarkerData | null>(null);

  useEffect(() => {
    fetchMarkerData().then((data) => {
      if (data) setMarkerData(data);
    });
  }, []);

  // 등록 후 다시 불러올 때 사용
  const refetch = useCallback(async () => {
    const data = await fetchMarkerData();
    if (data) setMarkerData(data);
  }, []);

  return { markerData, refetch };
};
