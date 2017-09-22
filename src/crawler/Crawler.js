/**Standard Modules */
import net from 'net';
import iconv from 'iconv-lite';

/** 
 * reference: 
 * author     chenchen chang <bird11419@yahoo.com.tw>
 * link       https://github.com/mbilab/ptt-bot 
 */
/**
  * Regular Expression && Pattern
  */
const AnsiSetDisplayAttr = /\[(\d+)*;*(\d+)*;*(\d+)*;*(\d+)*[mHK]/g;
const ArticleListStart = /\s人氣:[0-9]{1,5}\s/;
const AnsiCursorHome = /\[(\d+)*;*(\d+)*H/g
const AnsiEraseEOL = /\[K/g;
const ArticleListEnd = "[34;46m 文章選讀";
const ArticleIndexStart = "[1;30;47m 目前顯示: 第";
const ArticleIndexEnd = "行[";
const ArticlePercentStart = " 頁 (";
const ArticlePercentEnd = "%) [1;30;47m";

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

/**
  * Screens serial number
  */
const Main = 0; //【主功能表】
const HotBoard = 1; //【熱門看板列表】
const FavBoard = 2; //【我的最愛看板列表】
const BoardClass = 3; //【分類看板】
const BoardList = 4; //【看板列表】
const ArticleList = 5; //【文章列表】
const Article = 6; //【文章內】


function sendCommand(connettion, command) {
  connettion.write(command);
}

/**Login to ptt2.cc */
export function login(id, pw) {
  return new Promise((resolve, reject) => {
    let conn = net.createConnection({ port: 23, host: 'ptt2.cc' });
    let connNewData;
    if
      (!conn) reject({ err: 'No connection' });
    else {
      conn.addListener('connect', () => console.log('Connect to ptt2.cc'));
      conn.addListener('end', () => console.log('Disconnect..'));
      conn.addListener('data', (data) => {
        connNewData += iconv.decode(data, 'big5');
        console.log(connNewData);
      });
      handleLoginPtt2(conn, id, pw);
      resolve(conn);
    }
  });
}

function handleLoginPtt2(connetion, id, pw) {
  sendCommand(connetion, id + '\r');
  sendCommand(connetion, pw + '\r');
}
