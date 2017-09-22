import * as Crawler from './crawler/Crawler'

/**Plz add your ptt2 user inforamtion */
import * as User from './User';

Crawler.login(User.userID, User.userPW).then(() => {
    console.log('success');
}).catch(err => console.log(err));
