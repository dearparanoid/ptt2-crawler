import * as Crawler from './crawler/Crawler';
import * as Command from './common/Command';

/**Plz add your ptt2 user inforamtion 
 * export const userID= 'xxx'
 * export const userPW = 'xxx'
 * 
 */
import * as User from './User';


Crawler.connectToPTT2()
    .then((ret) => {
        return Crawler.sendCommand(`${User.userID}\r`);
    }).then((ret) => {
        return Crawler.sendCommand(`${User.userPW}\r`);
    }).then((ret) => {
        return Crawler.connectionHandler(Command.Enter);
    }).then((ret) => {
        return Crawler.connectionDataHandler();
    }).then((ret)=>{
        console.log(ret);
    }).catch(err => console.log(err));
