import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';
import fr from 'javascript-time-ago/locale/fr';
import it from 'javascript-time-ago/locale/it';

TimeAgo.addLocale(en);
TimeAgo.addLocale(it);
TimeAgo.addDefaultLocale(fr);

export default TimeAgo;
