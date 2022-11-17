import { Controller, Control } from "react-hook-form";
import { StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { makeStyles, Text } from "@rneui/themed";
import { sizing } from "@/shared/providers/ThemeProvider";

type NumberInputFieldType = {
  mobile: string;
};
interface NumberInputProps {
  control: Control<NumberInputFieldType>;
}

const NumberInput = ({ control }: NumberInputProps) => {
  const styles = useStyles();
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
              textInputStyle={styles.inputStyle}
              textContainerStyle={styles.inputTextContainer}
              countryPickerProps={{
                countryCodes: ["US", "CA", "PH"],
              }}
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

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    width: "100%",
    borderRadius: sizing.BORDER_RADIUS,
    padding: 0,
    borderWidth: 1,
    borderColor: theme.colors.background,
    height: sizing.BUTTON,
  },
  inputTextContainer: {
    borderTopRightRadius: sizing.BORDER_RADIUS,
    borderBottomRightRadius: sizing.BORDER_RADIUS,
    padding: 0,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  inputStyle: {
    fontSize: sizing.FONT.md,
  },
  errorText: {
    textAlign: "right",
    color: "red",
    marginVertical: theme.spacing.sm,
    fontSize: sizing.FONT.sm,
  },
}));

export default NumberInput;
