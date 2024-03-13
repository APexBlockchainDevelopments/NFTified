import React, { Component } from 'react';
import './Home.css'
import Footer from './Footer';
import './IPFSUpload.css'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

class AdvertiseNFTsHomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statusCode: 0, //0 not loading, 1 loading, 2 error, 3 done loading
            errorMessage: null,
            showcaptcha: true
        }

    }


    render() {
        return (
            <div className=''>
                Adveriste NFT
                <div className='home-footer-container'>
                    <Footer />
                </div>
            </div>

        )
    }
}

export default AdvertiseNFTsHomePage;
