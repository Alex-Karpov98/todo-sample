const _colorSet = {
  mainColor: '#1c212d',
  darkColor: '#161923',
  whiteColor: 'white',
};

const _fontSet = {
  large: 25,
  middle: 20,
  normal: 15,
  small: 13,
};

const _iconSizeSet = {
  large: 35,
  normal: 26,
  small: 20,
};

const _styleSet = {
  menuButton: {
    marginLeft: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: _colorSet.whiteColor,
  },
  rightNavButton: {
    marginRight: 20,
    color: _colorSet.whiteColor
  },
};

const StyleDict = {
  colorSet: _colorSet,
  fontSet: _fontSet,
  iconSizeSet: _iconSizeSet,
  styleSet: _styleSet,
};

export default StyleDict;