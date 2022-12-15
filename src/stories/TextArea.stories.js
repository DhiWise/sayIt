import { TextArea } from "components";
export default {
  title: "SayIt_app/TextArea",
  component: TextArea,
};

export const SampleTextarea = (args) => <TextArea {...args} />;

SampleTextarea.args = {
  shape: "RoundedBorder6",
  variant: "OutlineBluegray100",
  size: "sm",
  placeholder: "placeholder",
};
