import React from "react";
import Web3 from 'web3';
import CoolNFT from '../truffle_abis/CoolNFT.json';
import './NFTCard.css';

class NFTCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            contract: props.contract,
            token: props.token,
            link: "0"
        };
    }


    componentDidMount() {
        this.loadBlockchainData(this.state.contract, this.state.token, 'mainnet');
    }


    loadBlockchainData = async (nftAddress, tokenID, network) => {
        try {
            if (network === 'mainnet') {
                const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-rpc-api.thetatoken.org/rpc"));
                const defaultNFTinfo = await new web3.eth.Contract(CoolNFT.abi, nftAddress); //0x8e89eae2e2fb429c7de72457a8817b6e185d91f7
                let link = await defaultNFTinfo.methods.tokenURI(tokenID).call();
                this.setState({ link });
                return link
            } else if (network === 'testnet') {
                const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-rpc-api-testnet.thetatoken.org/rpc"));
                const defaultNFTinfo = await new web3.eth.Contract(CoolNFT.abi, nftAddress); //Need a test NFT  
                let result = await defaultNFTinfo.methods.tokenURI(tokenID).call();
                return result
            } else {
                alert("Error with the site :(");
            }
        } catch (error) {
            alert(error);
        }
    }

    button(e) {
        e.preventDefault();
        console.log(this.state);
    }


    render() {
        return (
            <div className='card-main'>
                <a href={this.state.link} target='_blank'>
                    <p>Contract: {this.state.contract}</p>
                    <br />
                    <p>Token: {this.state.token}</p>
                    <br />
                    <p>Link: {this.state.link}</p>
                </a>
            </div>
        )
    }
}

export default NFTCard