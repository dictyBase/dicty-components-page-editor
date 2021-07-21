## [3.1.2](https://github.com/dictyBase/dicty-components-page-editor/compare/3.1.1...3.1.2) (2021-07-21)


### Bug Fixes

* use sticky appbar ([d232979](https://github.com/dictyBase/dicty-components-page-editor/commit/d232979eda01d7ecf81de1399d2e3944594a7523))

## [3.1.1](https://github.com/dictyBase/dicty-components-page-editor/compare/3.1.0...3.1.1) (2021-07-21)


### Bug Fixes

* add new node after table wrap, fixes [#852](https://github.com/dictyBase/dicty-components-page-editor/issues/852) ([6d92430](https://github.com/dictyBase/dicty-components-page-editor/commit/6d92430b0a2419c393192081319aade6861615a2))

# [3.1.0](https://github.com/dictyBase/dicty-components-page-editor/compare/3.0.0...3.1.0) (2021-07-21)


### Bug Fixes

* replace default 100% image width/height, fixes [#870](https://github.com/dictyBase/dicty-components-page-editor/issues/870) ([e012f43](https://github.com/dictyBase/dicty-components-page-editor/commit/e012f434e628b4e73bb1e3e0ae961ac0176feb42))


### Features

* add font color button to inline toolbar ([fb16ac7](https://github.com/dictyBase/dicty-components-page-editor/commit/fb16ac72eb80b8da348464bd19fc870c22043e75))

# [3.0.0](https://github.com/dictyBase/dicty-components-page-editor/compare/2.0.0...3.0.0) (2021-07-20)


### Features

* remove data migration script ([43aed3d](https://github.com/dictyBase/dicty-components-page-editor/commit/43aed3db61f87dea9ce52ca1d705cfa01c97d411))


### BREAKING CHANGES

* Slate 0.47 data is no longer converted on the fly.

# [2.0.0](https://github.com/dictyBase/dicty-components-page-editor/compare/1.4.1...2.0.0) (2021-07-19)


### Features

* remove extra console.log ([5aae061](https://github.com/dictyBase/dicty-components-page-editor/commit/5aae06105a9ea5e4aada62a7922141d0f9363cfe))


### BREAKING CHANGES

* This is the correct major release for the new Slate editor using the 0.5x data format.

## [1.4.1](https://github.com/dictyBase/dicty-components-page-editor/compare/1.4.0...1.4.1) (2021-07-19)


### Documentation

* add note about versions with new data format ([90cf89b](https://github.com/dictyBase/dicty-components-page-editor/commit/90cf89bf266e4de976e257445366ad47876a8bc8))


### BREAKING CHANGES

* major release needed for new Slate data format

# [1.4.0](https://github.com/dictyBase/dicty-components-page-editor/compare/1.3.1...1.4.0) (2021-07-19)


### Bug Fixes

* add additional checks for heading types ([dbb6d3d](https://github.com/dictyBase/dicty-components-page-editor/commit/dbb6d3d1847b16aba909657b757f162ba6e393e1))
* add check for body1 type ([7d57903](https://github.com/dictyBase/dicty-components-page-editor/commit/7d579036e2f27800d3b7a763227ddb944e53797d))
* add check for other alignment types ([b7ec51f](https://github.com/dictyBase/dicty-components-page-editor/commit/b7ec51ff6f4a5c64ecb1fb109e321e0db9a737ad))
* add div wrapper to allow image alignment ([2a7e61b](https://github.com/dictyBase/dicty-components-page-editor/commit/2a7e61b9c62b47d85e0ff9a324b7ffc9f008cc6f))
* add extra check for font size dropdown display ([ec879bc](https://github.com/dictyBase/dicty-components-page-editor/commit/ec879bc49aa1a54cbfb29d4454abce780aacb87f))
* add function to remove any invalid objects ([c1ab11b](https://github.com/dictyBase/dicty-components-page-editor/commit/c1ab11b9c35439b7b285c087361771364d24e0f7))
* add logic to clean up nested divs ([934dc13](https://github.com/dictyBase/dicty-components-page-editor/commit/934dc13aa08ac111a27bd57d591e52f57aa74d48))
* add missing return statement ([fbef757](https://github.com/dictyBase/dicty-components-page-editor/commit/fbef75727bebcfb5cdaf65305956c0c5a4c27bb7))
* add missing return statement ([3bfcb15](https://github.com/dictyBase/dicty-components-page-editor/commit/3bfcb15908023c6d11511359c3377f0912465113))
* add more conversions ([8b2551a](https://github.com/dictyBase/dicty-components-page-editor/commit/8b2551af09cb5c825f20f8fcb174653e91ee27bb))
* add necessary config for styleguidist ([12542c4](https://github.com/dictyBase/dicty-components-page-editor/commit/12542c4708430ecb8a47df4868a6040ed82e5e85))
* add return statements after toggling indent ([bf6b355](https://github.com/dictyBase/dicty-components-page-editor/commit/bf6b3552e1397e5125f94ea886878226a6434a7c))
* add type property for non-standard alignments ([0f089fd](https://github.com/dictyBase/dicty-components-page-editor/commit/0f089fd732a1fa2615331f61095b90a14ffa3b4a))
* all font marks can be inherited ([b2e0b5b](https://github.com/dictyBase/dicty-components-page-editor/commit/b2e0b5ba0cce734a939703ada5d6d0385108a8c3))
* change video url data path ([2eebfdb](https://github.com/dictyBase/dicty-components-page-editor/commit/2eebfdb87d7aff3d388311e7d9901f27bd3fbcde))
* check for matching list node for indenting ([c1c5261](https://github.com/dictyBase/dicty-components-page-editor/commit/c1c5261a67d403e8beaaecfc9481595ee437671f))
* clean up logic in lists plugin ([7cb7d84](https://github.com/dictyBase/dicty-components-page-editor/commit/7cb7d8413f547d98a381771a76285cc0db92ef5a))
* commit dist folder ([dc87f82](https://github.com/dictyBase/dicty-components-page-editor/commit/dc87f82245d76a189f65f4ab894d8d8b3ffed973))
* correctly get current link selection ([bb82f21](https://github.com/dictyBase/dicty-components-page-editor/commit/bb82f21704c119b5118665e40b29043124389662))
* default font size should be inherit ([489b7eb](https://github.com/dictyBase/dicty-components-page-editor/commit/489b7ebd54bb30597956b0252d8e30f44ab4f752))
* fix issues with indent/undent functions ([971ec89](https://github.com/dictyBase/dicty-components-page-editor/commit/971ec89cd2ec6f5105a159798efab5ec340f8071))
* fix syntax for switch case ([f27c9f3](https://github.com/dictyBase/dicty-components-page-editor/commit/f27c9f3a45c21df1c133edb430aff68b7639c4f0))
* font color is now inherited ([d1dd40d](https://github.com/dictyBase/dicty-components-page-editor/commit/d1dd40d6b66b0d4d79e5713dfecda802f05a5ffc))
* generate new build ([e216860](https://github.com/dictyBase/dicty-components-page-editor/commit/e216860c766b638e95d835e19390dc01579d5e70))
* get size and name from font lists ([17d78d4](https://github.com/dictyBase/dicty-components-page-editor/commit/17d78d46b099b804c3501a1bc604be8a4036277c))
* handle image links at element rendering level ([e49c4e0](https://github.com/dictyBase/dicty-components-page-editor/commit/e49c4e0b9684687a2a3a4e411be1548d697002f6))
* inherit font size in header element nodes ([421f3d3](https://github.com/dictyBase/dicty-components-page-editor/commit/421f3d320058403334770107bd11ee7bd515b9c1))
* insert text after wrapping with link node ([2698f28](https://github.com/dictyBase/dicty-components-page-editor/commit/2698f284e5fbffd929fa9163e61d0bb1091fa69a))
* leaf should inherit line height ([428b34c](https://github.com/dictyBase/dicty-components-page-editor/commit/428b34c623708ea212cb96513fef29d93a47c04b))
* leaves use inherit variant ([bd9dcad](https://github.com/dictyBase/dicty-components-page-editor/commit/bd9dcade6ad2fe0b49ffb3f3f97ea3a006772fe2))
* move list match logic back into main function ([53c6f16](https://github.com/dictyBase/dicty-components-page-editor/commit/53c6f16ba3bf0579038deed4902fa10d7f957224))
* only display toolbar and action buttons if in readOnly mode ([d34e3b3](https://github.com/dictyBase/dicty-components-page-editor/commit/d34e3b3985a47ceb4f175b6c536ee9776b98bf18))
* remove typography component from leaf ([91c698b](https://github.com/dictyBase/dicty-components-page-editor/commit/91c698baf5edca6261f143f214d5d4cadf6a22f0))
* revert back to conditionals for displaying marks ([1df1b5b](https://github.com/dictyBase/dicty-components-page-editor/commit/1df1b5b3da098209f400230b74532b303e4396c6))
* simplify alignment check ([5a7bdc2](https://github.com/dictyBase/dicty-components-page-editor/commit/5a7bdc2725c83f0ab62e30f54b65001ecc653b71))
* sync dropdown value with current selection ([ca8fe37](https://github.com/dictyBase/dicty-components-page-editor/commit/ca8fe37afe7f05240fd2016a78b1049b7cf89a68))
* text hyperscript can only contain text content ([3d84c79](https://github.com/dictyBase/dicty-components-page-editor/commit/3d84c7979e53837e1b7f53df4f43955dda1278df))
* unwrap lists to allow for toggling ([fc820e6](https://github.com/dictyBase/dicty-components-page-editor/commit/fc820e67b6a2df250c52880989be66d5c6b779cd))
* update col attribute when removing column ([1fc2f2f](https://github.com/dictyBase/dicty-components-page-editor/commit/1fc2f2f20511ce233871406c1ee3677c088c1c7b))
* use camelCase for prop ([248a25d](https://github.com/dictyBase/dicty-components-page-editor/commit/248a25d0126235b43bd36c7827f965079101c761))
* use if/else block ([d4a36d0](https://github.com/dictyBase/dicty-components-page-editor/commit/d4a36d0f19076465f7b0940dcb0b6127d142aeb1))
* use onMouseDown to avoid losing cursor position ([4699465](https://github.com/dictyBase/dicty-components-page-editor/commit/469946569a278e8960295411103640ff09c6c83f))


### Features

* accept mui theme as prop, fixes [#836](https://github.com/dictyBase/dicty-components-page-editor/issues/836) ([919276c](https://github.com/dictyBase/dicty-components-page-editor/commit/919276c69c2e029affc91e98029082f5761aadbd))
* add action buttons to get editor value ([d55042a](https://github.com/dictyBase/dicty-components-page-editor/commit/d55042a564c35337107345666f4aefabd95cb8f5))
* add alignment icons ([4a7ba0b](https://github.com/dictyBase/dicty-components-page-editor/commit/4a7ba0b9a67908755d93c92175f58ece77d67066))
* add anchor tags to rendering function ([8e1fd4c](https://github.com/dictyBase/dicty-components-page-editor/commit/8e1fd4cd29271d36b8138a01a5b6f411fe07c278))
* add autolinks for various ids, fixes [#587](https://github.com/dictyBase/dicty-components-page-editor/issues/587) ([6c2b0ce](https://github.com/dictyBase/dicty-components-page-editor/commit/6c2b0ce15de5f387eb9ac4196f1a574d2dde79bc))
* add block buttons for h1, h2 ([e3cdefc](https://github.com/dictyBase/dicty-components-page-editor/commit/e3cdefc692444fbda530d72bbe2ed04910113c86))
* add border color icon ([771a2e8](https://github.com/dictyBase/dicty-components-page-editor/commit/771a2e8d2127f9925fa06aaca76ac829d68579fd))
* add buttons for indents [#791](https://github.com/dictyBase/dicty-components-page-editor/issues/791) ([3660c6f](https://github.com/dictyBase/dicty-components-page-editor/commit/3660c6f1e28e3594c71044cf8c8c36e6674d0408))
* add check for old data format ([bf521fa](https://github.com/dictyBase/dicty-components-page-editor/commit/bf521fa52692e796988c41674c90fbec4074aaac))
* add check icon to indicate current line spacing of selection ([0f62b36](https://github.com/dictyBase/dicty-components-page-editor/commit/0f62b36e8bd1ad871bbe4754b56e938cb307cb3f))
* add custom components for svg icons ([45d6afc](https://github.com/dictyBase/dicty-components-page-editor/commit/45d6afcb4b29d50f37a033ea43c054ec2ab4d87a))
* add custom link dialog ([ce3469d](https://github.com/dictyBase/dicty-components-page-editor/commit/ce3469d7c7acfec9b1ba1cab8ef112a382488d25))
* add custom video component ([63f2400](https://github.com/dictyBase/dicty-components-page-editor/commit/63f2400ab3310a9f4f573e404b343e7953a5f581))
* add data migration script ([0072cf2](https://github.com/dictyBase/dicty-components-page-editor/commit/0072cf29652531b9359b00fbd2c179dda4149925))
* add default fontcolor value ([79d3f59](https://github.com/dictyBase/dicty-components-page-editor/commit/79d3f59ffb2a71af785f8477b841c60a4cf29829))
* add default roboto font ([5d0277f](https://github.com/dictyBase/dicty-components-page-editor/commit/5d0277f4327ceedfb95b87120cd598e20237a34c))
* add divider button [#737](https://github.com/dictyBase/dicty-components-page-editor/issues/737) ([668f7f4](https://github.com/dictyBase/dicty-components-page-editor/commit/668f7f4bac45dbcc771cc5986e2ba9a6fc957715))
* add font color picker ([00348a8](https://github.com/dictyBase/dicty-components-page-editor/commit/00348a86074737b0e963feb119a9e307e53f78e1))
* add font family dropdown to toolbar ([a7c8b84](https://github.com/dictyBase/dicty-components-page-editor/commit/a7c8b8410b4a08a9bd65e397186dcfbd48453086))
* add font imports ([29cdb41](https://github.com/dictyBase/dicty-components-page-editor/commit/29cdb413cb0f3b886e72875e476b93a654e43219))
* add font size dropdown [#737](https://github.com/dictyBase/dicty-components-page-editor/issues/737) ([07ef724](https://github.com/dictyBase/dicty-components-page-editor/commit/07ef724ec12f06b72e14f951565e2b69c6747875))
* add fontColor attribute to links ([350d570](https://github.com/dictyBase/dicty-components-page-editor/commit/350d570c10eae2396a4217ac731fefbc9ba09129))
* add h3 button ([a5cae9a](https://github.com/dictyBase/dicty-components-page-editor/commit/a5cae9a82bc1e15b7433cfe08e4d23d916d80d87))
* add helper functions for getting video ids ([f042d97](https://github.com/dictyBase/dicty-components-page-editor/commit/f042d978f963e52cba7f8b89b208e05c94ef2444))
* add html deserialization, fixes [#795](https://github.com/dictyBase/dicty-components-page-editor/issues/795) ([c841d9d](https://github.com/dictyBase/dicty-components-page-editor/commit/c841d9de936ad795f7522a47eac32d63b69867d9))
* add image button and dialog ([78980fa](https://github.com/dictyBase/dicty-components-page-editor/commit/78980fa0dc8f8b05cbda95ff88b48fc956c6ecc2))
* add image icon to toolbar ([241ad4d](https://github.com/dictyBase/dicty-components-page-editor/commit/241ad4d92ba0797dba105f75261142d43521d564))
* add initial logic for changing border color ([b09d52f](https://github.com/dictyBase/dicty-components-page-editor/commit/b09d52f02fd09da108d7742d029abb52be536a1b))
* add initial logic for table insertion ([00f65c3](https://github.com/dictyBase/dicty-components-page-editor/commit/00f65c3d742335546c62345ea4b22a9e82ce4a5d))
* add line spacing dropdown ([5a41018](https://github.com/dictyBase/dicty-components-page-editor/commit/5a4101879145cbefa2b6e577d54f161212f15a13))
* add line spacing icon to toolbar ([614573f](https://github.com/dictyBase/dicty-components-page-editor/commit/614573f1610fee95e75f61a8b7f18b032f2ae772))
* add link button to toolbar ([5019337](https://github.com/dictyBase/dicty-components-page-editor/commit/501933799976a6a1088a46148f558c77742e0b7a))
* add list icons to toolbar [#791](https://github.com/dictyBase/dicty-components-page-editor/issues/791) ([8d7c9df](https://github.com/dictyBase/dicty-components-page-editor/commit/8d7c9df58560dcf2b297d0ab0853405af639e6d0))
* add logic for adding lists [#791](https://github.com/dictyBase/dicty-components-page-editor/issues/791) ([326f9fe](https://github.com/dictyBase/dicty-components-page-editor/commit/326f9fe8cdd78a6fbd8503f68b299d056518f227))
* add logic for alignment ([13180f8](https://github.com/dictyBase/dicty-components-page-editor/commit/13180f8fcf4c405374b124d2c536174afd421fc0))
* add logic for deleting table ([ce7dbe7](https://github.com/dictyBase/dicty-components-page-editor/commit/ce7dbe7fca754485cc8b951fb6811cc050e34814))
* add logic for deleting table rows/columns ([e5fbd63](https://github.com/dictyBase/dicty-components-page-editor/commit/e5fbd63855ee99fb7b50ec782a36bcaa2bb61ac8))
* add logic for embedding standard urls ([5479983](https://github.com/dictyBase/dicty-components-page-editor/commit/5479983ff169b0bc68fbe44c8827eda5c4bdfc32))
* add logic for indenting ([3ba530c](https://github.com/dictyBase/dicty-components-page-editor/commit/3ba530c2112f7a67afc3cbf2176968889badb7e9))
* add logic for inserting new table row ([69a0ab8](https://github.com/dictyBase/dicty-components-page-editor/commit/69a0ab8ecc733347e967fa4a661d6e6e86537d23))
* add logic for inserting table columns ([4178e16](https://github.com/dictyBase/dicty-components-page-editor/commit/4178e16a0f13f0ac105ebe9431a9ea46836ddc0a))
* add logic for list indents ([ea243ab](https://github.com/dictyBase/dicty-components-page-editor/commit/ea243ab928dde27499ff82dd5bb32eee8b70a949))
* add logic for setting font family ([62c0564](https://github.com/dictyBase/dicty-components-page-editor/commit/62c05642fc71942c118716a9d74882b9c5f20c49))
* add logic for text alignment (wip) ([a79e9cf](https://github.com/dictyBase/dicty-components-page-editor/commit/a79e9cfdb6a95d1db4b0fdca539be7004da97bb2))
* add logic for using backspace inside lists ([353bd88](https://github.com/dictyBase/dicty-components-page-editor/commit/353bd883a85575b91a8095e1a7f6a9771006c2dd))
* add logic outline for list keydowns ([eddbae4](https://github.com/dictyBase/dicty-components-page-editor/commit/eddbae49302f14826d907e57dbe84b180a2dc4a8))
* add mui appbar and toolbar components ([34de4a6](https://github.com/dictyBase/dicty-components-page-editor/commit/34de4a6aa66fdbeae0db4aef118f9424d4c77501))
* add option to display condensed toolbar ([6d95707](https://github.com/dictyBase/dicty-components-page-editor/commit/6d95707bbd03370fb95d53341148cb8e72c45efd))
* add option to make images links [#741](https://github.com/dictyBase/dicty-components-page-editor/issues/741) ([6178f68](https://github.com/dictyBase/dicty-components-page-editor/commit/6178f68effd232d67c7e90e6fba1f85c86c3c62a))
* add padding to toolbar ([702ee66](https://github.com/dictyBase/dicty-components-page-editor/commit/702ee661bb7009e3c0b051aa9cb24eb93a8d85ab))
* add paragraph node after images ([b4ec021](https://github.com/dictyBase/dicty-components-page-editor/commit/b4ec0213905527f3446458205cad5bbc5f2d66a5))
* add plugin for images ([57c048b](https://github.com/dictyBase/dicty-components-page-editor/commit/57c048bb646179d04348943a05daa54f193c8e56))
* add plugin for lists ([7e85da7](https://github.com/dictyBase/dicty-components-page-editor/commit/7e85da7f8e7b10cd75b00d15c4ea339bc0fbd6b8))
* add plugin to add paragraph after every divider, fixes [#641](https://github.com/dictyBase/dicty-components-page-editor/issues/641) ([b52cf47](https://github.com/dictyBase/dicty-components-page-editor/commit/b52cf47b641ed71dd00e453b97e7baaa690b71a2))
* add plugin to make links inline ([6436761](https://github.com/dictyBase/dicty-components-page-editor/commit/643676166f6211c8717072b86e186fa987e84554))
* add preset colors and stylize input ([1ae62e6](https://github.com/dictyBase/dicty-components-page-editor/commit/1ae62e61f299a1f5626df2c50b094125a16a1c95))
* add props and save/cancel buttons, fixes [#850](https://github.com/dictyBase/dicty-components-page-editor/issues/850) ([3d23152](https://github.com/dictyBase/dicty-components-page-editor/commit/3d23152f07210236230bc3dd07cda5d9ba565fdc))
* add rough version of link dialog ([6f30144](https://github.com/dictyBase/dicty-components-page-editor/commit/6f301449663f91d671de73656d1c0c2e3fd0e043))
* add scientific symbols, fixes [#4](https://github.com/dictyBase/dicty-components-page-editor/issues/4) ([4164896](https://github.com/dictyBase/dicty-components-page-editor/commit/41648968ed90206aee67193fd16c4bd5c0816642))
* add slate-history plugin for undo/redo functionality ([3dddbac](https://github.com/dictyBase/dicty-components-page-editor/commit/3dddbac21c76110bae18728ccfa0ce617c785725))
* add spellcheck and autofocus props to editable component ([3565464](https://github.com/dictyBase/dicty-components-page-editor/commit/3565464493e4620dd840bcebd75814d1a8c233b6))
* add strikethrough button ([286aee9](https://github.com/dictyBase/dicty-components-page-editor/commit/286aee9d395df494fc53665e99a45634ac817c03))
* add superscript button ([c99865e](https://github.com/dictyBase/dicty-components-page-editor/commit/c99865ea2737105166cb7323379a6c4aaf043bcc))
* add table icons to toolbar ([44165c1](https://github.com/dictyBase/dicty-components-page-editor/commit/44165c1ff2733e9f821cb8242899e247fb9a64c4))
* add toggle of table buttons ([67c800a](https://github.com/dictyBase/dicty-components-page-editor/commit/67c800a90a03b2f84093818193adc44b61c60c15))
* add toolbar with bold button ([3c79b77](https://github.com/dictyBase/dicty-components-page-editor/commit/3c79b7794987aab649ca7b6ee4b0d070734a374e))
* add tooltips to buttons ([c91b16b](https://github.com/dictyBase/dicty-components-page-editor/commit/c91b16b4ffd9eb1a2a35af4ba8f8c3ccbdfb5b08))
* add video embed button ([cc615d9](https://github.com/dictyBase/dicty-components-page-editor/commit/cc615d9e4464813d60e4e5ce526a518799dc4a10))
* change display of buttons if active ([9e47149](https://github.com/dictyBase/dicty-components-page-editor/commit/9e471495e4ce23bf97c58fe4707a1ab2c0dcbc77))
* extend custom editor with react editor ([aeb6c0e](https://github.com/dictyBase/dicty-components-page-editor/commit/aeb6c0ed3357449d7b6e360a17ceb57c0209b675))
* make toolbar sticky ([b69c238](https://github.com/dictyBase/dicty-components-page-editor/commit/b69c238beb89adf39dd8d4447fe17164dc0f99d3))
* use real icons for header buttons ([f59b10b](https://github.com/dictyBase/dicty-components-page-editor/commit/f59b10bff76c2a1b24a9a345832f4146aa04d762))
* wipe existing editor, replace with tsdx ([67dd485](https://github.com/dictyBase/dicty-components-page-editor/commit/67dd48503ccfb6d89f945e9a99eec385708a8b3e))

# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).  
Every release is documented on the GitHub [Releases](https://github.com/dictyBase/dicty-components-page-editor/releases) page.
