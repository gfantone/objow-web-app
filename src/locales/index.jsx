import fr from './fr.json';
import en from './en-US.json';
import es from './es.json';
import it from './it.json';
import cs from './cs.json';
import da from './da.json';
import de from './de.json';
import el from './el.json';
import fi from './fi.json';
import hr from './hr.json';
import hu from './hu.json';
import nl from './nl.json';
import pt from './pt-PT.json';
import ro from './ro.json';
import sk from './sk.json';
import sv from './sv.json';
import _ from 'lodash';

// fallback to fr when key is missing
export default {
  fr,
  en: _.merge({}, fr, en),
  it: _.merge({}, fr, it),
  es: _.merge({}, fr, es),
  cs: _.merge({}, fr, cs),
  da: _.merge({}, fr, da),
  de: _.merge({}, fr, de),
  el: _.merge({}, fr, el),
  fi: _.merge({}, fr, fi),
  hr: _.merge({}, fr, hr),
  hu: _.merge({}, fr, hu),
  nl: _.merge({}, fr, nl),
  pt: _.merge({}, fr, pt),
  ro: _.merge({}, fr, ro),
  sk: _.merge({}, fr, sk),
  sv: _.merge({}, fr, sv),
};
