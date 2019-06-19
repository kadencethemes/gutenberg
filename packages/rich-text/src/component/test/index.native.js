/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import { RichText } from '../index';
import styles from '../../../../block-editor/src/components/rich-text/style.scss';

describe( 'RichText Native', () => {
	describe( 'willTrimSpaces', () => {
		const richText = shallow(
			<RichText
				styles={ styles }
				multiline={ false }
				formatTypes={ [] }
			/>
		).instance();

		it( 'exists', () => {
			expect( richText ).toHaveProperty( 'willTrimSpaces' );
		} );

		it( 'is a function', () => {
			expect( richText.willTrimSpaces ).toBeInstanceOf( Function );
		} );

		it( 'reports false for styled text with no outer spaces', () => {
			const html = '<p><b>Hello</b> <strong>Hello</strong> WorldWorld!</p>';
			expect( richText.willTrimSpaces( html ) ).toBe( false );
		} );
	} );

	describe( 'Adds new line on Enter', () => {
		let newValue;
		const wrapper = shallow( <RichText
			styles={ styles }
			rootTagsToEliminate={ [ 'p' ] }
			value=""
			onChange={ ( value ) => {
				newValue = value;
			} }
			formatTypes={ [] }
			onSelectionChange={ jest.fn() }
		/> );

		const event = {
			nativeEvent: {
				eventCount: 0,
			},
		};
		wrapper.instance().onEnter( event );

		it( ' Adds <br> tag to content after pressing Enter key', () => {
			expect( newValue ).toEqual( '<br>' );
		} );
	} );
} );
