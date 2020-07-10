import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Option = require("./option");
const Items = require("./items");

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    borderColor: "#BDBDC1",
    borderWidth: 2 / window.scale
  }
});

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.pageX = 0;
    this.pageY = 0;
    this.state = {
      show_options: false,
      search_text: ""
    };
  }

  _reset() {
    this.setState({ show_options: false, search_text: "" });
    this.props.onSelect(null, null);
    if (this.props.parentScrollEnable) {
      this.props.parentScrollEnable();
    }
  }

  _onPress() {
    this._select.measure((width, height, px, py, fx, fy) => {
      const location = {
        fx: fx,
        fy: fy,
        px: px,
        py: py,
        width: width,
        height: height
      };
      this.setState({ location });
    });
    if (this.state.show_options) {
      this.setState({ show_options: false, search_text: "" });
    } else {
      this.setState({ show_options: true });
      if (this.props.parentScrollDisable) {
        this.props.parentScrollDisable();
      }
    }
  }

  _handleSelect(item, index) {
    const { onSelect, parentScrollEnable } = this.props
    this.setState({ show_options: false, search_text: "" });
    if (onSelect) {
      onSelect(item, index);
    }
    if (parentScrollEnable) {
      parentScrollEnable();
    }
  }

  _onChangeInput(text) {
    this.setState({ search_text: text });
  }

  _handleOptionsClose() {
    this.setState({
      show_options: false,
      search_text: ""
    });
    if (this.props.parentScrollEnable) {
      this.props.parentScrollEnable();
    }
  }

  render() {
    const {
      width,
      height,
      data,
      style,
      styleOption,
      styleText,
      search,
      keyExtractor,
      labelExtractor,
      selectedKey
    } = this.props;
    const dimensions = { width, height };
    const selectedItem = data.find(item => keyExtractor(item) === selectedKey)
    const selectedItemLabel = labelExtractor(selectedItem) || ''

    return (
      <View>
        <View
          ref={ref => {
            this._select = ref;
          }}
          style={[
            styles.container,
            style,
            dimensions,
            { flexDirection: "row", justifyContent: "space-between" }
          ]}
        >
          {!this.state.show_options && (
            <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
              <View
                style={{
                  flex: 3
                }}
              >
                <Option style={styleOption} styleText={styleText} optionText={selectedItemLabel} />
              </View>
            </TouchableWithoutFeedback>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
              <Icon
                name="md-arrow-dropdown"
                style={{
                  color: "grey",
                  fontSize: 24,
                  marginRight: 5
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        {this.state.show_options && (
          <Items
            items={search ? data.filter(item => {
              const parts = this.state.search_text.trim().split(/[ \-:]+/);
              const regex = new RegExp(`(${parts.join("|")})`, "ig");
              const label = labelExtractor(item) || ''
              return regex.test(label);
            }) : data}
            value={selectedItemLabel}
            search={search}
            show={this.state.show_options}
            width={width}
            height={height}
            location={this.state.location}
            onItemPress={this._handleSelect.bind(this)}
            handleClose={this._handleOptionsClose.bind(this)}
            onChangeText={this._onChangeInput.bind(this)}
            placeholder={this.props.searchPlaceholder}
            selectedKey={selectedKey}
            keyExtractor={keyExtractor}
            labelExtractor={labelExtractor}
          />
        )}
      </View>
    );
  }
}

Select.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  onSelect: PropTypes.func,
  search: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  selectedKey: PropTypes.oneOf([ PropTypes.string, PropTypes.number ]),
  keyExtractor: PropTypes.func,
  labelExtractor: PropTypes.func
};

Select.defaultProps = {
  width: 200,
  height: 40,
  onSelect: () => {},
  search: false,
  selectedKey: '',
  placeholder: "Select",
  searchPlaceholder: "Search",
  keyExtractor: (item) => item.key || '',
  labelExtractor: (item) => item.label || '',
};

module.exports = Select;
