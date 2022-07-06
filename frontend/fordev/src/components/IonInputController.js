import { IonInput } from '@ionic/react';

import { Controller } from 'react-hook-form';

export default function IonInputController({
  name,
  control,
  type,
  placeholder,
}) {
  return (
    <>
      <Controller
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <IonInput
            placeholder={placeholder}
            value={value}
            name={name}
            type={type}
            onIonChange={(e) => onChange(e.detail.value)}
            className="shadow appearance-none border rounded w-full px-3 text-black-700 leading-tight focus:outline-none"
          ></IonInput>
        )}
        name={name}
        control={control}
        defaultValues={null}
      />
    </>
  );
}
