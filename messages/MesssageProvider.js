// message manager
import Messages from './Messages'
import { find } from 'lodash'


// get message by key
const messageByKey = (key) => {
  const language = process.env.DEFAULT_LANGUAGE
  if (key) {
    const message = find(Messages.DATA, { 'key': key, 'language': language })
    return message ? message.value : ''
  }
  return ''
}

const MesssageProvider = {
  messageByKey,
}

export default MesssageProvider
