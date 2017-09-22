import * as Crawler from './crawler/Crawler';
import * as Command from './common/Command';

/**Plz add your ptt2 user inforamtion */
import * as User from './User';


Crawler.login(User.userID, User.userPW)
    .then((ret) => {
        return ret;
    })
    .then((ret) => {
        return Crawler.sendCommand(ret, Command.Enter);
    })
    .then((ret) => {
        return Crawler.sendCommand(ret, `${User.userID}\r`);
    })
    .then((ret) => {
        return Crawler.sendCommand(ret, `${User.userPW}\r`);
    })
    .then((ret) => {
        return Crawler.sendCommand(ret, 'y\r');
    })
    .catch(err => console.log(err));
