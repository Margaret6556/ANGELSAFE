import useIsDark from "@/shared/hooks/useIsDark";
import { useTraceUpdate } from "@/shared/hooks/useTraceUpdate";
import { sizing } from "@/shared/providers/ThemeProvider";
import { useTheme, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import MultiSelect, { MultiSelectProps } from "react-native-multiple-select";
import { moderateScale, scale } from "react-native-size-matters";

interface CustomMultiSelectProps extends MultiSelectProps {
  label?: string;
}

const CustomMultiSelect = React.forwardRef<MultiSelect, CustomMultiSelectProps>(
  (props, ref) => {
    const { theme } = useTheme();
    const isDark = useIsDark();
    useTraceUpdate(props);
    return (
      <View>
        <Text
          style={{
            color: isDark ? theme.colors.grey1 : theme.colors.primary,
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          {props.label}
        </Text>
        <MultiSelect
          ref={ref}
          {...props}
          // hideTags
          selectedItemTextColor={theme.colors.primary}
          selectedItemIconColor={theme.colors.primary}
          tagRemoveIconColor={theme.colors.error}
          tagBorderColor={theme.colors.secondary}
          tagTextColor={theme.colors.primary}
          selectedItemFontFamily="nunitoRegular"
          styleMainWrapper={{
            paddingBottom: theme.spacing.xs,
            marginBottom: theme.spacing.lg,
          }}
          styleInputGroup={{
            backgroundColor: theme.colors.background,
            height: moderateScale(50),
            borderTopLeftRadius: sizing.BORDER_RADIUS,
            borderTopRightRadius: sizing.BORDER_RADIUS,
          }}
          styleDropdownMenu={{
            height: sizing.BUTTON,
          }}
          itemTextColor={theme.colors.grey1}
          textInputProps={{
            style: {
              fontFamily: "nunitoRegular",
              fontSize: sizing.FONT.md,
              flex: 1,
            },
          }}
          styleDropdownMenuSubsection={{
            borderRadius: sizing.BORDER_RADIUS,
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.white,
          }}
          styleTextDropdownSelected={{
            paddingLeft: theme.spacing.lg,
            fontSize: sizing.FONT.sm,
            color: theme.colors.grey0,
          }}
          styleTextDropdown={{
            paddingLeft: theme.spacing.lg,
            fontFamily: "nunitoRegular",
            color: theme.colors.grey0,
            fontSize: sizing.FONT.md,
          }}
          styleRowList={{
            paddingVertical: theme.spacing.xs,
          }}
          styleItemsContainer={{
            borderBottomEndRadius: sizing.BORDER_RADIUS,
            borderBottomLeftRadius: sizing.BORDER_RADIUS,
            backgroundColor: theme.colors.white,
          }}
          itemFontFamily="nunitoRegular"
          submitButtonColor={theme.colors.primary}
          submitButtonText="Confirm"
          hideDropdown
          hideSubmitButton
        />
      </View>
    );
  }
);

export default CustomMultiSelect;
