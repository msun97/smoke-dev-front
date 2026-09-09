"use client";

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Position, ReqAddMarker } from '../app/page';

const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&libraries=services&autoload=false`;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Marker =  {
  positions : Position[]
}

type PropsKakaoMap = {
  addMode: boolean;
  clientPoint: Position | null;
  onChange : (item:ReqAddMarker) => void
};

const KakaoMap = ({addMode, clientPoint, onChange}:PropsKakaoMap) => {
  
  const [markerData, setMarkerData] = useState<Marker | null>(null);  
  const [centerName, setCenterName] = useState<string|null> (null)
  const [centerAddress, setCenterAddress] = useState<string|null> (null)

  useEffect(() => {
    const fetchMarkerData = async () => {
      const res = await fetch(`${API_URL}/map/marker`, {})
      const data = await res.json();
      setMarkerData(data);
    };
    
    fetchMarkerData();
  }, [])


  const getCenterPosition = (position: kakao.maps.Map) => {    
    if (!addMode) return;
  const geocoder = new kakao.maps.services.Geocoder();
    
    const center = position.getCenter();
    geocoder.coord2Address(center.getLng(), center.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK && result[0])
        console.log(result)
        setCenterName(result[0].road_address?.building_name || result[0].address.address_name )
    })
    

    geocoder.coord2Address(center.getLng(), center.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK && result[0])
        setCenterAddress(result[0].address.address_name)
    })

    if (center && centerName && centerAddress ){
      const saveData = {lat: center.getLat(), lng: center.getLng(), name: centerName, address: centerAddress};
      onChange(saveData);
    }
  }

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" defer/>
      <Map
        center={ clientPoint ? {lat: clientPoint.lat, lng: clientPoint.lng} : { lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100%", overflow: 'hidden'}}
        onCenterChanged={(target) => getCenterPosition(target)}
      >
      {markerData && markerData.positions ?  markerData.positions.map((item, index) => (
        <MapMarker key={index} position={item} />
      )) : <></>}
      </Map>
    </>
  );
};

export default KakaoMap;