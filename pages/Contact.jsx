import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='pt-10 text-2xl text-center border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className='flex flex-col justify-center gap-10 my-10 md:flex-row mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Photo" />
        <div className='flex flex-col items-start justify-center gap-6'>
          <p className='text-xl font-semibold text-gray-600'>Our Perfume Studio</p>
          <p className='text-gray-500'>Gate 4, Habib University <br />Pehlwan Goth, Karachi, Pakistan</p>
          <p className='text-gray-500'>Tel: +92-331-25648 <br />Email: care@Aura.com</p>
          
          <p className='text-xl font-semibold text-gray-600'>Join Our Fragrance Journey</p>
          <p className='text-gray-500'>
            Passionate about perfumes? We’re always looking for curious, creative minds to join our team. <br />
            Explore roles in fragrance design, brand storytelling, and scent creation — and help us craft aromas that inspire.
          </p>
          <button className='px-8 py-4 text-sm transition-all duration-500 border border-black hover:bg-gray-800 hover:text-white'>
            Explore Opportunities
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact
