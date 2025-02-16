import React from 'react'

const SubmitBtn = ({children,className}) => {
  return (
    <>
        <button className="btn bg-green-clr text-white px-3 rounded-1">{children}</button>
    </>
  )
}

export default SubmitBtn