export function getFieldProps<
	FormDataType,
	FormErrorType,
	KeyType extends keyof FormDataType & keyof FormErrorType
>(
	data: {
		formData: FormDataType;
		setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
		setFormErrors: React.Dispatch<React.SetStateAction<FormErrorType>>;
	},
	key: KeyType
): {
	name: KeyType;
	value: FormDataType[KeyType];
	onChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
} {
	return {
		name: key,
		value: data.formData[key],
		onChange: (event) => {
			data.setFormErrors((previous) => {
				const current = { ...previous };
				delete current[key];
				return current;
			});
			data.setFormData((previous) => ({
				...previous,
				[key]: event.target.value,
			}));
		},
	};
}
