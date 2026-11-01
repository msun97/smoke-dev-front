import React from 'react'
import AddButton from './AddButton';
import { ReqAddMarker } from '../app/page';
import GpsFixedButton from './GpsFixedButton';

type propsAddButton = {
  addMode:boolean;
  onClick: () => void;
  position: ReqAddMarker | null
  onNowPosition: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AddPanel = ({addMode, onClick, position, onNowPosition}:propsAddButton) => {

  const handleSubmit = async (item:ReqAddMarker) => {
    const res = await fetch(`${API_URL}/map/marker/insert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    // 패널이 닫히면 translate-y-full 로 화면 아래로 내려가고, 버튼은 패널 상단(bottom-full)에 붙어서 같이 움직임
    <div
      className={`absolute bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 transition-[translate] duration-300 ${addMode ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className='absolute bottom-full right-4 mb-4 flex gap-3'>
        <AddButton addMode={addMode} onClick={onClick}/>
        <GpsFixedButton onClick={onNowPosition}/>
      </div>
      <div
        inert={!addMode}
        className='flex flex-col items-center gap-4 rounded-t-2xl bg-white p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-gray-900 shadow-[0_-4px_16px_rgba(0,0,0,0.12)]'
      >
        {position ? (
          <>
            <div className='w-full text-xl font-semibold'>{position.name}</div>
            <div className='w-full text-base text-gray-600'>{position.address}</div>
            <button
              className='w-full bg-blue-300 rounded-2xl p-4 text-xl hover:bg-blue-400 cursor-pointer'
              onClick={() => handleSubmit({
                lat: position.lat,
                lng: position.lng,
                address: position.address,
                name: position.name
              })}>
                저장하기
              </button>
          </>
        ) : (
          <div className='w-full py-6 text-center text-gray-500'>지도를 움직여 흡연 구역 위치를 맞춰주세요</div>
        )}
      </div>
    </div>
  )
}

export default AddPanel
