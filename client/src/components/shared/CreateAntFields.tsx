import React from 'react';
import { DatePicker, Form, Input, TimePicker, Select } from 'antd';

const { Option } = Select;

const CreateAntField = (AntComponent: any) => ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  type,
  ...props
}: any) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }: any) =>
    form.setFieldValue(field.name, value);
  const onChange = (value: any) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className="field-container">
      <Form.Item
        label={label}
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? 'error' : 'success'}
      >
        <AntComponent
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
        >
          {selectOptions &&
            selectOptions.map((name: string) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
        </AntComponent>
      </Form.Item>
    </div>
  );
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntInputPassword = CreateAntField(Input.Password);
export const AntTimePicker = CreateAntField(TimePicker);
