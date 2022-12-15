import { Radio } from "components";
export default {
  title: "SayIt_app/Radio",
  component: Radio,
};

export const SampleRadio = (args) => <Radio {...args} />;

SampleRadio.args = {
  label: "Radio",
  shape: "CircleBorder10",
  variant: "OutlineBluegray100",
  size: "sm",
  inputClassName: "mr-1",
};
