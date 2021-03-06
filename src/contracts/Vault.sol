// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./DINRToken.sol";
import "./PriceConsumer.sol";

contract Vault {
    DINRToken private token;
    PriceConsumerV3 private priceConsumer;

    struct VaultStruct {
        uint256 debt;
        uint256 collateral;
    }

    mapping(address => VaultStruct) public vaults;

    constructor(DINRToken _tokenAddress, PriceConsumerV3 _priceConsumerAddress)
    {
        token = _tokenAddress;
        priceConsumer = _priceConsumerAddress;
    }

    //Function to deposit collateral to vault and get debt
    function borrowDINR() public payable {
        int256 _ethPrice = priceConsumer.getLatestPrice();
        uint256 _collateral = msg.value;
        uint256 _debt = _collateral * uint256(_ethPrice);
        vaults[msg.sender].collateral += _collateral;
        vaults[msg.sender].debt += _debt;
        token.mint(msg.sender, _debt);
    }

    //Function to withdraw collateral from vault and return debt
    function returnDINR() public {
        require(
            token.balanceOf(msg.sender) >= vaults[msg.sender].debt,
            "Insufficient balance"
        );
        uint256 _collateral = vaults[msg.sender].collateral;
        uint256 _debt = vaults[msg.sender].debt;
        payable(msg.sender).transfer(_collateral);
        vaults[msg.sender].collateral = 0;
        token.burn(msg.sender, _debt);
        vaults[msg.sender].debt = 0;
    }

    //View function to get collateral in vault
    function getCollateral() public view returns (uint256) {
        return vaults[msg.sender].collateral;
    }

    //View function to get debt in vault
    function getDebt() public view returns (uint256) {
        return vaults[msg.sender].debt;
    }
}
