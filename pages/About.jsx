import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16">
      
      <div className="pt-8 text-2xl text-center border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="flex flex-col gap-10 my-10 md:flex-row md:gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-lg object-cover"
          src={assets.about_img}
          alt="About Photo"
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p>Welcome — where fragrance meets soul. We’re passionate about crafting elegant, lasting perfumes that elevate the everyday.</p>
          <p>
            From selecting premium ingredients to designing timeless scents, we handle every detail with care. Whether you’re searching for your signature fragrance or exploring something new, we’re honored to be a part of your scent journey.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to create captivating perfumes that inspire confidence and awaken the senses. We’re here to transform everyday moments into unforgettable experiences through the power of fragrance.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            We envision a world where perfume is more than just a scent — it's a way of life. We aim to lead with creativity, authenticity, and innovation, offering fragrances that empower self-expression and spark emotion.
          </p>
        </div>
      </div>

      <div className="py-4 text-xl text-center">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col gap-8 mb-20 text-sm md:flex-row md:gap-4">
        <div className="flex flex-col gap-5 px-6 py-8 border rounded-lg md:px-10 sm:py-12">
          <b>Premium Ingredients</b>
          <p className="text-gray-600">
            We source only the finest ingredients from around the globe, ensuring every bottle of perfume is rich, refined, and long-lasting. Quality is in every drop.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-6 py-8 border rounded-lg md:px-10 sm:py-12">
          <b>Seamless Experience</b>
          <p className="text-gray-600">
            From easy online browsing to beautifully packaged deliveries, we’ve crafted every part of the experience with care and attention — so discovering your next fragrance feels just right.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-6 py-8 border rounded-lg md:px-10 sm:py-12">
          <b>Dedicated Support</b>
          <p className="text-gray-600">
            Our team is here to help with personalized recommendations and prompt assistance. Whether you’re gifting or treating yourself, we’re here to make it special.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
