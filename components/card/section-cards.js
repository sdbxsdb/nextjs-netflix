import React from 'react'
import Card from '../card/card';

const SectionCards = (props) => {

  const {title} = props;

  return (
    <section className='px-4 text-blue20 bg-black50'>
      <h2 className='text-white10 font-semibold text-3xl'>{title}</h2>
      <div className='flex pt-6 pb-6 mt-6 mr-3 border overflow-x-scroll overflow-y-hidden'>
        <Card title="test" size='portrait'/>
      </div>
    </section>
  )
}

export default SectionCards