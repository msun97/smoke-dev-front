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
    <div className='bg-gray-50 w-[80%] h-fit  z-10 rounded-lg absolute bottom-0 left-[50%] flex flex-col items-center p-6 gap-4' style={{translate: addMode ? '-50% 0' : '-50% 100%'}}>
      <div className='absolute top-[-150%] right-[5%] z-50 flex gap-6'>
        <AddButton addMode={addMode} onClick={onClick}/>
        <GpsFixedButton onClick={onNowPosition}/>
      </div>
      {position && (
        <>
          <div className='w-full text-xl'>{position.name}</div>
          <div className='w-full text-lg'>{position.address}</div>
          <button 
            className='bg-blue-300 rounded-2xl p-4 text-2xl hover:bg-blue-400 cursor-pointer' 
            onClick={() => handleSubmit({
              lat: position.lat,
              lng: position.lng,
              address: position.address,
              name: position.name
            })}>
              저장하기
            </button>
        </>
      )}

    </div>
  )
}

export default AddPanel