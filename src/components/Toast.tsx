import React from 'react'

export type ToastMessage = {
  type: 'success' | 'error';
  text: string;
}

type PropsToast = {
  message: ToastMessage | null;
}

const Toast = ({message}:PropsToast) => {
  return (
    <div
      role='status'
      aria-live='polite'
      className='pointer-events-none absolute left-1/2 top-[calc(1rem+env(safe-area-inset-top))] z-30 -translate-x-1/2'
    >
      {message && (
        <div className={`rounded-full px-5 py-3 text-sm text-white shadow-lg ${message.type === 'success' ? 'bg-gray-900' : 'bg-red-500'}`}>
          {message.text}
        </div>
      )}
    </div>
  )
}

export default Toast
