// Uncomment (and comment out others) the file import you need for your current environment
// Important: Do NOT commit changes in this file!
import config from './envs/prod'

const get = (key: string) => {
  return config[key]
}

export default get
