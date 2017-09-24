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
const F = 'f';

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
      //console.log(data);
      gConn.data += iconv.decode(data, 'big5');
      //console.log(gConn.data);
      resolve(gConn);
    });
  });
}

export function connectionHandler(command) {
  return new Promise((resolve, reject) => {
    gConn.conn.on('timeout', () => {
      gConn.conn.write(command);
      gConn.data = '';
      resolve(gConn);
    });
  })
}

export function ptt2ConnectionHandler() {

  if (gConn.data.indexOf("按任意鍵繼續") !== -1) {
    gConn.conn.write(Enter);
    console.log("請勿頻繁登入以免造成系統過度負荷");
  } else if (gConn.data.indexOf("分組討論區") !== -1) {
    gConn.conn.write(`${F}${Enter}`);
    console.log("Classified List");
  } else if (gConn.data.indexOf("我的最愛") !== -1) {
    gConn.conn.write(Enter);
    console.log("Favorite List");
  } else if (gConn.data.indexOf("rhythmic") !== -1) {
    gConn.conn.write(Enter);
    console.log("Get in rhythmic");
  }
  else {
    console.log(" Not in ");
  }
  gConn.data = '';
}


