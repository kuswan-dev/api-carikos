import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import config from './config.js'

export function generateAccessToken({_id, profileImage, type, username}) {
    return jwt.sign({_id, profileImage, type, username}, config.access_key, {expiresIn: '30m'})
}

export async function generateRefreshToken({_id}) {
    const token = jwt.sign({_id}, config.refresh_key)
    await User.findByIdAndUpdate(_id, {token})
    return token
}