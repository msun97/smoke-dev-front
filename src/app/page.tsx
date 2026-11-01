'use client'

import type { NextPage } from 'next';
import KakaoMap from '../components/KakaoMap';
import AddButton from '../components/AddButton';
import { useState } from 'react';
import Image from 'next/image';
import AddPanel from '../components/AddPanel';

export type Position = {
  lat: number;
  lng: number;
}

export type ReqAddMarker  = {
  name: string;
  address: string;
  lat: number;
  lng: number;
}
const Home: NextPage = () => {  
  const [isAddMode, setIsAddMode] = useState(false);
  const [savePoint, setSavePoint] = useState<ReqAddMarker|null>(null);
  const [clientPoint, setClientPoint] = useState<Position|null>(null);

  const handleSetNowPoint = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => setClientPoint({lat: position.coords.latitude, lng:position.coords.longitude}));
    }
  }
  const handleChangeCenter = (item:ReqAddMarker) => {
    setSavePoint(item);
  }

  const handleAddMode = () => {
    // 이전에 잡힌 위치가 다음 추가 모드에 남지 않도록 초기화 (진입 시 현재 중심으로 다시 계산됨)
    setSavePoint(null);
    setIsAddMode(prev => !prev)
  }
  return (
    
      <main className="relative h-dvh w-full overflow-hidden">
        <KakaoMap addMode={isAddMode} clientPoint={clientPoint} onChange={handleChangeCenter}/>
        <AddPanel addMode={isAddMode} onClick={handleAddMode} position={savePoint} onNowPosition={handleSetNowPoint}/>
        {isAddMode && (
            // 핀 끝(이미지 하단 중앙)이 지도 중심에 오도록 정렬, 지도 드래그를 막지 않도록 pointer-events-none
            <div className='pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full'>
              <Image      
                  src={'/map_marker.svg'}
                  alt="marker"
                  width={48}
                  height={48}
               />
            </div>
        )}
      </main>
      
  );
};

export default Home;