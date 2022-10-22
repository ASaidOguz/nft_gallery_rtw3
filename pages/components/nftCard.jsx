import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useState } from 'react'
import {Alert} from "reactstrap";
export const NFTCard=({nft})=>{
   const[copysuccess,setCopysuccess]=useState("")
   const copyonClickboard=()=>{
    console.log(nft.contract.address)
    navigator.clipboard.writeText(nft.contract.address)
    
    setCopysuccess("Copied")
    setInterval(() => setCopysuccess(""), 1000);
}
   
    return (
    <div key={nft.id.tokenId} className="w-1/4 flex flex-col ">
     <div  className="rounded-md">
     <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway}/> 
     </div>
     <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div  className="">
        <h2 className="text-xl text-gray-800">{nft.title}</h2>
        <p className="text-gray-600">Id:{nft.id.tokenId.substr(nft.id.tokenId.length-4)}</p>
        <button 
        className={"disabled:bg-slate-500 text-white bg-purple-400 px-4 py-2 mt-3 rounded-sm "}
        onClick={copyonClickboard }>Copy</button> 
        {copysuccess}
        <p className="text-gray-600">{`${nft.contract.address.substr(0,4)}...${nft.contract.address.substr(nft.contract.address.length-4)}`}</p>
        </div>
     </div>
    <div className="flex-grow mt-2">
       <ReactMarkdown className="flex-grow mt-2">{nft.description?.substr(0,150)}</ReactMarkdown> 
    </div>
    <div className="flex justify-center mb-1" >
        <a target={"_blank"} className="py-1 px-4 bg-blue-500 w-1/2 text-center rounded-m text-white cursor-pointer"
        href={`https://etherscan.io/token/${nft.contract.address}`}>View on etherscan</a>
    </div>
    </div>
    )
}




