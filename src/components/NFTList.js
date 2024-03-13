import React, { Component } from 'react';
import Web3 from 'web3';
import CoolNFT from '../truffle_abis/CoolNFT.json';
import NFTCard from './NFTCard'


//initialize NFT here?

const loadBlockchainData = async (nftAddress, tokenID, network) => {
    try{

        if(network === 'mainnet'){
            const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-rpc-api.thetatoken.org/rpc"));
            const defaultNFTinfo = await new web3.eth.Contract(CoolNFT.abi, nftAddress); //
            let result = await defaultNFTinfo.methods.tokenURI(tokenID).call();
            return result
        } else if(network === 'testnet'){
            const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-rpc-api-testnet.thetatoken.org/rpc"));
            const defaultNFTinfo = await new web3.eth.Contract(CoolNFT.abi, nftAddress); //Need a test NFT  
            let result = await defaultNFTinfo.methods.tokenURI(tokenID).call();
            return result
        } else {
            alert("Error with the site :(");
        } 
    } catch(error){
        alert(error);
    }
}



const NFTList = (props) => {
    let key = 0;
    const listOfNFTs = props.listOfNFTs.map((nft)=>{
        key++;
        return <NFTCard key={key} contract={nft['contract']} token={nft['token']}>NFT</NFTCard>
    });
    return(
        <div className="image-list">{listOfNFTs}</div>
    )
}

export default NFTList;

