import { mode } from '@chakra-ui/theme-tools';
export const sliderStyles = {
	components: {
		RangeSlider: {
			variants: {
				main: (props: any) => ({
					thumb: {
						bg: mode('tesl', 'brand.400')(props)
					}
				})
			}
		}
	}
};
