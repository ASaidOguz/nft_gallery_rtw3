
import Head from 'next/head'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import NFTCard from './components/NFTCard'
import nft from "../styles/images/nft.jpg"
const Home =(props) => {
  const[wallet,setWallet]=useState("")
  const[collection,setCollection]=useState("")
  const[NFTs,setNFTs]=useState([])
  const[fetchforCollection,setFetchforCollection]=useState(false)
  const[Pagekey,setPagekey]=useState("")

  //fetchNFTs fetches nfts with wallet address or 
  //wallet address+collection(how many nft person has from that collection)
  const fetchNFTs=async()=>{
    let nfts;
    
    if (!collection.length){
      const baseURL = process.env.NEXT_PUBLIC_baseURL
      const url = `${baseURL}/getNFTs/?owner=${wallet}`;
      
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      nfts= await fetch(url, requestOptions).then((response)=>response.json())
      
    }else{
      const baseURL = process.env.NEXT_PUBLIC_baseURL
      console.log("fetching nfts for collection owned by address")
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const fetchURL = `${baseURL}/getNFTs/?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
    if(nfts){ 
      setNFTs(nfts.ownedNfts)
      console.log("Page key is: ",nfts.pageKey)
      console.log(nfts)
      setPagekey(nfts.pageKey) 
      
    }
    //After the fetch it will scroll to start of the page ...
    window.scrollTo(0, 425);
  }
  //fetchNFTswPage if api call has pagekey this fetch will get other pages 
  const fetchNFTswPage=async()=>{
    let nfts;
    
    if (!collection.length){
      const baseURL = process.env.NEXT_PUBLIC_baseURL
      const url = `${baseURL}/getNFTs/?owner=${wallet}&pageKey=${Pagekey}`;
      
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      nfts= await fetch(url, requestOptions).then((response)=>response.json())
      
    }else{
      const baseURL = process.env.NEXT_PUBLIC_baseURL
      console.log("fetching nfts for collection owned by address")
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const fetchURL = `${baseURL}/getNFTs/?owner=${wallet}&pageKey=${Pagekey}
      &contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
    if(nfts){ 
      setNFTs(nfts.ownedNfts)
      console.log("Page key is: ",nfts.pageKey)
      console.log(nfts)
      setPagekey(nfts.pageKey) 
      
    }
    //After the fetch it will scroll to start of the page ...
    window.scrollTo(0, 425); 
  }
  //fetchNFTforCollection fetching the nft collection data..
  const fetchNFTforCollection=async()=>{
   
   if(collection.length){
    const baseURL = process.env.NEXT_PUBLIC_baseURL2
    const url = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const nfts= await fetch(url, requestOptions).then((response)=>response.json())
    if (nfts){
      console.log("Collection in nfts: ",nfts)
      setNFTs(nfts.nfts)
      setPagekey(nfts.nextToken)
      //console.log(NFTs)
    }
  }
  //After the fetch it will scroll to start of the page ...
  window.scrollTo(0, 425);
}
const fetchNFTforCollectionWpage=async()=>{
  if(collection.length){
    const baseURL = process.env.NEXT_PUBLIC_baseURL2
    const url = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&startToken=${Pagekey}`;
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const nfts= await fetch(url, requestOptions).then((response)=>response.json())
    if (nfts){
      console.log("Collection in nfts: ",nfts)
      setNFTs(nfts.nfts)
      setPagekey(nfts.nextToken)
      //console.log(NFTs)
    }
  }
  //After the fetch it will scroll to start of the page ...
  window.scrollTo(0, 425);
}

  return (
   
    
    <div className="bg-fuchsia-600">
    <div id="mydiv"className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        {!fetchforCollection&&
        <input 
        className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" 
        onChange={(e)=>{setWallet(e.target.value)}} 
        type={"text"} placeholder="add your wallet address"></input>
        }
        <input
        className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" 
        onChange={(e)=>{setCollection(e.target.value)
        }} 
        type={"text"} placeholder="add your collection address"></input>
        
        <label><input onChange={(e)=>{setFetchforCollection(e.target.checked) 
                                      setWallet("")}}
        type={"checkbox"}></input>for Collection</label>
        <button 
        className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"}
        onClick={
          ()=>{
            if(fetchforCollection){
           fetchNFTforCollection() }
           else{
            fetchNFTs()
            
           }    
          }}>Let's go!</button>
          <Image   
      src={nft} 
      height={300}  
      width={1000} 
      />
         <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        { 
          NFTs.map(nft =>( 
            <NFTCard nft={nft}/>
          ))
        }
        </div>
        <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
      {Pagekey&&<button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"}
       onClick={
        ()=>{
          if(fetchforCollection){
            fetchNFTforCollectionWpage() }
         else{
          fetchNFTswPage()
          
         }}}  
      >Next Page for NFTs</button>}
      </div >
     
      </div>
    </div>
    </div>
   
  )
}

export default Home
