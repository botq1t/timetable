import { colorSchemeArray, setColorScheme } from './modules/colorSchemes.js';


if (settings.colorSchemeDarkBegin > settings.colorSchemeDarkEnd) {
	if (timeInSeconds >= settings.colorSchemeDarkBegin || timeInSeconds < settings.colorSchemeDarkEnd) {
		setColorScheme(settings['colorSchemeDark']);
	} else {
		setColorScheme(settings['colorScheme']);
	}
} else {
	if (timeInSeconds < settings.colorSchemeDarkEnd && timeInSeconds >= settings.colorSchemeDarkBegin) {
		setColorScheme(settings['colorSchemeDark']);
	} else {
		setColorScheme(settings['colorScheme']);
	}
}

