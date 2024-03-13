import React, { Component, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import VerifyOwner from './VerifiyOwner';
import DisplayNFTsByWallet from './DisplayNFTsByWallet';
import ComingSoon from './ComingSoon';
import About from './About';
import Contact from './Contact';
import ReactGa from 'react-ga'; 
import MintNFTs from './MintNFTs';
import Testing from './Testing';
import IPFSUpload from './IPFSUpload';
import Transfer from './Transfer';
import AdvertiseNFTsHomePage from './AdvertiseNFTsHomePage';

function App(){

    useEffect(() =>{
        ReactGa.initialize('G-6BYFMPJ7G0')
        ReactGa.pageview('/')
    }, [])

        return (
            <div className='app-main'>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/verifyOwner' element={<VerifyOwner />} />
                        <Route exact path='/displayNFTs' element={<DisplayNFTsByWallet/>} />
                        <Route exact path='/mintNFTs' element={<MintNFTs/>} />
                        <Route exact path='/ipfsUpload' element={<IPFSUpload />} />
                        <Route exact path='/transfer' element={<Transfer/>} />
                        <Route exact path='/advertiseNFTHomePage' element={<AdvertiseNFTsHomePage />} /> 
                        <Route exact path='/comingsoon' element={<ComingSoon />} /> 
                        <Route exact path='/about' element={<About/>} />
                        <Route exact path='/contact' element={<Contact />} />
                        <Route exact path='/testing' element={<Testing />} />
                        <Route exact path='/*' element={<Home />} />

                    </Routes>
                </Router>
            </div>

        )
}

export default App;
