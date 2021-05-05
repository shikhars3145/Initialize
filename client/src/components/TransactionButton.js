import React, { useContext } from 'react'
import Button from '@material-ui/core/Button';
import UserContext from '../contexts/user/user.context';
import web3 from '../utils/web3';


export default function TransactionButton({children, onClick, type,...btnProps}) {
    const {user,setUser} = useContext(UserContext);

    const connectWallet =()=> {
        if(typeof ethereum !== 'undefined'){
            ethereum.request({ method: 'eth_requestAccounts' }).then(accounts=>{
                setUser(web3.utils.toChecksumAddress(accounts[0]));
            }).catch(err=>{console.log(err);alert(err.message);})
        }
        else{
            alert("No Wallet Detected Please Consider Using Metamask")
        }
    }



    return (<Button onClick={user?onClick:connectWallet} type={user?type:"button"}{...btnProps}>
            {
                user?
                    (children?
                        children
                        :
                        `${user.slice(0,6)}...${user.slice(-6)}`)
                    :
                    "Connect Wallet"
            }
        </Button>
    )
    
}
