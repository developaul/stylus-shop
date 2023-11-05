
interface GetFullNameArgs {
  firstName: string
  lastName: string
}

export const getFullName = ({ firstName, lastName }: GetFullNameArgs) => {
  return [firstName, lastName]
    .filter(Boolean)
    .join(' ')
}