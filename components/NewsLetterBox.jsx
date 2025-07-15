import React, { useState } from 'react';

const NewsLetterBox = () => {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setSuccessMessage('Thank you for subscribing!');
            setEmail('');
        } else {
            setSuccessMessage('Please enter a valid email address.');
        }
    };

    return (
        <div className='mt-10 text-center'>
            <p className='text-2xl font-medium text-gray-800'>Unlock 20% Off | Subscribe Today!</p>
            <p className='mt-3 text-gray-400'>Don't miss out—unlock your savings now by subscribing below!</p>
            <form onSubmit={onSubmitHandler} className='flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2'>
                <input 
                    className='w-full outline-none sm:flex-1' 
                    type="email" 
                    placeholder='hello@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <button type='submit' className='px-10 py-4 text-xs text-white bg-black'>SUBSCRIBE</button>
            </form>
            {successMessage && <p className='mt-3 text-green-500'>{successMessage}</p>}
        </div>
    );
};

export default NewsLetterBox;
