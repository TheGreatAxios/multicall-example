import { abi } from "../artifacts/contracts/Token.sol/Token.json";

task("distribute", "Distribute Tokens Script")
	.setAction(async(taskArgs: any, hre) => {
	
		const [ signer ] = await hre.ethers.getSigners();

	    const tokens = [
	    	"0x4f2040FEaAD8b19E254006153E7BBB0674F4DaE3", // token0
	    	"0x7464f84F2c6686b6365a373E8FB7c15741e07275",
	    	"0x677b7FfE9435735F2b1CEE325527e9268CD011F2",
	    	"0xa0aC0f7A8726351beF090B6966aA77E07cF0Fb15",
	    	"0xD757D9d59fA0c60397163BE11963f47E3F03fd0c",
	    	"0xaA46ff7C044F3611680cFCd844001B95136De92C",
	    	"0x6Cf9eEFD9b9fA5Da86F11Eb7bD478b2F42FE403F",
	    	"0x323AA4F13021b354AeE01D89ce47951D1A630E0b",
	    	"0xF1Fc005D1c79929409f68228F131483463dB3724", // token8
	    	"0x192aB82301bf3BEd03466c901709e4f33aE8884f", // token9
	    ];

	    const multicallABI = [{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256","name":"blockNumber","internalType":"uint256"},{"type":"bytes[]","name":"returnData","internalType":"bytes[]"}],"name":"aggregate","inputs":[{"type":"tuple[]","name":"calls","internalType":"struct Multicall3.Call[]","components":[{"type":"address","name":"target","internalType":"address"},{"type":"bytes","name":"callData","internalType":"bytes"}]}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"tuple[]","name":"returnData","internalType":"struct Multicall3.Result[]","components":[{"type":"bool","name":"success","internalType":"bool"},{"type":"bytes","name":"returnData","internalType":"bytes"}]}],"name":"aggregate3","inputs":[{"type":"tuple[]","name":"calls","internalType":"struct Multicall3.Call3[]","components":[{"type":"address","name":"target","internalType":"address"},{"type":"bool","name":"allowFailure","internalType":"bool"},{"type":"bytes","name":"callData","internalType":"bytes"}]}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"tuple[]","name":"returnData","internalType":"struct Multicall3.Result[]","components":[{"type":"bool","name":"success","internalType":"bool"},{"type":"bytes","name":"returnData","internalType":"bytes"}]}],"name":"aggregate3Value","inputs":[{"type":"tuple[]","name":"calls","internalType":"struct Multicall3.Call3Value[]","components":[{"type":"address","name":"target","internalType":"address"},{"type":"bool","name":"allowFailure","internalType":"bool"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"bytes","name":"callData","internalType":"bytes"}]}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256","name":"blockNumber","internalType":"uint256"},{"type":"bytes32","name":"blockHash","internalType":"bytes32"},{"type":"tuple[]","name":"returnData","internalType":"struct Multicall3.Result[]","components":[{"type":"bool","name":"success","internalType":"bool"},{"type":"bytes","name":"returnData","internalType":"bytes"}]}],"name":"blockAndAggregate","inputs":[{"type":"tuple[]","name":"calls","internalType":"struct Multicall3.Call[]","components":[{"type":"address","name":"target","internalType":"address"},{"type":"bytes","name":"callData","internalType":"bytes"}]}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"basefee","internalType":"uint256"}],"name":"getBasefee","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"blockHash","internalType":"bytes32"}],"name":"getBlockHash","inputs":[{"type":"uint256","name":"blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"blockNumber","internalType":"uint256"}],"name":"getBlockNumber","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"chainid","internalType":"uint256"}],"name":"getChainId","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"coinbase","internalType":"address"}],"name":"getCurrentBlockCoinbase","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"difficulty","internalType":"uint256"}],"name":"getCurrentBlockDifficulty","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"gaslimit","internalType":"uint256"}],"name":"getCurrentBlockGasLimit","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"timestamp","internalType":"uint256"}],"name":"getCurrentBlockTimestamp","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"balance","internalType":"uint256"}],"name":"getEthBalance","inputs":[{"type":"address","name":"addr","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"blockHash","internalType":"bytes32"}],"name":"getLastBlockHash","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[{"type":"tuple[]","name":"returnData","internalType":"struct Multicall3.Result[]","components":[{"type":"bool","name":"success","internalType":"bool"},{"type":"bytes","name":"returnData","internalType":"bytes"}]}],"name":"tryAggregate","inputs":[{"type":"bool","name":"requireSuccess","internalType":"bool"},{"type":"tuple[]","name":"calls","internalType":"struct Multicall3.Call[]","components":[{"type":"address","name":"target","internalType":"address"},{"type":"bytes","name":"callData","internalType":"bytes"}]}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256","name":"blockNumber","internalType":"uint256"},{"type":"bytes32","name":"blockHash","internalType":"bytes32"},{"type":"tuple[]","name":"returnData","internalType":"struct Multicall3.Result[]","components":[{"type":"bool","name":"success","internalType":"bool"},{"type":"bytes","name":"returnData","internalType":"bytes"}]}],"name":"tryBlockAndAggregate","inputs":[{"type":"bool","name":"requireSuccess","internalType":"bool"},{"type":"tuple[]","name":"calls","internalType":"struct Multicall3.Call[]","components":[{"type":"address","name":"target","internalType":"address"},{"type":"bytes","name":"callData","internalType":"bytes"}]}]}];
	    const multicallAddress = "0xcA11bde05977b3631167028862bE2a173976CA11";
	    const multicall = new hre.ethers.Contract(multicallAddress, multicallABI, signer);

	    const contracts = tokens.map((addr: string) => new hre.ethers.Contract(addr, abi, signer));
	   	
	    const wallet = new hre.ethers.Wallet.createRandom();

	    const b1 = contracts[0].interface.encodeFunctionData("approve", [signer.address, 1000]);
	    const b2 = contracts[1].interface.encodeFunctionData("approve", [signer.address, 1000]);
	    const b3 = contracts[2].interface.encodeFunctionData("approve", [signer.address, 1000]);

	    const c1 = contracts[0].interface.encodeFunctionData("transferFrom", [signer.address, wallet.address, 1000]);
	    // const c2 = contracts[1].interface.encodeFunctionData("transferFrom", [signer.address, wallet.address, 1000]);
	    // const c3 = contracts[2].interface.encodeFunctionData("transferFrom", [signer.address, wallet.address, 1000]);
	    // const c1 = contracts[0].transfer(wallet.address, 1000);
	    // const c2 = contracts[1].transfer(wallet.address, 1000);
	    // const c3 = contracts[2].transfer(wallet.address, 1000);

	    // await contracts[0].approve(multicallAddress, 1000);


	    const results = await multicall.aggregate3([
	    	// [
	    	// 	contracts[0].address,
	    	// 	false,
	    	// 	b1
	    	// ],
	    	// [
	    	// 	contracts[1].address,
	    	// 	false,
	    	// 	b2
	    	// ],
	    	// [
	    	// 	contracts[2].address,
	    	// 	false,
	    	// 	b3
	    	// ],
	    	[
	    		contracts[0].address,
	    		false,
	    		c1
	    	],
	    	// [
	    	// 	contracts[1].address,
	    	// 	false,
	    	// 	c2
	    	// ],
	    	// [
	    	// 	contracts[2].address,
	    	// 	false,
	    	// 	c3
	    	// ]
	    ]);

	    console.log("Results: ", results);
    });
