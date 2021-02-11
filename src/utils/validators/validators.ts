export type FieldValidatorType = (value: string) => string | undefined;

export const requiredField: FieldValidatorType = (value) => {
    if (value) {
        return undefined;
    } else {
        return "Field is required";
    }
};

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    } else {
        return undefined;
    }
};

export const maxLength30 = (value: string): string | undefined => {
    if (value && value.length > 30) {
        return "Max length 30 symbols"
    } else {
        return undefined;
    }
};