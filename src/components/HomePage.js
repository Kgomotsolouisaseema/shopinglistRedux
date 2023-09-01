import React from 'react';
import shop from "../assests/shop.png"
import SignIn from './SignIn';


function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to the Shopping List App</h1>
            <p>This app helps you manage your shopping list efficiently.</p>
      <img alt='add' src={shop} className='app-logo' ></img>
      {/* <div> */}
      <SignIn/>
      {/* </div> */}
    </div>
  );
}

export default HomePage;
