import React from 'react'
import Button from './Button'

const Container = ({children,title='',btn='',btnClick=()=>{}}) => {
  return (
    <div className="rounded-md shadow-md w-full p-4 mx-auto">
        <div className=' flex justify-between items-center'>
        <h2 className="text-xl font-bold opacity-60 text-center sm:text-left">
          {title}
        </h2>
        {btn&&<Button onClick={btnClick}>{btn}</Button>}
        </div>
      <div className="p-4 flex justify-between border-b-2 items-center mb-4">
      </div>
      {/* Items container */}
      {children}
    </div>
  )
}

export default Container
