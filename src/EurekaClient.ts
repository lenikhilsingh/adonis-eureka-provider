var axios = require('axios');
const request = require('request');

export default class Eureka {
    config: any;
    requestMiddleware: any;
    hasFullRegistry: boolean;

    constructor(config: any = {}) {
        console.log('initializing eureka client');
        this.config = config
        this.requestMiddleware = this.config.requestMiddleware;
        this.hasFullRegistry = false;
    }

    /*
    Validates client configuration.
    */
    validateConfig(config: any) {
        function validate(namespace: any, key: any) {
            if (!config[namespace][key]) {
                throw new TypeError(`Missing "${namespace}.${key}" config value.`);
            }
        }

        if (config.eureka.registerWithEureka) {
            validate('instance', 'app');
            validate('instance', 'vipAddress');
            validate('instance', 'port');
            validate('instance', 'dataCenterInfo');
        }

        if (typeof config.requestMiddleware !== 'function') {
            throw new TypeError('requestMiddleware must be a function');
        }
    }



    register() {
        setTimeout(() => {
            console.log('It looks like it\'s taking a while to register with ' +
                'Eureka. This usually means there is an issue connecting to the host ' +
                'specified. Start application with NODE_DEBUG=request for more logging.');
        }, 40000);

        const url = `${this.config.url}/${this.config.instanceId}`
        axios(this.config)
            .then(function (response: any) {
                console.log(JSON.stringify(response.data));
                console.log(`Registered with Eureka.`);
                setInterval(() => {
                    request.put({
                        headers: { 'content-type': 'application/json' },
                        url: url
                    }, (error: any) => {
                        if (error) {
                            console.log('Sending heartbeat to Eureka failed.');
                        } else {
                            console.log('Successfully sent heartbeat to Eureka.');
                        }
                    });
                }, 5 * 1000);
            })
            .catch(function (error: any) {
                console.log('error:', error);
                console.log(`Not registered with eureka due to: ${error}`);
            });
    }
}