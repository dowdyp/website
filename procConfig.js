require("dotenv").config();

const validateNodeEnv = (s, curr) => {
    if(s === "NODE_ENV"
        && curr !== "DEV"
        && curr !== "PROD"
    ) {
        throw new Error(`NODE_ENV can only be DEV or PROD. Got: ${curr}`)
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
    config
}