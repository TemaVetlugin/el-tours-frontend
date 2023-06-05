import { useState } from "react";

import { ValidationResultType, ValidationValidatorType } from "shared/validations/types";

export function useValidation<_Entry,
    EntryKey extends keyof Entry,
    RulesKey extends keyof Rules,
    Entry extends Omit<_Entry, 'set' | 'reset' | 'update' | 'handleChange'>,
    Rules = Partial<Record<EntryKey, ValidationValidatorType | ValidationValidatorType[]>>,
    Transformers = Partial<Record<RulesKey, (value: any) => any>>,
    Result = Record<RulesKey, ValidationResultType> & { isValid: boolean, submit: () => void }>
(entry: _Entry, rules: Rules, transformers?: Transformers, withErrors = false): Result {
    const [enableErrors, setEnableErrors] = useState(withErrors);
    const validationResults: { [key: string]: any } = {
        isValid: true,
        submit: () => {
            setEnableErrors(true);
        }
    };
    const values = entry as any as { [key: string]: any };
    const validationRules = rules as any as { [key: string]: ValidationValidatorType[] };
    const validationTransformers = (transformers || {}) as any as { [key: string]: (value: any) => any };

    for (const key in validationRules) {
        let value = values[key];
        const validationResult = {
            isValid: true,
            isError: false,
            errorMessage: ''
        }
        if (value === undefined) {
            validationResult.isValid = false;
            validationResult.isError = true;
            validationResult.errorMessage = 'Значение не определено';
        } else {
            const transformer = validationTransformers[key];
            if (!!transformer) {
                value = transformer(value)
            }
            const rules: ValidationValidatorType[] = Array.isArray(validationRules[key])
                ? validationRules[key]
                : ([validationRules[key]] as any as ValidationValidatorType[]);
            rules?.forEach(validationRule => {
                if (validationResult.isValid) {
                    const validationResponse = validationRule(value);
                    validationResult.isValid = validationResponse === true;
                    validationResult.isError = typeof validationResponse === 'string';
                    validationResult.errorMessage = (typeof validationResponse === 'string' && enableErrors) ? validationResponse : '';
                }
            })
        }
        validationResults[key] = validationResult;
        if (validationResults.isValid && !validationResult.isValid) {
            validationResults.isValid = false;
        }
    }

    return validationResults as Result;
}

