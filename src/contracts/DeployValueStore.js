loadScript("ValueStore.js")

var contractFromMap = contractContent.contracts["value_store.sol:ValueStore"]
var contractTemplate = web3.eth.contract(JSON.parse(contractFromMap.abi))
var gasValue = eth.estimateGas({data:"0x" + contractFromMap.bin})

var contractInst = contractTemplate.new({ from: eth.accounts[0], data: "0x" + contractFromMap.bin, gas: gasValue},
	function (e, contract) {
		console.log(e, contract);
		if (typeof contract.address !== 'undefined') {
			console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
		}
	}
)
