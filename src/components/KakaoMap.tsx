"use client";

import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Position, ReqAddMarker } from '../app/page';
import { useMapCenter } from '../hooks/useMapCenter';
import { useMarkerData } from '../hooks/useMarkerData';

const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&libraries=services&autoload=false`;

type PropsKakaoMap = {
  addMode: boolean;
  clientPoint: Position | null;
  onChange: (item: ReqAddMarker) => void;
};

const KakaoMap = ({ addMode, clientPoint, onChange }: PropsKakaoMap) => {

  // 마커 데이터 fetch
  const markerData = useMarkerData();

  // 지도 중심 변경 이벤트 처리 함수
  const { onCenterChanged } = useMapCenter({ addMode, onChange });

  return (
    <>
      {/* 카카오맵 SDK 로드 */}
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" defer />
      <Map
        center={clientPoint ?? { lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
        onCenterChanged={onCenterChanged}
      >
        {markerData?.positions?.map((item, index) => (
          <MapMarker key={index} position={item} />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
