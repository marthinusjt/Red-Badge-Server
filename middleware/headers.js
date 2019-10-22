module.exports = (req, res, next) => {

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
    next();
};