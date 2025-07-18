import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100'>
      
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
        
        <div className='flex flex-col-reverse flex-1 gap-3 sm:flex-row'>
          <div className='flex justify-between overflow-x-auto sm:flex-col sm:overflow-y-scroll sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img 
                  src={item} 
                  key={index}
                  onClick={() => setImage(item)} 
                  className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                    image === item ? 'border-2 border-gray-600 py-2 px-2' : ''
                  }`} 
                  alt="Photo" 
                />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="Photo" />
          </div>
        </div>
        
        <div className='flex-1'>
          <h1 className='mt-2 text-2xl font-medium'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="Ratings" className="w-3 5" />
            <img src={assets.star_icon} alt="Ratings" className="w-3 5" />
            <img src={assets.star_icon} alt="Ratings" className="w-3 5" />
            <img src={assets.star_icon} alt="Ratings" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="Ratings" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button 
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 rounded-md ${item === size ? 'border-orange-500' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => addToCart(productData._id, size)} 
            className='px-8 py-3 text-sm text-white bg-black active:bg-gray-700'
          >
            ADD TO BAG
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='flex flex-col gap-1 mt-5 text-sm text-gray-500'>
            <p>Authentic Perfumes – Guaranteed Original.</p>
            <p>Complimentary Samples with Every Order.</p>
            <p>Free Returns Within 10 Days – Because Your Fragrance Should Be Just Right.</p>
          </div>
        </div>
      </div>
      
      <div className='mt-20'>
        <div className='flex'>
          <b className='px-5 py-3 text-sm border'>Perfume Story</b>
          <p className='px-5 py-3 text-sm border'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border'>
          <p>Discover perfumes that speak to your senses. Crafted with the finest ingredients, this fragrance embodies elegance, allure, and the art of perfumery. Each bottle reveals layers of quality – from intricate notes to lasting impressions.</p>
          <p>Perfect for moments that matter, this perfume is a timeless companion — whether you’re stepping into a quiet evening or celebrating a bold occasion. Let your presence leave a lasting impression wherever you go.</p>
        </div>
      </div>
      
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
