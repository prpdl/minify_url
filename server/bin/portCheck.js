import server from 'http'

const portCheck = port => {
    new Promise(resolve => {
        server.createServer().listen(port, () => {
            server.close()
            resolve(true)
        })       
        .on('error', () => {
            resolve(false)
        })
    })
}

export default portCheck