import React, { Component } from 'react';
import Web3 from 'web3';
import CoolNFT from '../truffle_abis/CoolNFT.json';
import Footer from './Footer';
import './DisplayNFTsByWallet.css';
import NFTList from './NFTList';



class DisplayNFTsByWallet extends Component {

    constructor(props) {
        super(props);


        this.state = {
            account: null,
            connected: false,
            loading : false,
            network : 'mainnet',
            listofNFTs : null
        }

    }

    componentDidMount() {

    }

    getListFromThetaScan = async (address) =>{
        const url = `https://www.thetascan.io/api/721/?address=${address}&type=list&sort=contract`;
        const result = await fetch(url);
        const body = await result.json();
        if(body !== null){
            this.setState({errorMessage : null})
            this.setState({listofNFTs : body});
        } else {
            this.setState({listofNFTs : null})
            this.setState({errorMessage : 'Error'})
        }
    }

    connectButton(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        if(formProps['wallet'] !== '0x0'){
            this.setState({wallet : formProps['wallet']});
            this.getListFromThetaScan(formProps['wallet']);
        } else{
            alert('Please Type Wallet Address')
        }

    }

    render() {
        return (
            <div className='verify-main'>
                <div className='verify-title'>
                    <h1>Show NFTs in Wallet</h1>
                    <p>Input the Wallet Address.</p>
                </div>
                <div className='verify-form'>
                    <form onSubmit={(e) => this.connectButton(e)}>
                        <label>Wallet</label>
                        <br/>
                        <input type='text' id='wallet' name='wallet' placeholder='0x0' required></input>
                        <br/>
                        {/* <select name="network" id="network">
                            <option value="mainnet">Main Net</option>
                            <option value="testnet">Test Net</option>
                        </select>
                        <br/> */}
                        <button onSubmit={(e) => this.connectButton(e)}>View NFTs</button>
                    </form>
                </div>
                <div className='verify-result'>
                    {
                        this.state.errorMessage &&
                        <h1>There was an error</h1>
                    }
                    {
                        this.state.listofNFTs &&
                        <NFTList listOfNFTs={this.state.listofNFTs}/>
                    }
                    <p style={{fontSize:'10px', marginTop:'50px'}}>Disclaimer: Not all NFTs are created equal. Sometimes we are unable to verify a owner of an NFT by the methods we are using for this site. We do our best and are continually improving the site. However occassionaly because how the NFT contract is written we cannot verify ALL NFTs 100% of the time.</p>
                </div>
                <div>
                    <Footer />
                </div>
            </div>

        )
    }
}

export default DisplayNFTsByWallet;
