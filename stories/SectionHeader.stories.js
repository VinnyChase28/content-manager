import SectionHeader from "../components/SectionHeader/SectionHeader";

export default {
  title: "SectionHeader",
  component: SectionHeader,
  argTypes: {},
};

const Template = (args) => <SectionHeader {...args} />;

export const SectionHeaderPinkPopular = Template.bind({});

SectionHeaderPinkPopular.args = {
  label: "Popular",
};

export const SectionHeaderPinkTopRated = Template.bind({});

SectionHeaderPinkTopRated.args = {
  label: "Top Rated",
};

export const SectionHeaderPinkUpcoming = Template.bind({});

SectionHeaderPinkUpcoming.args = {
  label: "Upcoming",
};
