import * as Crawler from './crawler/Crawler';
import * as Command from './common/Command';

/**Plz add your ptt2 user inforamtion 
 * export const userID= 'xxx'
 * export const userPW = 'xxx'
 * export const userBoard = 'xxx'
 */
import * as User from './User';


Crawler.connectToPTT2()
    .then((ret) => {
        return Crawler.sendCommand(`${User.userID}\r`);
    }).then((ret) => {
        return Crawler.sendCommand(`${User.userPW}\r`);
    }).then((ret) => {
        return Crawler.connectionDataHandler();
    }).then((ret) => {
        return Crawler.connectionHandler("按任意鍵繼續", Command.NOP, Command.NeedEnter);
    }).then((ret) => {
        return Crawler.connectionHandler("分組討論區", Command.Search, Command.WithoutEnter);
    }).then((ret) => {
        return Crawler.connectionHandler("輸入看板名稱", User.userBoard, Command.NeedEnter);        
    }).then((ret) => {
        return Crawler.connectionDataHandler();
    })
    .catch(err => console.log(err));
