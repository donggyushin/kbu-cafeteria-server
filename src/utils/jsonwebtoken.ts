import jwt from 'jsonwebtoken'

export const generateJsonwebtoken = (text: string): string => {
    const key: string = process.env.JSON_WEB_TOKEN_KEY
    const token: string = jwt.sign({
        foo: text
    }, key)
    return token
}

export const decodeFooJsonwebtoken = (token: string): string => {
    const key: string = process.env.JSON_WEB_TOKEN_KEY
    const decoded: any = jwt.verify(token, key)
    const foo: string = decoded.foo
    return foo
}