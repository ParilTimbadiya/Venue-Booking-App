import './Home.css';
import Sponsers from './Sponsers/Sponsers';
import Gallery from './Gallery/Gallery';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React,{ useEffect, useState } from 'react';

function Home() {
  const [backgroundImage, setBackgroundImage] = useState(''); // Add useState for backgroundImage

  useEffect(() => {
    const images = [
      'https://media-hosting.imagekit.io//54d75f5a41d44e70/contact-bg.png?Expires=1834833047&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=myi1MHuNpepzL5LLNsMQlb4ukU75b9EVmgFOlbUPVNJcmxaMHoFnl5pGswARDtV6RijTNzqtIFuAge3P6ScozeGtXUX9v0Q3t13D~DDmCkrG1cKFSw~ad0fTKgSzVHuz4kp-RmPakVsBwIEC1c32V~ED3iBpt5lMtGrISdK2Alg4~lY5-AC4U-4~OIwlLITlu~wNjAd1mcUopQ~qlvL3fAHDu0VD0pQtNNDER42LPAW7zHOTSSvzRt9l~fl1tm91bNcaREu~NokffE41sBM7KUOhAg7aHIPOmqDlqbN-zKkSRjo-6UcwCUuvyUEo~9uYbeE8mIpk5UPDZM~dE~2Jmg__',
      // 'https://media-hosting.imagekit.io//7c0592dba3ed4bdb/72eafea2-0b20-4774-ade9-f3906ec98066.jpg?Expires=1834931377&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=hypheYaior83Q21jDyDzTtoLlD3ap1OyzjOP5JzByDdV19KJYpyoeix~csfzoZub8H7AgNTIZZTrhBNdsgwXgifAxxcQeNbhylP5lSiK4zwL3IzDEzkNj2J-M2HfqmrmZZCPfnFvAdHfsWtbO~4~nMQCwnbZ1B~o0m3vNgzKDhwqTDsBz4gqbUdhvZqGE8l7J79mDbTOeaafttSFvDnupoSC496tRCqWTKXP3JdX6wpQ4J6OdsxPD-J~WCUi6tHXvhJEyaxtzHQAxgWQU~sk9Xo7MO2n-IyBl5Ai5eMHfBM5s7-t7nTsaoYsdIUX5dkdMg1-wSUdyJGq7bxsdbrhdQ__',
      'https://images.augustman.com/wp-content/uploads/sites/6/2023/04/16072649/Untitled-design-2023-04-16T071319.214.jpg?tr=w-1920',
      'https://images.adsttc.com/media/images/62fb/da85/dfae/2a01/6f1d/1adc/large_jpg/compton-and-edrich-stands-lords-cricket-ground-wilkinsoneyre_1.jpg?1660672666',
      'https://images.pexels.com/photos/3452544/pexels-photo-3452544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ];
    let currentIndex = 0;

    const changeBackground = () => {
      setBackgroundImage(images[currentIndex]);
      currentIndex = (currentIndex + 1) % images.length;
    };

    // Set initial image
    changeBackground();   

    // Change the background every 1 second
    const interval = setInterval(changeBackground, 3000);

    // Clean up interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  const profileData = useSelector((val) => val.profile) || [];

  return (
    <div>
      <div>
        <div
          className="home-container"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Added styles for better appearance
        >
          <header className="hero-section">
            <h1>Welcome to Cricket Tournaments</h1>
            <h1>WickPlay.com</h1>
            <p>Join and compete in the most exciting cricket tournaments!</p>
{/*             {*/}
{/*               Array.isArray(profileData) && profileData.length > 0 ? (*/}
{/*              <h2 className='namehead'>Welcome @{profileData[0]?.name}</h2>*/}
{/*               ) : (*/}
{/*                 <div className="btns">*/}
{/*                   <Link to='/signin' className='signupbtn'>Login</Link>*/}
{/*                   <Link to='/signup' className='signupbtn'>Sign Up</Link>*/}
{/*                 </div>*/}
{/*               )*/}
{/*             } */}

          </header>
        </div>
      </div>
      <Gallery />
      <Sponsers />
    </div>
  );
}

export default Home;