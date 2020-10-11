const multiaddr = require('multiaddr')
const process = require('process')

const p2pNode = require('./p2p')
const go = require('./go')

const main = async () => {
	// Start libp2p
	const [node, err] = await go(p2pNode)
	if(err){
		console.error(`Failed to craete p2pNode: ${err.toString()}`)
		return
	}
	console.log('Started libp2p!')

	// Start libp2p
	const [_, err2] = await go(node.start())
	if(err2){
		console.error(`Failed to start libp2p: ${err2.toString()}`)
		return
	}

	// List listening addressesf
	console.log('Listening on:')
	node.multiaddrs.forEach(addr => {
		console.log(`${addr.toString()}/p2p/${node.peerId.toB58String()}`)
	})

	// Ping addresses
	if(process.argv.length >= 3){
		try{
			ma = multiaddr(process.argv[2])
		} catch(e){
			console.error(`Failed to create multiaddr: ${e.toString()}`)
			return
		}
		console.log(`pinging remote peer at ${process.argv[2]}`)
		while(true){
			const [latency, err4] = await go(node.ping(ma))
			if(err4){
				console.error(`Failed to ping: ${err4.toString()}`)
				break
			}
			console.log(`pinged ${process.argv[2]} in ${latency}ms`)
			await new Promise(r => setTimeout(r, 1000));
		}
	} else{
		console.log('no remote peer address given, skipping ping')
	}

	const stop = async () => {
		// Stop libp2p
		const [_, err3] = await go(node.stop())
		if(err3){
			console.error(`Failed to stop libp2p: ${err3.toString()}`)
		} else{
			console.log('Libp2p has stopped!')
		}
		return
	}

	process.on('SIGTERM', stop)
	process.on('SIGINT', stop)
}

main()