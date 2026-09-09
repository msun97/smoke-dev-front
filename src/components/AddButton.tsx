import React from 'react'

type propsAddButton = {
  addMode:boolean;
  onClick: () => void;
}
const AddButton = ({addMode, onClick}:propsAddButton) => {
  return (
    <button 
      className='absolute top-[-150%] right-[5%] w-10 h-10 rounded-full bg-gray-50 text-[20px] z-50 shadow-md hover:bg-gray-100' 
      aria-label='흡연 구역 추가'
      onClick={onClick}
    >
        {addMode ? 'x' : '+'}
    </button>
  ) 
}

export default AddButton