import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

type CustomProps = {
  mask: string;
  name: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
};

export const MaskedInput = forwardRef<HTMLInputElement, CustomProps>(
  function MaskedInput(props, ref) {
    const { mask, name, onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        inputRef={ref}
        mask={mask}
        onAccept={(value: any) => onChange({ target: { name, value } })}
        overwrite
      />
    );
  },
);
