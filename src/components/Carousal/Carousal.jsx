import React from 'react'
import './Carousal.css'
import IMG1 from '@assets/Carousal1.jpeg'
import IMG2 from '@assets/Carousal2.jpeg'
import IMG3 from '@assets/Carousal3.jpg'

function Carousal() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide carousal-container">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={IMG1} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Unleash Your Inner Champion!</h5>
        <p>In football, everything is possible, from the moment you work and you believe in your qualities.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={IMG2} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Elevate Your Skills, Elevate Your Game!</h5>
        <p>Discover joy in every jump, laughter in every swing.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={IMG3} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Ignite Your Passion for the Game!</h5>
        <p>Football is like life - it requires perserverance, self-denial, hard work, sacrifice, dedication and respect for authority.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}

export default Carousal