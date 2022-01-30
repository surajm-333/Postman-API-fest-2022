const config ={
    production:{
         SECRET:process.env.SECRET,
         DATABASE:process.env.MONGODB_URI
    },
    default:{
        SECRET:'AGrI4FTpyaamLKBAnS3ov8SnnNd2ABCr',
        DATABASE:'mongo_url_goes_here'

    }
}

exports.get = function get(env){
    return config[env] || config.default
}
