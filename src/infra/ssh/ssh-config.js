const Tunnel = require('tunnel-ssh');
const { Mysql_Conn } = require('../database/db-configs');

const db = () => {
  return new Promise(async (resolve) => {
    const tnl = Tunnel(
      {
        host: process.env.SSH_HOST_OTRS,
        username: process.env.SSH_USER_OTRS,
        password: process.env.SSH_PASS_OTRS,
        port: process.env.SSH_PORT_OTRS,
        dstHost: '127.0.0.1',
        dstPort: 3306,
        keepaliveInterval: 60000,
        keepAlive: true,
      },
      (err) => {
        if (err) throw err;

        resolve(Mysql_Conn);

        // close the tunnel...
        setTimeout(() =>  tnl.close(), 2000);
      }
    );
  });
};

module.exports = { db };
