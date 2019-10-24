import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyA9C93oR3e4BbYHvrFPi9EMftF-8n2m5ro',
  authDomain: 'fire-matchbox.firebaseapp.com',
  databaseURL: 'https://fire-matchbox.firebaseio.com',
  projectId: 'fire-matchbox',
  storageBucket: 'fire-matchbox.appspot.com',
  messagingSenderId: '1059015282023',
  appId: '1:1059015282023:web:4303bbb47f36d196d933c2',
  measurementId: 'G-W3D873Q4KE'
}
const fire = firebase.initializeApp(firebaseConfig)
export default fire
