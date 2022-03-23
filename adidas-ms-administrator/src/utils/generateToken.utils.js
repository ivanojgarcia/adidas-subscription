import jwt from 'jsonwebtoken';

export default data => {
    return jwt.sign({
        id: data.id
    }, 
    process.env.SECRET, 
    {
        expiresIn: 900 // 24 hours
    })
}