# nordvpn-server-lister
A tool for listing NordVPN servers

## Help
```shell
usage: node index.js [parameters]

 Examples:
   -filter.flag=\"SE\" -filter.load\>24         Lists servers in Sweden with a load greater than 24
   -output=ip_address -output=country           Outputs server ip address & country as json
   -output=ip_address -raw                      Outputs server ip address as raw text
   -h                                           Shows this help message 
```

## Example
```shell
node index.js -filter.load\<1 -output=id -output=name -raw
```
### Output
```json
{"id":925471,"name":"Egypt #5"},{"id":943159,"name":"Hong Kong #122"}]
```
