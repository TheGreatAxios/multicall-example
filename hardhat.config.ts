/**
 *
 * @author Sawyer Cutler
 * @copyright 2023 Sawyer Cutler
 * @license MIT
 *
**/

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

import "./tasks/distribute_tokens";

dotenv.config();

const PRIVATE_KEY: string | undefined = (process.env.PRIVATE_KEY as string | undefined);
if (!PRIVATE_KEY) {
    throw new Error("Private Key Not Found");
}

const BASE_RPC_URL_V3: string = "https://staging-v3.skalenodes.com/v1/";
const BASE_RPC_MAINNET: string = "https://mainnet.skalenodes.com/v1/";

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    /// Required to work with hardhat deploy and the auatomation
    namedAccounts: {
        deployer: 0 
    },
    networks: {
        "calypso-staging-v3": {
            accounts: [PRIVATE_KEY],
            url: BASE_RPC_URL_V3 + 'staging-utter-unripe-menkar'
        },
        "calypso": {
            accounts: [PRIVATE_KEY],
            url: BASE_RPC_MAINNET + 'honorable-steel-rasalhague'
        },
        "chaos": {
            accounts: [PRIVATE_KEY],
            url: BASE_RPC_URL_V3 + 'staging-fast-active-bellatrix'
        },
    },
    etherscan: {
        apiKey: {
            "calypso-staging-v3": "na",
            "calypso": "non-applicable-value",
            "chaos": "na"
        },
        customChains: [
             {
                network: "chaos",
                chainId: 1351057110,
                urls: {
                    apiURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com/api",
                    browserURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com"
                }
            },
            {
                network: "calypso-staging-v3",
                chainId:  344106930,
                urls: {
                    apiURL: "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/api",
                    browserURL: "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com"
                }
            },
            {
                network: "calypso",
                chainId:  1564830818,
                urls: {
                    apiURL: "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com/api",
                    browserURL: "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com"
                }
            }

        ]
    }
};

export default config;
