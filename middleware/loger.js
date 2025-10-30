const loger = (req, res, next) => {
    const method = req.method; 
    const url = req.url;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${url}`);
    
    next();
};

module.exports = loger;