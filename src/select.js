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
      optionContainerStyle,
      optionTextStyle,
      search,
      keyExtractor,
      labelExtractor,
      selectedKey,
      disabled,
      disabledTextStyle,
      optionNumberOfLines,
      placeholder,
      placeholderTextStyle,
      showCustomRightIconView,
      customRightIconView,
      selectedRowStyle
    } = this.props;

    const widthForView = (this.state.viewWidth) ? this.state.viewWidth : width
    const dimensions = { width: widthForView, height };

    const selectedItem = data.find(item => keyExtractor(item) === selectedKey)
    const selectedItemLabel = `${labelExtractor(selectedItem)}` || ''

    return (
      <View onLayout={event => {
        const layoutWidth = (event && event.nativeEvent && event.nativeEvent.layout && event.nativeEvent.layout.width)
          ? event.nativeEvent.layout.width : width
        this.setState({ viewWidth: layoutWidth })
      }}>
        <View
          pointerEvents={disabled ? "none" : "auto"}
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
                <Option
                  optionNumberOfLines={optionNumberOfLines}
                  style={optionContainerStyle}
                  optionTextStyle={selectedItem
                    ? disabled ? { ...optionTextStyle, ...disabledTextStyle } : optionTextStyle
                    : placeholderTextStyle
                  }
                  optionText={selectedItem ? selectedItemLabel : placeholder}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback onPress={this._onPress.bind(this)} style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
                {
                  (showCustomRightIconView && customRightIconView) ? (
                    customRightIconView()
                  ) : (
                    <Icon
                      name="md-arrow-dropdown"
                      style={{
                        color: "grey",
                        fontSize: 24,
                        marginRight: 5
                      }}
                    />
                  )
                }
            </View>
          </TouchableWithoutFeedback>
        </View>
        {this.state.show_options && (
          <Items
            items={search ? data.filter(item => {
              const parts = this.state.search_text.trim().split(/[ \-:]+/);
              const regex = new RegExp(`(${parts.join("|")})`, "ig");
              const label = `${labelExtractor(item)}` || ''
              return regex.test(label);
            }) : data}
            value={selectedItemLabel}
            search={search}
            show={this.state.show_options}
            width={widthForView}
            height={height}
            location={this.state.location}
            onItemPress={this._handleSelect.bind(this)}
            handleClose={this._handleOptionsClose.bind(this)}
            onChangeText={this._onChangeInput.bind(this)}
            placeholder={this.props.searchPlaceholder}
            selectedKey={selectedKey}
            keyExtractor={keyExtractor}
            labelExtractor={labelExtractor}
            optionNumberOfLines={optionNumberOfLines}
            optionTextStyle={optionTextStyle}
            selectedRowStyle={selectedRowStyle}
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
  style: PropTypes.object,
  optionTextStyle: PropTypes.object,
  optionContainerStyle: PropTypes.object,
  selectedKey: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  keyExtractor: PropTypes.func,
  labelExtractor: PropTypes.func,
  disabled: PropTypes.bool,
  disabledTextStyle: PropTypes.object,
  optionNumberOfLines: PropTypes.number,
  placeholder: PropTypes.string,
  placeholderTextStyle: PropTypes.object,
  showCustomRightIconView: PropTypes.bool,
  customRightIconView: PropTypes.func,
  selectedRowStyle: PropTypes.object
};

Select.defaultProps = {
  width: 200,
  height: 40,
  onSelect: (item, index) => {},
  search: false,
  style: {},
  optionTextStyle: {},
  optionContainerStyle: {},
  selectedKey: '',
  placeholder: "Select",
  searchPlaceholder: "Search",
  keyExtractor: (item) => item.key || '',
  labelExtractor: (item) => item.label || '',
  disabled: false,
  disabledTextStyle: { color: 'lightgrey' },
  optionNumberOfLines: 1,
  placeholderTextStyle: {},
  showCustomRightIconView: false,
  customRightIconView: null,
  selectedRowStyle: { backgroundColor: '#D1D1D6FF' }
};

module.exports = Select;
