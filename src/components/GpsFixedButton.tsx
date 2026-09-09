import Image from 'next/image'
import React from 'react'

type PropsGpsFixedButton = {
  onClick: () => void;
}

const GpsFixedButton = ({onClick}:PropsGpsFixedButton) => {
  return (
    <button 
      className=' w-10 h-10 rounded-full bg-gray-50 text-[20px] shadow-md hover:bg-gray-100 flex items-center justify-center' 
      aria-label='현재 위치로 이동'  
      onClick={onClick}
    >
      <Image
          src={'/gps_fixed_fill.svg'}
          alt="gps"
          width={20}
          height={20}
       />
    </button>
  ) 
}

export default GpsFixedButton