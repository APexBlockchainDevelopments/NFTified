import React, { Component } from 'react';
import Web3 from 'web3';
import CoolNFT from '../truffle_abis/CoolNFT.json';
import Footer from './Footer';
import './VerifyOwner.css';


class VerifyOwner extends Component {

    constructor(props) {
        super(props);


        this.state = {
            account: null,
            connected: false,
            loading : false,
            nftAddress: '',
            tokenId : 0,
            network : 'mainnet',
            tokenURI: ''
        }

    }

    //metamask
    componentDidMount() {
    }

    async loadBlockchainData(nftAddress, tokenID, network) {
        try{

            if(network === 'mainnet'){
                const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-rpc-api.thetatoken.org/rpc"));
                const defaultNFTinfo = await new web3.eth.Contract(CoolNFT.abi, nftAddress); //
                this.setState({ defaultNFT: defaultNFTinfo });
                this.getOwner(tokenID);  
            } else if(network === 'testnet'){
                const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-rpc-api-testnet.thetatoken.org/rpc"));
                const defaultNFTinfo = await new web3.eth.Contract(CoolNFT.abi, nftAddress); //Need a test NFT 
                this.setState({ defaultNFT: defaultNFTinfo });
                this.getOwner(tokenID);  
            } else {
                alert("Error with the site :(");
            } 
        } catch(error){
            alert(error);
        }
    }

    async getOwner(tokenID) {
        let string = tokenID.toString();
        let result = await this.state.defaultNFT.methods.ownerOf(string).call();
        this.setState({account : result});
        this.getUri(tokenID);

    }

    async getUri(tokenID) {
        let result = await this.state.defaultNFT.methods.tokenURI(tokenID).call()
        this.setState({tokenURI : result});
    }

    connectButton(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        this.setState({nftAddress : formProps['address']});
        this.setState({tokenId: formProps['tokenID']});
        this.setState({network: formProps['network']});
        this.loadBlockchainData(formProps['address'], formProps['tokenID'], formProps['network']);

    }

    


    //default token to zero
    // show response on screen
    //token URI set up
    // make sure button doesn't work unless fields are full



    render() {
        return (
            <div className='verify-main'>
                <div className='verify-title'>
                    <h1>Verify The Owner of NFT</h1>
                    <p>Input the NFT address along with the Token ID below.</p>
                </div>
                <div className='verify-form'>
                    <form onSubmit={(e) => this.connectButton(e)}>
                        <label>NFT Address</label>
                        <br/>
                        <input type='text' id='address' name='address' placeholder='0x0' required></input>
                        <br></br>
                        <label>Token ID</label>
                        <br/>
                        <input type='text' id='address' name='tokenID' placeholder="Put 0 if there is none" required ></input>
                        <br></br>
                        <select name="network" id="network">
                            <option value="mainnet">Main Net</option>
                            <option value="testnet">Test Net</option>
                        </select>
                        <br />
                        <button onSubmit={(e) => this.connectButton(e)}>Verify</button>
                    </form>
                </div>
                <div className='verify-result'>
                    {
                        this.state.account &&
                        <a href={'https://explorer.thetatoken.org/account/' + this.state.account}  target='_blank'><h2 style={{marginTop:'50px'}}>Owner: {this.state.account}</h2></a>
                    }
                    {
                        this.state.errorMessage &&
                        <h1>There was an error</h1>
                    }
                    {
                        this.state.tokenURI &&
                        <a href={this.state.tokenURI} target='_blank'><h2 style={{marginTop:'50px'}}>Token Link</h2></a>
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

export default VerifyOwner;
