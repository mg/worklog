import createHistory from 'history/lib/createHashHistory'
import mount from './app/mount'

mount(createHistory(), 'app')
