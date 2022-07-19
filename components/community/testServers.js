
import { isStunAddressUp } from "./stunAddChecker";

export async function TestServers(servers){
    let results = {
        servers: [],
    };

    for(let i = 0; i < servers.length;i++){
        let server = servers[i];

        console.log(`== Testing: ${server}:`);

        try{
            let result = await isStunAddressUp(server, 8000);
            console.log('%c Server functional! ', 'background: #222; color: #02ff00');

            if(result.myIpAddress){
                if (result.ipv6Supported == true) {
                    results.servers.push(server)
                }
            }

        }catch(e){
            if(e == "timeout"){
                console.log('%c STUN Server connection timeout! ', 'background: #222; color: #ff0000');
                return;
            }

            console.log('%c STUN Server unreachable! ', 'background: #222; color: #ff0000');
        }

        console.log(`======================`);
    }

    return results.servers;
};
