import { CheckBox } from "components";
export default {
  title: "SayIt_app/CheckBox",
  component: CheckBox,
};

export const SampleCheckbox = (args) => <CheckBox {...args} />;

SampleCheckbox.args = {
  label: "Checkbox",
  shape: "RoundedBorder4",
  variant: "OutlineBluegray100",
  size: "sm",
  inputClassName: "mr-1",
};
