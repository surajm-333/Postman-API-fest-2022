const config ={
    production:{
         SECRET:process.env.SECRET,
         DATABASE:process.env.MONGODB_URI
    },
    default:{
        SECRET:'SUPERSECRET123',
        DATABASE:'mongo_url_goes_here'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}
