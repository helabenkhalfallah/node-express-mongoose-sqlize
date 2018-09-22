// message manager
import Messages from './Messages'

// get message by key
const messageByKey = (key) => {
  if (key) {
    const messages = Messages.filter(message => message.key === key)
    return (messages && messages.length > 0) ? messages[0] : ''
  }
  return ''
}

const MesssageProvider = {
  messageByKey,
}

export default MesssageProvider
