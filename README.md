### How you can generate wallets? It's easy!
Copy and install this repository globally.
```
npm install
npm link
```
#### Bitcoin

```
cwj create-by-xpub --amount=1 --path=D:/bitcoin.json --xpub=xpub6CPm3dBibxZBhwuSbSPAsVV9gQeC8hvrJC8VV6zMDbicJCnevDnihF44tVejjqAzXNzFkWZN4B9jup6aGz5GJyJFVxoqTrJ1eZaSLQLuWuX

cwj create-by-zpub --amount=1 --path=D:/bitcoin.json --zpub=zpub6rtX2GACNtSKp4iGw7n5EjkrirRppENZzze2aUHocRH6NshNumRLvMAT4QGJuaUtapzCbaKi5fUUQBTjnyEboUkEo1khppS18WMnsUxTSvK

cwj create-seed --network=bitcoin

cwj create-by-seed --amount=1 --network=bitcoin --path=D:/bitcoin.json --seed="duck upon hybrid cycle sport release section enough attack brother useless talk"

cwj create-by-seed --amount=1 --network=bitcoin --path=D:/bitcoin.json
```

#### Ethereum

```
cwj create --network=eth --amount=1 --path=D:/ethereum.json

cwj create-seed --network=eth

cwj create-by-seed --amount=5 --network=eth --path=D:/seed.json --seed="topple uniform buyer renew brother aisle bubble ten ankle rebuild usage firm"

cwj create-by-seed --amount=5 --network=eth --path=D:/seed.json

```

#### Tron
```
cwj create --network=tron --amount=1 --path=D:/tron.json
```