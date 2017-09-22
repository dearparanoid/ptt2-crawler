/**Standard Modules */
import net from 'net';
import iconv from 'iconv-lite';

/** 
 * reference: 
 * author     chenchen chang <bird11419@yahoo.com.tw>
 * link       https://github.com/mbilab/ptt-bot 
 */

/**
  * Telnet Keyboard Equivalents
  */
const Enter = '\r';
const PageUp = 'P';
const PageDown = 'N';
const Left = '\u001b[D';
const Right = '\u001b[C';
const Up = '\u001b[A';
const Down = '\u001b[B';
const CtrlL = '\u000c';
const CtrlZ = '\u001a';


/**Send Command */
export function sendCommand(conn, command) {
  return new Promise((resolve, reject) => {
    if (!conn) {
      reject({ err: 'Empty Connection' });
    } else {
      conn.write(command);
      resolve(conn);
    }
  })
}

/**Login to ptt2.cc */
export function login(id, pw) {
  return new Promise((resolve, reject) => {
    const conn = net.createConnection({ port: 23, host: 'ptt2.cc' });

    if
      (!conn) reject({ err: 'Connection Rejected' });
    else {
      conn.addListener('connect', () => console.log('Connect to ptt2.cc'));
      conn.addListener('end', () => console.log('Disconnect..'));
      conn.addListener('data', (data) => {
        let connNewData;
        connNewData += iconv.decode(data, 'big5');
        console.log(connNewData);
      });
      resolve(conn);
    }
  });
}


/** Test */
function handleLoginPtt2(conn, id, pw) {
  conn.write(conn, id + '\r');
  conn.write(conn, pw + '\r');
  conn.write(conn, Enter);
  conn.write(conn, Enter);
  conn.write(conn, '\r');
}

