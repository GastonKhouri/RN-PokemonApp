import ImageColors from 'react-native-image-colors';

export const getBackgroundColor = async ( uri: string ): Promise<string> => {

    const result = await ImageColors.getColors( uri, {
        fallback: 'grey',
    } );

    let color = 'grey';

    switch ( result.platform ) {
        case 'android':
            // android result properties
            color = result.dominant || 'grey';
            break;
        case 'ios':
            // iOS result properties
            color = result.background;
            break;
        default:
            throw new Error( 'Unexpected platform key' );
    }

    return color;

};