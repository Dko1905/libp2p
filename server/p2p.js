const Libp2p = require('libp2p')
const WS = require('libp2p-websockets')
const { NOISE } = require('libp2p-noise')
const MPLEX = require('libp2p-mplex')

const node = async function(){
	return await Libp2p.create({
		addresses: {
			listen: ['/ip4/0.0.0.0/tcp/0/ws']
		},
		modules: {
			transport: [ WS ],
			connEncryption: [ NOISE ],
			streamMuxer: [ MPLEX ]
		}
	})
}()

module.exports = node