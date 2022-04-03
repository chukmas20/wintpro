import React from 'react';
import "./Footer.css";
import red from "../images/red4.jpg";
// import appStore from "../../images/apple.jpg";




const Footer = () => {
    return (
          <footer id="footer">
            <div className="leftFooter">
                <h4>Taste the richness of wine</h4>
                <p>justwine@gmail.com</p>
                 <p>JustWine</p>
                <img src={red} alt="playstore" width="100px"  height="100px" style={{borderRadius:"50%"}}/>
            </div>

            <div className="midFooter">
            <h1>JUSTWINE.</h1>
           <p>High Quality is our first priority</p>
           <p>Copyrights 2022 &copy; JustWine</p>
            </div>
            <div className="rightFooter">
            <h4>Our Social Media</h4>
        <a href="http://instagram.com/"><i className="fab fa-instagram"></i>
          Instagram
      </a>
      <a href="http://youtube.com/"><i className="fab fa-youtube"></i>
          Youtube
      </a>
      <a href="http://Facebook.com/"><i className="fab fa-facebook-square" ></i> 
          Facebook  
      </a>
            </div>
    </footer>
    )
}

export default Footer
