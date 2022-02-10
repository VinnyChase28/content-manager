import PropTypes from "prop-types";

function SectionHeader({ label }) {
  const style = {
    color: "black",
    padding: "20px",
    marginLeft: "100px",
  };
  return <h1 style={style}>{label}</h1>;
}

SectionHeader.propTypes = {
  label: PropTypes.string,
};

export default SectionHeader;
