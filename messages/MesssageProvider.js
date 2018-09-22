// message manager
import Messages from './Messages'
import { _ } from 'lodash'


// get message by key
const messageByKey = (key) => {
  if (key) {
    const messages = Messages.filter(message => message.key === key)
    return _.get(messages, 'messages[0]', '')
  }
  return ''
}

const MesssageProvider = {
  messageByKey,
}

export default MesssageProvider
