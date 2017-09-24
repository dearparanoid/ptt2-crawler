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

let gData = '';
let gConn = {};

/**Send Command */
export function sendCommand(command) {
  return new Promise((resolve, reject) => {
    if (!gConn) {
      reject({ err: 'Empty Connection' });
    } else {
      gConn.write(command);
      resolve(gConn);
    }
  })
}

/**Set new connection */
export function createConn() {
  return new Promise((resolve, reject) => {
    gConn = net.createConnection(23, 'ptt2.cc');
    if (!gConn) {
      reject({ err: 'Establish connection fail' });
    } else {
      gConn.setTimeout(2000);
      gConn.addListener('connect', () => console.log('Connect to ptt2.cc'));
      gConn.addListener('end', () => console.log('Disconnect..'));
      gConn.addListener('data', (data)=>{
        gData += iconv.decode(data, 'big5');
      })
      gConn.addListener('timeout', ()=>{
        console.log(gData);
        ptt2ConnectionHandler();
      })
      resolve(gConn);
    }
  })
}

function ptt2ConnectionHandler() {
  if (gData.indexOf("按任意鍵繼續") !== -1 ) {
    gConn.write(Enter);
    console.log("請勿頻繁登入以免造成系統過度負荷");
  } else if (gData.indexOf("分組討論區") !== -1) {
    gConn.write(`${F}${Enter}`);
    console.log("Classified List");
  } else if (gData.indexOf("我的最愛") !== -1) {
    gConn.write(Enter);    
    console.log("Favorite List");
  } 
  else {
    console.log(" Not in ");
  }
  gData='';
}

/** Test */
function test(conn) {

  conn.write(Enter);
}

