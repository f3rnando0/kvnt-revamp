import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const userModel = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    subscription: {
      subscribed: {
        type: Boolean,
        default: false,
      },
      subscriptionType: {
        type: Number,
        default: 0,
      },
      expiresAt: {
        type: Date,
        default: null,
      },
      expired: {
        type: Boolean,
        default: false,
      },
      subscriptionsHistory: {
        type: Array,
        default: [],
      },
    },
    balance: {
      brl: {
        amount: {
          type: Number,
          default: 0,
        },
      },
      usd: {
        amount: {
          type: Number,
          default: 0,
        },
      },
    },
    preferredLanguage: {
      type: String,
      default: 'english',
    },
    termsAccepted: {
      type: Boolean,
      default: false,
    },
    rowsTotalDaily: {
      type: Number,
      default: 0,
    },
    rowsTotalDailyDateReset: {
      type: Date,
      default: null,
    },
    rowsTotal: {
      type: Number,
      default: 0,
    },
    lastState: {
      type: String,
      default: 'none',
    },
    admin: {
      type: Boolean,
      default: false,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const User = model('Users', userModel)

export default User
