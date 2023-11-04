import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup'
import '@/servicos/validation/yupTranslation'

type TValidation = 
<T extends Maybe<AnyObject>>(schema:ObjectSchema<T>,value:T) => Record<string,string> | void

export const ValidationYup:TValidation = (schema,value) => {
	try {
		schema.validateSync(value,{abortEarly:false});
	} catch (err) {
		const yupError = err as ValidationError;
		const errosEncontrados:Record<string,string> = {};

		yupError.inner.forEach(error => {
			if(!error.path) return;
			errosEncontrados[error.path] = error.message;
		});
		return errosEncontrados;
	}	
};