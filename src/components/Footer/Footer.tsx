import React from 'react'
import './Footer.css'
export default function Footer() {
  return (
    <div className='footer-extra-container'>
        <div className='footer-container'>
            <div className="footer-img-container">
                <img src={require("../../logo.png")} alt="" height={200} width={200}/>
                <div className='center white'>
                    Emicatronic
                </div>             
            </div>
            <div className="footer-main">
                <div className="">
                    <div className='row1'>
                        <span className="material-icons">
                            facebook
                        </span>
                        <div><a href="https://www.facebook.com/EMICATRONIC" className='link touchable'>www.facebook.com/EMICATRONIC</a></div>
                    </div>
                    <div className='row1'>
                        <span className="material-icons">
                            mail
                        </span>
                        <div>emicatronic.emi@gmail.com</div>
                    </div>
                    <div className='row1'>
                        <span className="material-icons">
                            home
                        </span>
                        <div>Avenue Ibn Sina B.P 765, Agdal - Rabat</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
