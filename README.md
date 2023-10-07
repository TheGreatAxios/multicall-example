# Multicall Example

## Installation
1) Run ```git clone https://github.com/TheGreatAxios/multicall-example```
2) Run ```./setup.sh```

## How to use

In order to utilize this repository, you must:

1) Have DEPLOYER_ROLE given to the address associated with the private key you provide in the .env file
2) Have sFUEL in the account you are deploying from

## Deployment
1) Run ```npx hardhat deploy --tags token --network <network_name>``` -> This will deploy 10 dummy tokens

There are plenty of customizable options that will be covered below.

### Distribute Tokens Via Multicall Example

```shell
    # Calypso Mainnet
    npx hardhat distribute --network <network-name>
```