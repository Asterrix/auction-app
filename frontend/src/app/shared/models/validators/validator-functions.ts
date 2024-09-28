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
