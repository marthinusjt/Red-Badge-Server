module.exports = (req, res, next) => {

<<<<<<< HEAD
        var allowedOrigins = ['http://localhost:4200/', 'https://crithits.herokuapp.com'];
        var origin = req.headers.origin;
        //console.log(allowedOrigins.indexOf(origin))
        
        if(allowedOrigins.indexOf(origin) > -1){
             res.setHeader('Access-Control-Allow-Origin', origin);
            //  console.log(origin)
        }

    // res.header('access-control-allow-origin', '*'); //http://localhost:4200
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    res.header('access-control-allow-headers', 'Content-Type, Authorization'); 
    res.header('Access-Control-Allow-Credentials', true);
=======
    res.header('access-control-allow-origin', '*'); //http://localhost:4200 && //https://crithits.herokuapp.com
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); 
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
 
>>>>>>> 8a2ef4b75f4943f392cc08487e08ac5591c8924d
    next();
};