const colorSchemes = {
	colorSchemeArray: [
		'light',
		'dark',
	],
	setColorScheme: function (mode) {
		for (let i = 0; i < colorSchemeArray.length; i++) {
			$('body').removeClass(colorSchemeArray[i]);
		}
		$('body').addClass(mode);
	},
};

export const colorSchemeArray = colorSchemes.colorSchemeArray;
export const setColorScheme = colorSchemes.setColorScheme;