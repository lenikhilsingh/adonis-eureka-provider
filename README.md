# adonis-eureka-provider


Installation Command: 

`npm i adonis-eureka-provider`


Please run this command to configure the package:

`node ace configure adonis-eureka-provider`


The above command will perform the following actions:

```
# CREATE: config/eureka.ts

# UPDATE: .env

# UPDATE: .adonisrc.json { providers += "adonis-eureka-provider" }
```

Validate Environment Variable:
```
/**
 * Make sure to add the following validation rules to the
 * `env.ts` file to validate the environment variables.
 */
 
export default Env.rules({
  // ...existing rules
  EUREKA_CLIENT_NAME: Env.schema.string(),
  EUREKA_SERVER_IP: Env.schema.string({ format: 'host' }),
  EUREKA_SERVER_PORT: Env.schema.number()
})
```
