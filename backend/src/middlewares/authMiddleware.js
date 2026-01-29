import { validateToken } from "../services/authantication.js";


export function checkForAuthenticaionCookies(mindpost){
    return(req, res, next) => {
        const tokenCookieValue = req.cookies[mindpost];
        if(!tokenCookieValue){
            return next();
        }

        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
            
        } catch(error){
            req.user = null;
        }

        return next();
    }
}


export function authMiddleware(req, res, next){
    if(!req.user){
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}