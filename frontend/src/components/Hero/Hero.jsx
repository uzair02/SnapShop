import React from 'react'
import './Hero.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Hero = () => {

  // code for searching a product throough text
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const requestData = { query: searchQuery };
      console.log('Request Data:', requestData);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/search_and_store/',
        new URLSearchParams(requestData),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setSearchQuery('');
      console.log(response.data);
      setIsLoading(false); 
      navigate('/ProductPage');
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false); 
    }
  };


  // code for searching a product through barcode
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:8000/file/decode-barcode/', formData);

      if (response.status === 200) {
        const data = response.data;
        console.log('Product Name:', data.productName);
        setIsLoading(false); 
        navigate('/ProductPage');
        // You can update the state or perform any other actions here
      } else {
        console.error('Failed to decode barcode.');
        setIsLoading(false); 
      }
    } catch (error) {
      console.error('Error sending image to backend:', error);
    }
  };
  


  return (
    <div className="hero border-1 pb-3 h-screen">
      <div className="card bg-dark text-white border-0 mx-2 ">
        <img
          className="card-img img-fluid object-cover w-full h-full"
          src="https://source.unsplash.com/random/1920x780/?tech,dark,ecommerce,robots,shop,products"
          alt="Card"
          height={400}
        />
        <div className="card-img-overlay d-flex align-items-center">
          <div className="container ">
            <h1 className="font-bold text-6xl leading-tight text-center mb-8">
              Find the best deals on <br /> SnapShop
            </h1>
            <p className="text-lg mt-[-8px] mb-4 text-center">
              Where Savings Meet Simplicity – Find Your Best Deal Today!"
            </p>
            <div className="d-flex justify-content-center h-100">
              <div className="searchbar">
                <input
                  className="search_input"
                  type="text"
                  placeholder="Search product"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <a href="#" className="search_icon link-btn" onClick={handleSearch}><i className="fas fa-search"></i></a>
                <div className="file-upload-container">
                  <input className="file-input search_input " type="file" accept="image/*" id='fileInput' onChange={handleImageChange} />
                  <label for="fileInput" className="custom-button">
                    <span className="button-text">{image ? image.name : 'Choose File'}</span>
                  </label>
                </div> 
                <a href="#" className="search_icon file-btn" onClick={handleSubmit}><i className="fas fa-upload"></i></a>
              </div>
            </div>
            {isLoading && (
            <div class="text-center pt-3">
              {/* <span class="">Estimated Loading time 3 minutes...</span> */}
              <div class="spinner-border" style={{width: "40px", height: "40px"}} role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
