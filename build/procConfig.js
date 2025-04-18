require("dotenv").config();

const isDev = (s) => s === "development";
const isProd = (s) => s === "production";

const validateNodeEnv = (s, curr) => {
    if(s === "NODE_ENV"
        && curr !== "development"
        && curr !== "production"
    ) {
        throw new Error(`NODE_ENV can only be 'development' or 'production'. Got: ${curr}`)
    }
}

const resolveConfigStr = (s) => {
    const envVal = process.env[s]
    if(!envVal) {
        throw new Error(`Could not find value for ${s} in .env`); 
    }

    // validate any restricted env values
    validateNodeEnv(s, envVal);

    return envVal
}

const config = {
    nodeEnv: resolveConfigStr("NODE_ENV"),
}

module.exports = {
    config,
    isDev: isDev(config.nodeEnv),
    isProd: isProd(config.nodeEnv),
}