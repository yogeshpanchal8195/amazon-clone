import axios from 'axios'

const instance = axios.create({
  // baseURL:'http://localhost:5001/clone-a9872/us-central1/api'
  baseURL:'https://us-central1-clone-a9872.cloudfunctions.net/api'
})

export default instance