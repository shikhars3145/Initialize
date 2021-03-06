import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../themes/theme';
import Navbar from '../components/Navbar';
import UserContext from '../contexts/user/user.context';
import web3 from '../utils/web3';
import WrongChainAlert from '../components/WrongChainAlert';
import correctChain from '../utils/correctChain';
import LoadingContext from '../contexts/loading/loading.context';


export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isCorrectChain, setIsCorrectChain] = useState(true);

  if(typeof ethereum !== 'undefined')
    {
        ethereum.on('accountsChanged',(accounts)=>{
            setUser(web3.utils.toChecksumAddress(accounts[0]));
        })

        ethereum.on('chainChanged', (_chainId) => window.location.reload());
    }

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    correctChain(false).then(isCorrect=>{
      console.log("iscorrect", isCorrect);
      setIsCorrectChain(isCorrect);
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Initialize</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserContext.Provider value={{user,setUser}}>
        <LoadingContext.Provider value={{loading,setLoading}}>
        <Navbar/>
        <Component {...pageProps} />
        {!isCorrectChain&&<WrongChainAlert/>}
        </LoadingContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};