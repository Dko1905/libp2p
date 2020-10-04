const Libp2p = require('libp2p')
const WS = require('libp2p-websockets')
const { NOISE } = require('libp2p-noise')
const MPLEX = require('ibp2p-mplex')

const node = async function(){
	return await Libp2p({
		modules: {
			transport: [ WS ],
			connEncryption: [ NOISE ],
			streamMuxer: [ MPLEX ]
		}
	})
}();

exports.node = node