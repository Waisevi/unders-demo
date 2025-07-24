/* eslint-disable  */
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
};

export const MaskedInput = forwardRef<HTMLInputElement, CustomProps>(
  function MaskedInput(props, ref) {
    const { onChange, mask, name, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask={mask}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name, value } })}
        overwrite
      />
    );
  },
);
