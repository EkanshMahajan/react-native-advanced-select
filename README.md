# react-native-advanced-select

> Simple select component with in-built search for React-Native.

## Demo

<img src="https://raw.githubusercontent.com/EkanshMahajan/react-native-advanced-select/master/demo/Example-iOS.gif">

## Installation

```bash
$ npm install git+https://github.com/EkanshMahajan/react-native-advanced-select.git --save
```

or use yarn

```bash
$ yarn add https://github.com/EkanshMahajan/react-native-advanced-select
```

## Usage

Note: Ensure to add and configure [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) to your project before using this package.

The snippet below shows how the component can be used:

```javascript
import React from 'react';
import { View, Text } from 'react-native';
import Select from 'react-native-advanced-select';

class SelectExample extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      selecteKey: '',
      items: [
        { myKey: 1, myLabel: "Fruits" },
        { myKey: 2, myLabel: "Red Apples" },
        { myKey: 3, myLabel: "Cherries" },
        { myKey: 4, myLabel: "Cranberries" },
        { myKey: 5, myLabel: "Pink Grapefruit" },
        { myKey: 6, myLabel: "Raspberries" },
        { myKey: 7, myLabel: "Vegetables" },
        { myKey: 8, myLabel: "Beets" },
        { myKey: 9, myLabel: "Red Peppers" },
        { myKey: 10, myLabel: "Radishes" },
        { myKey: 11, myLabel: "Radicchio" },
        { myKey: 12, myLabel: "Red Onions" },
        { myKey: 13, myLabel: "Red Potatoes" },
        { myKey: 14, myLabel: "Rhubarb" },
        { myKey: 15, myLabel: "Tomatoes" }
      ];
    };
  }

  onSelectedItemsChange = (item, index) => {
    const key = item.myKey
    this.setState({ selectedKey: key });
  };

  render() {
    const { selectedKey, items } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Select
          selectedKey={selectedKey}
          data={items}
          width={250}
          placeholder="Select a value ..."
          onSelect={this.onSelectedItemsChange.bind(this)}
          search={true}
          keyExtractor={(item) => item.myKey || ''}
          labelExtractor={(item) => item.myLabel || ''}
        />
      </View>
    );
  }
}
```

## Props

|       Prop Name      |     Data Type    |        Default Values        |                                                  Description                                                  |
|:--------------------:|:----------------:|:----------------------------:|:-------------------------------------------------------------------------------------------------------------:|
|       onSelect       |     function     |      (item, index) => {}     | Callback function invoked on option select that takes (selectedOptionItem, selectedOptionindex) as parameters |
|      placeholder     |      string      |            Select            | Text to show as default text                                                                                  |
|   searchPlaceholder  |      string      |            Search            | Text to show as default search text                                                                           |
|         style        |      object      |              {}              | To style the select box                                                                                       |
|    optionTextStyle   |      object      |              {}              | To style the text shown in the box                                                                            |
| optionContainerStyle |      object      |              {}              | To style the options shown                                                                                    |
|        search        |       bool       |             false            | Use search in Component                                                                                       |
|      selectedKey     | string or number |              ""              | Key of the item which is selected whose label will be displayed                                               |
|  parentScrollEnable  |     function     |             null             | Hack for Android nested ScrollView                                                                            |
|  parentScrollDisable |     function     |             null             | Hack for Android nested ScrollView                                                                            |
|     keyExtractor     |     function     |  (item) => item.key \|\| ""  | Function that extracts the key to uniquely identify an item                                                   |
|    labelExtractor    |     function     | (item) => item.label \|\| "" | Function that extracts the label to be displayed for an item                                                  |

The MIT License (MIT). Please see [LICENSE](LICENSE) for more information.
