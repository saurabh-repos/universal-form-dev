import React from 'react'
import ShortParaValidation from './ShortParaValidation'

function ShortAnswer() {
  return (
    <div className='py-2'>
      <p className='text-sm text-black pl-4'>Short Answer Text</p>
      <div className='py-1'>
      <ShortParaValidation/>
      </div>
    </div>
  )
}

export default ShortAnswer
