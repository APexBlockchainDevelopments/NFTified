import React, { Component } from 'react';
import './Home.css'
import Footer from './Footer';
import { BrowserView, MobileView, isBrowser, isMobile, browserName } from 'react-device-detect';



class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            account: '0x0',
            page: 0
        }

    }

    componentDidMount = async() =>{
        if(isMobile){
            console.log('mobile!');
            console.log(browserName);
        } else {
            console.log("not mobile");
            console.log(browserName);
        }
    }

    changeContent(e, num) {
        e.preventDefault();
        this.setState({ page: num });
    }




    render() {
        return (
            <div className='home'>
                <header className='home-topbar'>
                    <a href='./about'><button>About</button></a>
                    <a href='./contact'><button>Contact</button></a>
                </header>
                < div className='home-main'>
                    <div className='home-left'>
                        <div className='home-img-container'>
                            <h1>NFTified.org</h1>
                            <h2>Verify NFTs on the Theta Network</h2>
                        </div>
                        <div className='home-buttons-container'>
                            <a href='./verifyowner'>
                                <button>Verify Owner</button>
                            </a>
                            <br />
                            <a href='./displayNFTs'>
                                <button>Show NFTs in Wallet</button>
                            </a>
                            <a href='./mintNFTs'>
                                <button>Mint New NFTs</button>
                            </a>
                            <a href='./ipfsUpload'>
                                <button>Upload to IPFS</button>
                            </a>
                            <br/>
                            <a href='./transfer'>
                                <button>Transfer NFTs</button>
                            </a>
                        </div>
                    </div>
                    <div className='home-right'>
                        <a href='./advertiseNFTHomePage'><img src='./Advertise.png' alt='nfts'></img></a>
                    </div>
                </div>
                <div className='home-footer-container'>
                    <Footer />
                </div>
            </div>

        )
    }
}

export default Home;
