import React, { Component } from 'react';
import './About.css'
import Footer from './Footer'

class Contact extends Component {

    constructor(props) {
        super(props);


        this.state = {
        }




    }


    render() {
        return (
            <div className='contact-main' style={{ textAlign: 'center', paddingTop: '3rem' }}>
                <div className='contact-text'>
                    <h1 style={{ fontSize: '4rem', fontWeight: '600' }}>Contact</h1>
                </div>
                <img src='./me.jpg' style={{ borderRadius: '250px' }} alt='Pic of Austin'></img>
                <p style={{ paddingTop: '2rem' }}>Austin Patkos (ZDev-9)</p>
                <p><a href='https://twitter.com/austin_patkos' target='_blank' rel="noopener noreferrer">Twitter</a> | <a href='https://austinpatkos.com' target='_blank' rel="noopener noreferrer">Website</a></p>
                <a href='./'>Site Home</a>
                <div className='about-footer-container'>
                    <Footer />
                </div>
            </div>

        )
    }
}

export default Contact;
