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
export function sendCommand(data, command) {
  return new Promise((resolve, reject) => {
    if (!data.conn) {
      reject({ err: 'Empty Connection' });
    } else {
      data.conn.write(command);
      resolve(data);
    }
  })
}

/**Login to ptt2.cc */
export function login(id, pw) {
  return new Promise((resolve, reject) => {
    let data={};
    data.conn = net.createConnection({ port: 23, host: 'ptt2.cc' });
    if (!data.conn)
      reject({ err: 'Connection Rejected' });
    else {
      data.conn.addListener('connect', () => console.log('Connect to ptt2.cc'));
      data.conn.addListener('end', () => console.log('Disconnect..'));
      data.conn.addListener('data', (ret) => {
        data.connectionData  += iconv.decode(ret ,'big5');
        resolve(data.connectionData );
       
      });
      resolve(data);
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

