import React, { Component } from 'react';
import './Home.css'
import Footer from './Footer';
import './Transfer.css'
import axios from 'axios';
import Web3 from 'web3';
import ReCAPTCHA from 'react-google-recaptcha';
import CoolNFT from '../truffle_abis/CoolNFT.json';

class Transfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showcaptcha: true,
            statusCode: 0, //0 default, 1 not the owner, 2 token ID does not exist, 3 network error, 4 error in wallet receipeint, 5 successfully transfer
            errorMessage: null
        }

    }

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
    }

    async captcha() {
        setTimeout(() => {
            this.setState({ showcaptcha: false })
        }, 1000);
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

    async transfer(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        this.setState({ contentLink: formProps['nftContract'] });
        this.setState({ nftName: formProps['token'] });
        this.setState({ symbol: formProps['recipient'] });

        console.log(formProps);

        const web3 = window.web3
        const account = await web3.eth.getAccounts();
        console.log(account);
        this.setState({ account: account[0] });

        const networkId = await window.web3.eth.net.getId();
        console.log(networkId)

        try {

            if (networkId !== 365 && networkId !== 361) {
                alert("Please connect to the ThetaNetwork in Metamask");
            } else {
                this.setState({ loading: true });
                if (networkId === 365) {
                    this.setState({ network: 365 });
                    const defaultNFTinfo = await new web3.eth.Contract(CoolNFT.abi, formProps['nftContract']); //Need a test NFT  
                    let result = await defaultNFTinfo.methods.safeTransferFrom(account[0], formProps['recipient'], formProps['token']).call();
                    return result
                } else {
                    this.setState({ network: 361 });
                    const defaultNFTinfo = await new web3.eth.Contract(CoolNFT.abi, formProps['nftContract']);
                    let result = await defaultNFTinfo.methods.safeTransferFrom(account[0], formProps['recipient'], formProps['token']).send({
                        from: account[0]
                      });
                    return result
                }
                
            }
        }catch(e){
            alert(e);
            this.setState({ loading: false });
        }


        const formDataEmail = new FormData();
        formDataEmail.append('api', '2EjMKS9P');
        formDataEmail.append("email", formProps['email']);
        axios.post('https://db1.zdev9.com/NFTified/emailLead1.php', formDataEmail).then(response => {
            console.log(response);
        });
    }



    render() {
        return (
            <div className='transfer-main'>
                <h1>Transfer NFT</h1>
                <p>Send NFT to another Wallet</p>
                <div className='transfer-form-container'>
                    <form onSubmit={(e) => this.transfer(e)}>
                        <label>NFT Contract Address</label>
                        <input id="nftContract" type="text" name="nftContract" required />
                        <br />
                        <label>Token ID</label>
                        <input id="token" type="text" name="token" required />
                        <br />
                        <label>Recipient Address</label>
                        <input id="recipient" type="text" name="recipient" required />
                        <br />
                        <label>Email:</label>
                        <input id="email" type="email" name="email" required />
                        <br />
                        {
                            this.state.showcaptcha &&
                            <div className='captcha-container'>
                                <ReCAPTCHA
                                    className='ipfs-captcha'
                                    sitekey="6LdxY6YhAAAAAC2r4Ismpp_r5HVre6LRjE-QcIfC"
                                    onChange={() => this.captcha()}
                                />
                            </div>
                        }
                        {
                            (!this.state.loading && !this.state.showcaptcha) &&
                            <button id="upload-button" onSubmit={(e) => this.transfer(e)}>Transfer</button>
                        }
                        {
                            this.state.loading &&
                            <h1>Loading...</h1>
                        }
                        <p>Once you hit submit you will be asked to confirm the transaction through metamask</p>
                        <p>Be very very careful when sending NFTs, if send to the wrong address they may be lost forever!</p>
                        <p>Sending NFTs to a ThetaDrop wallet technicaly may work, however the user will not be able to interact with their NFT.</p>
                        <p>Once the transaction is confirmed please be patient while the correct blocks are mined.</p>
                    </form>
                </div>
                <div className=''>
                    <Footer />
                </div>
            </div>

        )
    }
}

export default Transfer;
