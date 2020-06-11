import { ServerFeatures } from "../types";

export const empty: ServerFeatures = {
  ikev2: false,
  ikev2_v6: false,
  l2tp: false,
  openvpn_dedicated_tcp: false,
  openvpn_dedicated_udp: false,
  openvpn_tcp: false,
  openvpn_tcp_tls_crypt: false,
  openvpn_tcp_v6: false,
  openvpn_udp: false,
  openvpn_udp_tls_crypt: false,
  openvpn_udp_v6: false,
  openvpn_xor_tcp: false,
  openvpn_xor_udp: false,
  pptp: false,
  proxy: false,
  proxy_cybersec: false,
  proxy_ssl: false,
  proxy_ssl_cybersec: false,
  socks: false,
  wireguard_udp: false
};

export default {
  empty
};
