import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Overlay = require("./overlay");
const Option = require("./option");

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    borderColor: "#BDBDC1",
    borderWidth: 2 / window.scale,
    backgroundColor: "white",
    opacity: 0.9
  }
});

class Items extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      items,
      onItemPress,
      width,
      height,
      location,
      show,
      handleClose,
      onChangeText,
      placeholder,
      search,
      value,
      labelExtractor,
      keyExtractor,
      selectedKey
    } = this.props;
    let x = 0;
    let y = 0;
    if (location) {
      x = location.fx;
      y = location.fy;
    }

    const renderedItems = items.map((item, idx) => {
      const isSelected = (keyExtractor(item) === selectedKey) || false
      const itemLabel = `${labelExtractor(item)}` || ''
      return item.section ? (
        <View style={{ padding: 5 }} key={idx}>
          <Text style={{ fontWeight: "bold" }}>{itemLabel}</Text>
        </View>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => onItemPress(item, idx)}
          key={idx}
        >
          <View style={[{ padding: 5 }, isSelected && { backgroundColor: '#D1D1D6FF'}]}>
            <Text style={{ marginLeft: 5 }}>{itemLabel}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={show}
        onRequestClose={handleClose}
      >
        <Overlay onOverlayPress={handleClose} />
        <View style={[styles.container, { left: x, top: y }]}>
          <TouchableWithoutFeedback onPress={handleClose}>
            <View
              style={{
                height: height,
                borderBottomColor: "#BDBDC1",
                borderBottomWidth: 2 / window.scale
              }}
            >
              {
                search ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Icon
                      name="ios-search"
                      style={{
                        color: "black",
                        fontSize: 26,
                        marginLeft: 5,
                        flex: 1
                      }}
                    />
                    <TextInput
                      onChangeText={onChangeText}
                      placeholder={placeholder}
                      underlineColorAndroid="transparent"
                      style={{ flex: 5, margin: 0, padding: 0 }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center"
                    }}
                  >
                    <Option optionText={value} />
                  </View>
                )
              }
            </View>
          </TouchableWithoutFeedback>
          <ScrollView
            style={{ width: width - 2, height: height * 3 }}
            automaticallyAdjustContentInsets={false}
            bounces={false}
          >
            {renderedItems}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

Items.propTypes = {
  onItemPress: PropTypes.func,
  search: PropTypes.bool,
  value: PropTypes.string,
  labelExtractor: PropTypes.func,
  keyExtractor: PropTypes.func,
  selectedKey: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
};

Items.defaultProps = {
  width: 0,
  height: 0,
  onItemPress: () => {},
  search: false,
  value: '',
  keyExtractor: (item) => item.key || '',
  labelExtractor: (item) => item.label || '',
  selectedKey: ''
};

module.exports = Items;
