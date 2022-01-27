const config ={
    production:{
         SECRET:process.env.SECRET,
         DATABASE:process.env.MONGODB_URI
    },
    default:{
        SECRET:'SUPERSECRET123',
         DATABASE:'mongodb+srv://imageshop_admin:imageshop_admin@imageshopdb.5ngx7.mongodb.net/books?retryWrites=true&w=majority'

    }
}

exports.get = function get(env){
    return config[env] || config.default
}