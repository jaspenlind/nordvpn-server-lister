# nordvpn-server-lister

CLI / api for listing NordVPN servers

[![Build Status](https://travis-ci.com/jaspenlind/nordvpn-server-lister.svg)](https://travis-ci.com/jaspenlind/nordvpn-server-lister)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/93451c5afd954bd0a56d2417d2dbe301)](https://www.codacy.com/manual/jaspenlind/asuswrt-cli?utm_source=github.com&utm_medium=referral&utm_content=jaspenlind/nordvpn-server-lister&utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/jaspenlind/asuswrt-cli/badge.svg)](https://coveralls.io/r/jaspenlind/nordvpn-server-lister)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![David](https://david-dm.org/jaspenlind/nordvpn-server-lister.svg)
![GitHub](https://img.shields.io/github/license/jaspenlind/nordvpn-server-lister)

## Installation

```shell
npm install -g nordvpn-server-lister
```

## Usage

### CLI

```shell
usage: vpn-servers [filters] [output]

 Examples:
   -filter.flag=SE -filter.load ge 24           Lists servers in Sweden with a load greater than 24
   -output=ip_address -output=country           Outputs server ip address & country as json
   -output=ip_address -raw                      Outputs server ip address as raw text
   -h                                           Shows this help message
```

### API

```js
import fetch from "nordvpn-server-lister";

(async () => {
  const result = await fetch();

==>
{
  items: [
    {
      "name": "server1",
      "country": "Sweden"
    }...
  ]
}
})();
```
