import Button from "../components/Button/Button";

export default {
  title: "Button",
  component: Button,
  argTypes: { handleClick: { action: "handleClick" } },
};

const Template = (args) => <Button {...args} />;

export const Pink = Template.bind({});

Pink.args = {
  backgroundColor: "pink",
  label: "Press Me",
  size: "sm",
  
};

export const PinkMedium = Template.bind({});

PinkMedium.args = {
  backgroundColor: "pink",
  label: "Press Me",
  size: "md",
};

export const PinkLarge = Template.bind({});

PinkLarge.args = {
  backgroundColor: "pink",
  label: "Press Me",
  size: "lg",
};
