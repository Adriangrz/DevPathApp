import React, {useState} from 'react';
import CheckBox, {CheckBoxProps} from '@react-native-community/checkbox';

interface CheckBoxComponentProps extends CheckBoxProps {
  onCheckBoxPress: (isChecked: boolean) => void;
  checkBoxTestId: string;
  isChecked: boolean;
}

export const CheckBoxComponent = ({
  onCheckBoxPress,
  checkBoxTestId,
  isChecked,
  ...props
}: CheckBoxComponentProps): JSX.Element => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(isChecked);
  return (
    <>
      {/* @ts-ignore */}
      <CheckBox
        testID={checkBoxTestId}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue: boolean) => {
          setToggleCheckBox(newValue);
          onCheckBoxPress(newValue);
        }}
        {...props}
      />
    </>
  );
};
