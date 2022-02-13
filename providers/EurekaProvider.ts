import Eureka from "../src/EurekaClient"

import { ApplicationContract } from '@ioc:Adonis/Core/Application'
/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
// const appName = "EUREKA-PROVIDER"
// const instanceId = `${appName}:${new Date().getTime()}`
// var data = JSON.stringify({
//     instance: {
//         hostName: ip.address(),
//         app: appName,
//         vipAddress: appName,
//         instanceId: instanceId,
//         ipAddr: ip.address(),
//         status: "UP",
//         port: {
//             "$": 3333,
//             "@enabled": true
//         },
//         dataCenterInfo: {
//             "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
//             "name": "MyOwn"
//         }
//     }
// });

// var config = {
//     method: 'post',
//     url: `http://34.93.112.219:8761/eureka/apps/${appName.toLowerCase()}`,
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     appName,
//     instanceId,
//     data: data
// };

let eurekaClient: Eureka;

export default class EurekaProvider {
    constructor(protected app: ApplicationContract) {}

    public register() {
        // Register your own bindings
        const config = this.app.container.resolveBinding('Adonis/Core/Config').get('eureka', {})
        eurekaClient = new Eureka(config)
    }

    public async boot() {
        // All bindings are ready, feel free to use them
        eurekaClient.register()
    }

    public async ready() {
        // App is ready
    }

    public async shutdown() {
        // Cleanup, since app is going down
    }
}
