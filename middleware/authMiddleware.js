import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado.' });
    }

    try {
        const decoded = jwt.verify(token, 'you-secret-key')
        req.doctorId = decoded.doctorId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
}

export default verifyToken;