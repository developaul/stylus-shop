import { UserState } from '.';

import { ShortUser } from '@/interfaces';

type UserActionType =
  | { type: '[User] - Login user', payload: ShortUser }

export const userReducer = (state: UserState, action: UserActionType): UserState => {
  switch (action.type) {
    case '[User] - Login user':
      return { ...state, }

    default:
      return state
  }
}