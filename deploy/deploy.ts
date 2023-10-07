import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
        console.log("HRE: ", hre);
    
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer} = await getNamedAccounts();
        

    for (let i = 0; i < 10; i++) {
        const deployed = await deploy(
            "Token",
            {
                from: deployer,
                log: true,
                args: [
                    `Token${i}`,
                    `T${i}`
                ]
            }
        );

        console.log("Deployed: ", deployed);
    }
}

export default func;

func.tags = ["token"];
