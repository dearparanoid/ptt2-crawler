/**Standard Modules */
import net from 'net';
import iconv from 'iconv-lite';

import * as Command from '../common/Command';

let gConn = {};

/**Send Command */
export function sendCommand(command) {
  return new Promise((resolve, reject) => {
    if (!gConn.conn) {
      reject({ err: 'Empty Connection' });
    } else {
      gConn.conn.write(command);
      resolve(gConn);
    }
  })
}

/** Get Data
 */
export function connectToPTT2() {
  return new Promise((resolve, reject) => {
    gConn.conn = net.createConnection(23, 'ptt2.cc');
    if (!gConn.conn) {
      reject({ err: 'Establish connection fail' });
    } else {
      gConn.conn.setTimeout(2000);
      gConn.conn.on('connect', () => console.log('Connect to ptt2.cc'));
      gConn.conn.on('end', () => console.log('Disconnect..'));
      resolve(gConn);
    }
  });
}

export function connectionDataHandler() {
  return new Promise((resolve, reject) => {
    gConn.conn.on('data', (data) => {
      gConn.data += iconv.decode(data, 'big5');
      //console.log(gConn.data);
      resolve(gConn);
    });
  });
}

export function connectionHandler(keyExtractor, command, commandType) {
  return new Promise((resolve, reject) => {
    gConn.conn.on('timeout', () => {
      if (ptt2ConnectionHandler(keyExtractor, command, commandType) === true) resolve(gConn);
      else reject({ err: `Executing Commnad-${command} Fail` });
    });
  })
}

function ptt2ConnectionHandler(keyExtractor, command, commandType) {
  //console.log(`Extractor = ${keyExtractor}, Command = ${command}`);

  if (gConn.data.indexOf(keyExtractor) !== -1) {
    gConn.data = '';
    if (commandType === Command.NeedEnter) {      
      gConn.conn.write(`${command}\r`);
    } else {
      gConn.conn.write(command);
    }
    return true;
  } else {
    return false;
  }
}


