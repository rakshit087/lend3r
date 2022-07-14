import { ethers } from "ethers";
import vaultArtifact from "../artifacts/src/contracts/Vault.sol/Vault.json";
const vaultAddress = "0x5F5005a3f180c7EB115C0E06D701d414D85C24B8";

export const Web3Service = {
  connect: async () => {
    const eth = await window.ethereum;
    await eth.request({ method: "eth_requestAccounts" });
  },
  //Check if user is connected to metamask or not
  isConnected: async () => {
    const eth = await window.ethereum;
    const provider = new ethers.providers.Web3Provider(eth);
    const signer = provider.getSigner();
    try {
      await signer.getAddress();
      return true;
    } catch {
      return false;
    }
  },
  //Get Current Wallet Address
  getWallet: async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const wallet = await signer.getAddress();
    return wallet;
  },

  //Get current collateral balance
  getCollateralBalance: async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const vault = new ethers.Contract(vaultAddress, vaultArtifact.abi, signer);
    const balance = await vault.getCollateral();
    return balance;
  },

  //get current Debt
  getDebt: async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const vault = new ethers.Contract(vaultAddress, vaultArtifact.abi, signer);
    const debt = await vault.getDebt();
    return debt;
  },

  //Borrow DINR
  borrowDINR: async (amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const vault = new ethers.Contract(vaultAddress, vaultArtifact.abi, signer);
    const tx = await vault.borrowDINR({
      value: ethers.utils.parseUnits(amount.toString(), "ether"),
    });
    return tx;
  },
  //Return DINR
  returnDINR: async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const vault = new ethers.Contract(vaultAddress, vaultArtifact.abi, signer);
    const tx = await vault.returnDINR();
    return tx;
  },
};
