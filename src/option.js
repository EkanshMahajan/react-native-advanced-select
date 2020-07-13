import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10
  }
});

class Option extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { optionContainerStyle, optionNumberOfLines, optionTextStyle, optionText } = this.props;

    return (
      <View style={[styles.container, optionContainerStyle]}>
        <Text numberOfLines={optionNumberOfLines} style={optionTextStyle}>{optionText}</Text>
      </View>
    );
  }
}

Option.propTypes = {
  optionText: PropTypes.string,
  optionTextStyle: PropTypes.object,
  optionContainerStyle: PropTypes.object,
  optionNumberOfLines: PropTypes.number
};

Option.defaultProps = {
  optionText: '',
  optionTextStyle: {},
  optionContainerStyle: {},
  optionNumberOfLines: 1
}

module.exports = Option;
