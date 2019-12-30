import aes256 from 'aes256'

export const encryptText = (text: string): string => {
    const key: string = process.env.AES256_KEY
    const encryptedText: string = aes256.encrypt(key, text)
    return encryptedText
}

export const decryptText = (encryptedText: string): string => {
    const key: string = process.env.AES256_KEY
    const decryptedText: string = aes256.decrypt(key, encryptedText)
    return decryptedText
}