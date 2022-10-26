import { Controller, Control } from "react-hook-form";
import { StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Text } from "@rneui/themed";

type NumberInputFieldType = {
  mobile: string;
};
interface NumberInputProps {
  control: Control<NumberInputFieldType>;
  //   errors: Control<NumberInputFieldType>["_formState"]["errors"];
}

const NumberInput = ({ control }: NumberInputProps) => {
  const { errors } = control._formState;
  return (
    <Controller
      control={control}
      name="mobile"
      rules={{
        required: "This is a required field",
      }}
      render={({ field }) => {
        const hasErrors = !!errors.mobile ? styles.inputError : {};
        return (
          <>
            <PhoneInput
              {...field}
              defaultCode="US"
              onChangeFormattedText={field.onChange}
              containerStyle={[styles.inputContainer, hasErrors]}
              textContainerStyle={styles.inputTextContainer}
            />
            {!!errors.mobile && (
              <Text style={styles.errorText}>{errors.mobile.message}</Text>
            )}
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    borderRadius: 10,
    padding: 0,
    borderWidth: 1,
    borderColor: "#fff",
  },
  inputTextContainer: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 0,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    textAlign: "right",
    color: "red",
    marginVertical: 4,
    fontSize: 12,
  },
});

export default NumberInput;
