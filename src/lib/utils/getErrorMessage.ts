import { ErrorList } from '../../@types';

export default function getErrorMessage(
  msg: string,
  ...args: string[]
): string {
  const messageErrorList: ErrorList = {
    unknown:
      'The server has encountered a situation it does not know how to handle.',
    empty: `The ${args[0]} field cannot be null`,
    type: `The type of the ${args[0]} field must be ${args[1]}`,
    length: `The ${args[0]} field must be between ${args[1]} and ${args[2]} letters`,
    validation: `The ${[0]} field was not validated, check again and ensure it matches what was requested`,
    insufficient: `The ${args[0]} cannot go below zero`,
  };
  const messageErrorArray = Object.entries(messageErrorList);
  const [filtedError] = messageErrorArray.filter(([key]) => key === msg);
  return filtedError[1];
}
