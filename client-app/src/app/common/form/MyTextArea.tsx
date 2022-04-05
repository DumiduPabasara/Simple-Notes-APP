import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  rows: number;
  label?: string;
}

export default function MyTextArea(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    // `!!` use to cast to billion to see whether exist or not
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
