import { Controller, Control } from "react-hook-form";
import { Platform, StyleSheet } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { makeStyles, Text } from "@rneui/themed";
import { sizing } from "@/shared/providers/ThemeProvider";
import { moderateScale } from "react-native-size-matters";

type NumberInputFieldType = {
  mobile: string;
};
interface NumberInputProps {
  control: Control<NumberInputFieldType>;
}

const NumberInput = ({ control }: NumberInputProps) => {
  const styles = useStyles();

  return (
    <Controller
      control={control}
      name="mobile"
      rules={{
        required: "This is a required field",
      }}
      render={({ field, fieldState: { error } }) => {
        const hasErrors = !!error ? styles.inputError : {};
        return (
          <>
            <PhoneInput
              defaultCode="US"
              onChangeFormattedText={field.onChange}
              containerStyle={[styles.inputContainer, hasErrors]}
              textInputStyle={styles.inputStyle}
              textContainerStyle={styles.inputTextContainer}
              codeTextStyle={{
                bottom: Platform.OS === "android" ? moderateScale(3, 0.25) : 0,
              }}
              countryPickerProps={{
                countryCodes: ["US", "CA", "PH"],
              }}
            />
            {!!error && <Text style={styles.errorText}>{error.message}</Text>}
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
    color: theme.colors.error,
    marginVertical: theme.spacing.sm,
    fontSize: sizing.FONT.sm,
  },
}));

export default NumberInput;
