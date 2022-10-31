import useDarkMode from "@/shared/hooks/useDarkMode";
import { StyleConstants } from "@/shared/styles";
import { useTheme, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import MultiSelect, { MultiSelectProps } from "react-native-multiple-select";

interface CustomMultiSelectProps extends MultiSelectProps {
  label?: string;
}

const CustomMultiSelect = React.forwardRef<MultiSelect, CustomMultiSelectProps>(
  (props, ref) => {
    const { theme } = useTheme();
    const isDark = useDarkMode();
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
            paddingBottom: 4,
            marginBottom: 24,
          }}
          styleInputGroup={{
            backgroundColor: theme.colors.background,
            height: 50,
            borderTopLeftRadius: StyleConstants.PADDING_HORIZONTAL / 2,
            borderTopRightRadius: StyleConstants.PADDING_HORIZONTAL / 2,
          }}
          styleDropdownMenu={{
            height: StyleConstants.BUTTON_HEIGHT,
          }}
          itemTextColor={theme.colors.grey1}
          textInputProps={{
            style: {
              fontFamily: "nunitoRegular",
              flex: 1,
            },
          }}
          styleDropdownMenuSubsection={{
            borderRadius: StyleConstants.PADDING_HORIZONTAL / 2,
            backgroundColor: theme.colors.white,
            borderColor: theme.colors.white,
          }}
          styleTextDropdownSelected={{
            paddingLeft: StyleConstants.PADDING_HORIZONTAL / 2,
          }}
          styleTextDropdown={{
            paddingLeft: StyleConstants.PADDING_HORIZONTAL / 2,
            fontFamily: "nunitoRegular",
            color: theme.colors.grey0,
          }}
          styleListContainer={{}}
          styleSelectorContainer={{}}
          styleRowList={{
            paddingVertical: 4,
          }}
          searchInputStyle={{}}
          styleItemsContainer={{
            borderBottomEndRadius: StyleConstants.PADDING_HORIZONTAL / 2,
            borderBottomLeftRadius: StyleConstants.PADDING_HORIZONTAL / 2,
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
