"use client";

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;
const API_URL = process.env.NEXT_API_URL;

type Position = {
  lat: number;
  lng: number;
}

type Marker =  {
  positions : Position[]
}

const KakaoMap = () => {
  
  const [markerData, setMarkerData] = useState<Marker | null>(null);

  useEffect(() => {
    const fetchMarkerData = async () => {
      const res = await fetch(`${API_URL}/map/marker`, {})
      const data = await res.json();
      setMarkerData(data);
    };
    
    fetchMarkerData();
  }, [])

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100%" }}
      >
      {markerData && markerData.positions ?  markerData.positions.map((item, index) => (
        <MapMarker key={index} position={item}>
          <div style={{color:"#000"}}>Hello World!</div>
        </MapMarker>
      )) : <></>}
      </Map>
    </>
  );
};

export default KakaoMap;