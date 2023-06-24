### How you can generate wallets? It's easy!
Copy and install this repository globally.
```
npm install
npm link
```
#### Bitcoin

```
cwj create --network=bitcoin --xpub=xpub6CmcGnJZLYY3GFFiDKr7fJXn84Zhia3TYJhEU9wtDp2WGd6DsQSts6yv8ee6Pns3TJdFtfaNUMgFJzgMf5Ca4ATjX7idE1YpyjU1JJ6KaW1 --amount=1 --path=D:/bitcoin.txt
```

#### Ethereum

```
cwj create --network=eth --amount=1 --path=D:/ethereum.txt
cwj create-seed --network=eth
cwj create-by-seed --amount=5 --network=eth --path=D:/seed.txt --seed="topple uniform buyer renew brother aisle bubble ten ankle rebuild usage firm"
cwj create-by-seed --amount=5 --network=eth --path=D:/seed.txt

```

#### Tron
```
cwj create --network=tron --amount=1 --path=D:/tron.txt
```