import Script from 'next/script';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

const KakaoMap = () => {
  
  const clusterPositionsData = {positions : [{lat: 33.5563, lng: 126.79581}]}

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100%" }}
      >
      {clusterPositionsData.positions.map((item, index) => (
        <MapMarker key={index} position={item}>
          <div style={{color:"#000"}}>Hello World!</div>
        </MapMarker>
      ))}
      </Map>
    </>
  );
};

export default KakaoMap;