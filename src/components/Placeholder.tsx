import React from 'react'

type Props = {
    message: string
}

export const Placeholder = (props:Props) => {
  return (
    <div className='w-full flex-1  flex justify-center items-center bg-blue-100'>
        <h2>{props.message}</h2>
    </div>
  )
}
