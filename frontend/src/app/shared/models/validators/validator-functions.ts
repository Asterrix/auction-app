import {FormGroup} from "@angular/forms";

export function minLengthFn(input: string, length: number): boolean {
  return input.length < length;
}

export function maxLengthFn(input: string, length: number): boolean {
  return input.length > length;
}

export function isEmptyFn(input: string): boolean {
  return input === null || input.length === 0;
}

export function isMadeUpOfLettersFn(input: string): boolean {
  return !/^[a-zA-Z\s]+$/.test(input);
}

export function isFieldValidFn(formGrout: FormGroup, fieldName: string, errorType: string): boolean {
  const field = formGrout.get(fieldName);
  return !!field?.dirty && field?.hasError(errorType);
}


export function containsUppercaseCharacterFn(input: string): boolean {
  return /[A-Z]/.test(input);
}

export function containsLowercaseCharacterFn(input: string): boolean {
  return /[a-z]/.test(input);
}

export function containsSpecialCharacterFn(input: string): boolean {
  return /[#$@!%&*?]/g.test(input);
}

export function containsNumberFn(input: string): boolean {
  return /[0-9]/.test(input);
}

export function containsWhiteSpacesFn(input: string): boolean {
  return /\s/.test(input);
}
