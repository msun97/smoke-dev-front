import React from 'react'

type propsAddButton = {
  addMode:boolean;
  onClick: () => void;
}
const AddButton = ({addMode, onClick}:propsAddButton) => {
  return (
    <button 
      className='w-10 h-10 rounded-full bg-white text-gray-900 text-[20px] shadow-md hover:bg-gray-100 cursor-pointer' 
      aria-label='흡연 구역 추가'
      onClick={onClick}
    >
        {addMode ? 'x' : '+'}
    </button>
  ) 
}

export default AddButton