import { UserState } from '.';

import { ShortUser } from '@/interfaces';

type UserActionType =
  | { type: '[User] - Load user', payload: ShortUser }

export const userReducer = (state: UserState, action: UserActionType): UserState => {
  switch (action.type) {
    case '[User] - Load user':
      return { ...state, user: action.payload }

    default:
      return state
  }
}