import React, { Component } from 'react';
import Web3 from 'web3';
import CoolNFT2 from '../truffle_abis/CoolNFT2.json';
import PayLuckyNum from '../truffle_abis/PayLuckyNum.json';
import Footer from './Footer';
import './MintNFTs.css'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import axios from 'axios';

class MintNFTs extends Component {

    constructor(props) {
        super(props);


        this.state = {
            loading: true,
            deployedNFT: '0x0',
            explorerBaseLink: 'https://explorer.thetatoken.org/account/',
            link: '',
            network: 0
        }

    }

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            this.setState({ loading: false });
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currenProvider);
            this.setState({ loading: false });
        } else {
            window.alert('No ethereum browser deteached...check out Metamask!');
        }
    }

    async MintNFT(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        this.setState({ contentLink: formProps['link'] });
        this.setState({ nftName: formProps['name'] });
        this.setState({ symbol: formProps['symbol'] });

        if (formProps['emailCheck'] != null) {
            const formData = new FormData();
            formData.append('api', '2EjMKS9P');
            formData.append("email", formProps['email']);
            axios.post('', formData).then(response => {
                console.log(response);
            });
        }

        const documentFile = await this.IPFSUpload(formProps['link']);


        const networkId = await window.web3.eth.net.getId();
        if (networkId !== 365 && networkId !== 361) {
            alert("Please connect to the ThetaNetwork in Metamask");
        } else {
            if (networkId === 365) {
                this.setState({ explorerBaseLink: 'https://testnet-explorer.thetatoken.org/account/' });
                this.setState({network : 365});
            } else {
                this.setState({ explorerBaseLink: 'https://explorer.thetatoken.org/account/' });
                this.setState({network : 361});
            }
            this.setState({ loading: true });
            console.log(documentFile);
            this.DeployContract(documentFile, formProps['name'], formProps['symbol']);
        }
    }


    async DeployContract(link, name, symbol) {


        const web3 = window.web3
        const account = await web3.eth.getAccounts();
        this.setState({ account: account[0] });
        const networkId = await web3.eth.net.getId();


        const deployedContract = await new web3.eth.Contract(CoolNFT2.abi)
            .deploy({
                data: CoolNFT2.bytecode,
                arguments: [name, symbol, link]
            })
            .send({
                from: account[0],
                gasLimit: '4000000',
                value: "1000000000000000000", 
            });

        this.setState({ deployedNFT: deployedContract });
        this.setState({ loading: false });
        console.log(deployedContract);
        this.StoreNFTinDB();
    }

    async StoreNFTinDB(){
        const formData = new FormData();
        formData.append('api', 'DSc8pWBw');
        formData.append('wallet', this.state.account);
        formData.append('nft', this.state.deployedNFT._address);
        formData.append('tokenURI', this.state.contentLink);
        formData.append('tokenName', this.state.nftName);
        formData.append('tokenSymbol', this.state.symbol);
        formData.append('network', this.state.network);

        axios.post('', formData).then(response => {
            this.Tweet();
        });
    }

    async Tweet(){
        const formData = new FormData();
        formData.append('api', 'Ly9oJQSW');
        formData.append('address', "NFTified!");
        formData.append('wallet', this.state.account);
        formData.append('nft', this.state.deployedNFT._address);
        formData.append('tokenURI', this.state.contentLink);
        formData.append('tokenName', this.state.nftName);
        formData.append('tokenSymbol', this.state.symbol);
        formData.append('network', this.state.network);

        
        const json = JSON.stringify({ 
            "api": 'Ly9oJQSW',
            "nftName" : this.state.nftName,
            "link" : this.state.explorerBaseLink + this.state.deployedNFT._address
        })


        await axios.post('', json).then(response => {
            console.log(response.statusCode);
        });

        //NFT name was just minted using NFTified.org! (link) #theta #tfuel #nfts #crypto #web3 #nftified
    }

    async IPFSUpload(link){
        const projectId = '';
        const projectSecret = '';
        const auth =
            'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

        const ipfs = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
              authorization: auth
            }
        })

        const jsonFile = {
            "image" : link
        }
        console.log(jsonFile);
        const { cid } = await ipfs.add(JSON.stringify(jsonFile))
        console.log(cid)

        const IPFSlink = 'https://ipfs.io/ipfs/' + cid.string;

        return IPFSlink;
    }

    render() {
        return (
            <div className='mint-main'>

                <div className='verify-form'>
                    <form onSubmit={(e) => this.MintNFT(e)}>
                        <h1>NFT Details</h1>
                        <label>Content Link</label>
                        <br />
                        <input type='text' id='link' name='link' placeholder='Content Link (Image)' required></input>
                        <br></br>
                        <label>NFT Name</label>
                        <br />
                        <input type='text' id='name' name='name' placeholder='NFT Name' required></input>
                        <br />
                        <label>Token Symbol</label>
                        <br />
                        <input type='text' id='symbol' name='symbol' placeholder="3 Letters To Represent Your NFT" required ></input>
                        <br />
                        <label>Email</label>
                        <br />
                        <input type='email' id='email' name='email' placeholder="Email - Used to prevent Misuse" required ></input>
                        <div className='email-container'>
                            <input type="checkbox" id="emailCheck" name="emailCheck" value="emailCheck"></input>
                            <label htmlFor="emailCheck">Keep me up to date with NFT developments</label>
                            <p>If you do not check this we promise not to email you :)</p>
                        </div>
                        <br />
                        {this.state.loading &&
                            <div>
                                <h3>Loading...</h3>
                            </div>
                        }
                        {!this.state.loading &&
                            <button onSubmit={(e) => this.MintNFT(e)}>Mint!</button>
                        }
                    </form>
                </div>
                {this.state.deployedNFT !== '0x0' &&
                    <div className='view-buttons-container'>
                        <a href={this.state.explorerBaseLink + this.state.deployedNFT._address} target='_blank' className='view-button'>
                            <h3>Contract Deployed! Congratulations on your New NFT!</h3>
                            <h3>Contract _address: {this.state.deployedNFT._address}</h3>
                            <button>View on ThetaScan</button>
                        </a>
                    </div>
                }
                <div>
                    <Footer />
                </div>
            </div>

        )
    }
}

export default MintNFTs;
