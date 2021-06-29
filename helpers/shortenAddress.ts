const shortenAddress = (address: string) =>
  `${address.substr(0, 6)}...${address.substr(-6)}`


export default shortenAddress
