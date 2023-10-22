import { UserState } from '.';

import { ShortUser } from '@/interfaces';

type UserActionType =
  | { type: '[User] - Load user', payload: ShortUser }
  | { type: '[User] - Update user', payload: ShortUser }

export const userReducer = (state: UserState, action: UserActionType): UserState => {
  switch (action.type) {
    case '[User] - Load user':
      return { ...state, user: action.payload, isLoggedIn: true }

    case '[User] - Update user':
      return { ...state, user: action.payload }

    default:
      return state
  }
}