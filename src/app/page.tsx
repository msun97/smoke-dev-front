'use client'

import type { NextPage } from 'next';
import KakaoMap from '../components/KakaoMap';
import AddButton from '../components/AddButton';
import { useState } from 'react';
import Image from 'next/image';
import AddPanel from '../components/AddPanel';

export type ReqAddMarker = {
  name: string;
  address: string;
  lat: number;
  lng: number;
}
const Home: NextPage = () => {  
  const [isAddMode, setIsAddMode] = useState(false);
  const [savePoint, setSavePoint] = useState<ReqAddMarker|null>(null);
  
  const handleChangeCenter = (item:ReqAddMarker) => {
    setSavePoint(item);
  }

  const handleAddMode = () => {
    setIsAddMode(prev => !prev)
  }
  return (
    
      <main className="w-screen h-screen overflow-hidden relative">
        <KakaoMap addMode={isAddMode} onChange={handleChangeCenter}/>
        <AddPanel addMode={isAddMode} onClick={handleAddMode} position={savePoint}/>
        {isAddMode && (
            <div className='absolute left-1/2 top-1/2 z-10'>  
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