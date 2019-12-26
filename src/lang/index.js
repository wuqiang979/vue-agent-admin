import Vue from 'vue'
import VueI18n from 'vue-i18n'

// element-ui built-in lang
// import locale from 'element-ui/lib/locale'

// User defined lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: enLocale,
  zh: zhLocale
}

const i18n = new VueI18n({
  locale: 'zh',
  messages
})

// locale.i18n((key, value) => i18n.t(key, value))
export default i18n
