# sex-plus

## Dependencies

### Required

 - [Node 8+](https://nodejs.org)

### Etherium Recommended

 - [Docker](https://www.docker.com/community-edition)
 - https://github.com/Capgemini-AIE/ethereum-docker

## Local Dev

```bash
npm i
npm run dev
```

Go to http://localhost:4000


## To build contracts locally
```bash
 solcjs <contract_1>.sol <contract_2>.sol --bin -o ../built_contracts/
```

Then, run the same command but with `--abi` instead of `--bin` to generate json mappings for sol files
