"use client";

import { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import { Position, ReqAddMarker } from '../app/page';
import { useMapCenter } from '../hooks/useMapCenter';
import { useMarkerData } from '../hooks/useMarkerData';

const DEFAULT_CENTER = { lat: 33.5563, lng: 126.79581 };

type PropsKakaoMap = {
  addMode: boolean;
  clientPoint: Position | null;
  onChange: (item: ReqAddMarker) => void;
};

const KakaoMap = ({ addMode, clientPoint, onChange }: PropsKakaoMap) => {
  // 카카오맵 SDK 로드
  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY!,
    libraries: ['services'],
  });

  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  // 마커 데이터 fetch
  const markerData = useMarkerData();

  // 지도 중심 변경 이벤트 처리 함수
  const { onCenterChanged } = useMapCenter({ map, addMode, onChange });

  // 현재 위치 버튼을 누를 때마다(같은 좌표여도 새 객체) 해당 위치로 이동
  useEffect(() => {
    if (!clientPoint || !map) return;
    map.panTo(new kakao.maps.LatLng(clientPoint.lat, clientPoint.lng));
  }, [clientPoint, map]);

  if (loading) return null;

  return (
    <Map
      center={DEFAULT_CENTER}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      onCreate={setMap}
      onCenterChanged={onCenterChanged}
    >
      {markerData?.positions?.map((item, index) => (
        <MapMarker key={index} position={item} />
      ))}
    </Map>
  );
};

export default KakaoMap;
