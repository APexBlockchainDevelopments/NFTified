import React, { Component } from 'react';
import './About.css'
import Footer from './Footer'

class About extends Component {

    constructor(props) {
        super(props);


        this.state = {
        }

    }


    render() {
        return (
            <div className='about-main'>
                <div className='about-text'>
                    <h1 style={{fontSize:'4rem'}}>About</h1>
                    <p>This website was created to help out with NFT functionality. It allows you verify the owner and check the NFTs in a wallet. Of course we're always adding in more functionality and more that you can do! Check back often! If you find this site of value, tell a friend!</p>
                </div>
                <a href='./'>
                    <img src='./thetazilla_badge.png' alt='homeNFT' style={{paddingTop:'2rem'}}></img>
                </a>
                <p style={{fontSize:'12px', paddingTop:'2rem'}}> To go home click on the Theta Zilla.</p>
                <p style={{paddingTop:'2rem'}}>Created By: Austin Patkos (ZDev-9)</p>
                    <p><a href='https://twitter.com/austin_patkos' target='_blank' rel="noopener noreferrer">Twitter</a> | <a href='https://austinpatkos.com' target='_blank' rel="noopener noreferrer">Website</a></p>
                <div className='about-footer-container'>
                    <Footer/>
                </div>
            </div>

        )
    }
}

export default About;
