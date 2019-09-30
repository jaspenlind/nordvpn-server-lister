export default interface ServerFeatures {
  ikev2: true;
  openvpn_udp: boolean;
  openvpn_tcp: boolean;
  socks: boolean;
  proxy: boolean;
  pptp: boolean;
  l2tp: boolean;
  openvpn_xor_udp: boolean;
  openvpn_xor_tcp: boolean;
  proxy_cybersec: boolean;
  proxy_ssl: boolean;
  proxy_ssl_cybersec: boolean;
  ikev2_v6: boolean;
  openvpn_udp_v6: boolean;
  openvpn_tcp_v6: boolean;
  wireguard_udp: boolean;
  openvpn_udp_tls_crypt: boolean;
  openvpn_tcp_tls_crypt: boolean;
  openvpn_dedicated_udp: boolean;
  openvpn_dedicated_tcp: boolean;
}
