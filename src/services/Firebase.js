import fire from '../config/Firebase'
import firebse from 'firebase'
const USERS_COLLECTION_NAME = 'users'
const USER_INFO_COLLECTION_NAME = 'user_info'
const SEARCH_FILTERS_COLLECTION_NAME = 'search_filters'
const SALE_LISTINGS_COLLECTION_NAME = 'sale_listings'
const AREAS_COLLECTION_NAME = 'areas'
const RENTAL_LISTINGS_COLLECTION_NAME = 'rental_listings'
const EXAMPLE_LISTINGS_COLLECTION_NAME = 'example_listings'
const FORAGENT_LISTINGS_COLLECTION_NAME = 'for_agent_listings'
const CHATS_COLLECTION_NAME = 'chats'
const MESSAGES_COLLECTION_NAME = 'messages'
const SALE_LISTING_INFO_COLLECTION_NAME = 'sale_listings_info' // *** sale_listings <- s was a mistake but now in DB :(
const RENTAL_LISTING_INFO_COLLECTION_NAME = 'rental_listing_info'
const MATCHES_COLLECTION_NAME = 'matches'
const BUDDY_MATCHES_COLLECTION_NAME = 'buddy_matches'
const CONSTANTS_COLLECTION_NAME = 'constants'
const SUBSCRIPTIONS_COLLECTION_NAME = 'subscriptions'
const PAYMENTS_COLLECTION_NAME = 'payments'
const USER_META_COLLECTION_NAME = 'user_meta'

const firebaseDB = fire.firestore()
export const firebaseAuth = fire.auth()
export const googleAuthProvider = new firebse.auth.GoogleAuthProvider()

export const subscriptionRequestFunctionURL = 'https://us-central1-fire-matchbox.cloudfunctions.net/generateSubscriptionRequest'
export const paymentRequestFunctionURL = 'https://us-central1-fire-matchbox.cloudfunctions.net/generatePaymentRequest'

// doc refs
export const getCurrentUserDocRef = () => (firebaseDB.collection(USERS_COLLECTION_NAME).doc(firebaseAuth.currentUser.uid))

export const getCurrentUserMetaDocRef = () => (firebaseDB.collection(USERS_COLLECTION_NAME).doc(firebaseAuth.currentUser.uid)
  .collection(USER_META_COLLECTION_NAME).doc('subscription_data'))

export const getFiltersDocRef = (type) => (firebaseDB.collection(USERS_COLLECTION_NAME)
  .doc(firebaseAuth.currentUser.uid).collection(SEARCH_FILTERS_COLLECTION_NAME).doc(type))

export const getListingDocRef = (key) => (firebaseDB.collection(SALE_LISTINGS_COLLECTION_NAME)
  .doc(key))

export const getListingDetailsDocRef = (key) => (firebaseDB.collection(SALE_LISTINGS_COLLECTION_NAME)
  .doc(key)).collection(SALE_LISTING_INFO_COLLECTION_NAME).doc('meta')

export const getAreasCollectionRef = () => (firebaseDB.collection(AREAS_COLLECTION_NAME))

export const getSingleSuburb = (suburb) => (firebaseDB.collection(SALE_LISTINGS_COLLECTION_NAME).where('suburb', '==', suburb))

export const getNewSubscriptionDocRef = () => (firebaseDB.collection(SUBSCRIPTIONS_COLLECTION_NAME).doc())

export const getNewPaymentDocRef = () => (firebaseDB.collection(PAYMENTS_COLLECTION_NAME).doc())
