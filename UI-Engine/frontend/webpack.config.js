const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  entry: "./src/index",
  mode: "development",
  output: {
    // publicPath: "http://localhost:4026/",
    // publicPath: "https://frontend.eunimart.com/remote/",
    publicPath: process.env.PUBLIC_PATH,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 4026,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "Remote",
      filename: "moduleEntry.js",
      exposes: {
        "./App": "./src/App",
        "./MatInput": "./src/widgets/MatInput",
        "./MatDropDown": "./src/widgets/MatSelect",
        "./MatCheckBox": "./src/widgets/MatCheckbox",
        "./MatRadioButton": "./src/widgets/MatRadio",
        "./MatMenu": "./src/widgets/Menu",
        "./MatAccordion": "./src/widgets/Accordion1",
        "./MatNotificationBadge": "./src/widgets/NotificationBadge",
        "./MatStatusBadge": "./src/widgets/StatusBadge",
        "./MatTag": "./src/widgets/Tag",
        "./MatCloseChip": "./src/widgets/CloseChip",
        "./MatAvatarChip": "./src/widgets/AvatarChip",
        "./MatAvatarCloseChip": "./src/widgets/AvatarCloseChip",
        "./MatBasicButton": "./src/widgets/BasicButton",
        "./MatIconButton": "./src/widgets/IconButton",
        "./MatProgressBar": "./src/widgets/ProgressBar",
        "./MatDivider": "./src/widgets/Divider1",
        "./MatRichTextEditor": "./src/widgets/RichTextEditor",
        "./MatCustomSeparator": "./src/widgets/CustomSeparator",
        "./EmailFormat": "./src/widgets/EmailFormat",
        "./ContactFormat": "./src/widgets/ContactFormat",
        "./Priority": "./src/widgets/Priority",
        "./Rating": "./src/widgets/Rating",
        "./ToolTip": "./src/widgets/ToolTip",
        "./ListIcon": "./src/widgets/ListIcon",
        "./ViewTextField": "./src/widgets/LabeledText",
        "./DynamicTable": "./src/widgets/DynamicTable",
        "./DynamicAppBar": "./src/widgets/DynamicAppBar",
        "./ViewBox": "./src/widgets/ViewBox",
        "./ViewBox_Table": "./src/widgets/ViewBox_Table",
        "./AddForm": "./src/widgets/AddForm",
        "./AddForm1": "./src/widgets/AddForm1",
        "./AddForm_Table": "./src/widgets/AddForm_Table",
        "./AddFormFooter": "./src/widgets/AddFormFooter",
        "./AddFormFooter_Button": "./src/widgets/AddFormFooter_Button",
        "./ModalViewV2": "./src/widgets/ModalView",
        "./ModalView_Table": "./src/widgets/ModalView_Table",
        "./AddressCard": "./src/widgets/AddressCard",
        "./ProfileForm": "./src/widgets/ProfileForm",
        "./Card": "./src/widgets/Card",
        "./InputOnboarding": "./src/widgets/InputOnboarding",
        "./AppCards": "./src/widgets/AppCards",
        "./SingleFileUpload": "./src/widgets/SingleFileUpload",
        "./Breadcrumbs": "./src/widgets/BasicBreadcrumbs",
        "./Rating": "./src/widgets/Rating",
      },
      remotes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};



/*
 Copyright (C) 2022 Eunimart Omnichannel Pvt Ltd. (www.eunimart.com)
 All rights reserved.
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/