# Lend3r: A Decentralized Money Borrowing Platform
## Made as an assigment for Polygon Fellowship

Lend3r allows user to give Ethereum as collateral and get DINR as a loan. DINR is pegged close to INR thus it make it easier to utilise for Indian audience. 

## Steps Involved
### 1) Getting ETH Price

The first step is to get the ETH price in fiat. This is accomplished by something called oracles. Oracles are data providers that can interact with Web2 APIs and data streams and bring them on your smart contract. I have used chainlink as Oracle to get ETH / USD price. You can check the documentation here.

### 2) Issuing a stable token

The tokens will not magically get generated, we have to work on our own token. For interoperability, many Web3 tokens have been given certain common definitions. We will be using ERC20 token standard. We can import the contracts created by OpenZeppelin for such standards instead of having to develop this contract from scratch. (If you don't know what OpenZeppelin is, I recommend going through the CryptoZombies course, which I discussed in my Week 2 Post.) Our token will have two functions mint and burn. 'mint' will issue the token and 'burn' will destroy it. These functions can only be called by owner of smart contract. To read more about ERC20 standard refer here. Also, I would highly recommend going through the documentation here. Lastly make sure to check the Contract Wizard by OpenZepplin which will generate smart contracts for us.

### 3) Work on the Lending Contract

Given that we already have everything we need, this is rather simple. Because this contract will be creating and disposing of tokens, make sure it is the owner of the stable coin. The borrow function of this contract will use oracle to determine the price, and mint the tokens according to the price determined for the message sender. With the use of mappings, we can keep track of the debt and collatoral of the message sender after minting. The user needs to have enough issued Stable Coin in his wallet in order to withdraw the colleteral. The stable coin equivalent to his debt will be burned from his wallet and his debt will be cleared.
