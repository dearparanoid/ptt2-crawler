import * as Crawler from './crawler/Crawler';
import * as Command from './common/Command';

/**Plz add your ptt2 user inforamtion 
 * export const userID= 'xxx'
 * export const userPW = 'xxx'
 * 
 */
import * as User from './User';


Crawler.login(User.userID, User.userPW)
    .then((ret) => {   
        console.log(ret );
        return Crawler.sendCommand(ret, `${User.userID}\r`);
    })
    .then((ret) => {      
        console.log(ret );
        return Crawler.sendCommand(ret, `${User.userPW}\r`);
    })
    .catch(err => console.log(err));

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }