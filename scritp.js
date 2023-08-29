const form = document.forms[ 0 ];
form.onsubmit = ( e ) => {

    e.preventDefault()

    const value = document.querySelector( '#link' ).value
    const options = document.querySelector( '#options' )
    let iframeLink;

    if ( options.value == 'playlist' ) {
        iframeLink = convertPlayList( value )
    } else if ( options.value == 'url' ) {
        iframeLink = convertUrl( value )
    }

    if ( iframeLink == 'error' ) {
        alert( 'please enter valid link' )
    } else {
        const convertedElement = document.querySelector( '.converted-link' )
        convertedElement.innerText = `${ iframeLink }`
        convertedElement.href = `${ iframeLink }`
        document.querySelector( '.iframe-container' ).innerHTML = `
    <iframe height="200px" src="${ iframeLink }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen" ></iframe>
    `
    }
}

function convertPlayList ( url ) {
    //convert youtube playlist share link to youtube iframe embed link
    // Check if the input is a valid YouTube playlist share link
    const regex = /youtube\.com\/playlist\?list=([\w-]+)/;
    const match = url.match( regex );

    if ( match ) {
        const playlistId = match[ 1 ];
        const embedCode = `https://www.youtube.com/embed/videoseries?list=${ playlistId }`;
        return embedCode
    } else {
        return "error"
    }
}


//convert youtube url to youtube iframe embed link (note : not share link )
// Function to extract the video ID from a YouTube URL
function getYouTubeVideoId ( url ) {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([^&\n?#]+)/
    const match = url.match( regex );
    return ( match && match[ 1 ] ) || null;
}


// Function to generate the iframe code
function convertUrl ( videoUrl ) {
    const videoId = getYouTubeVideoId( videoUrl );
    if ( videoId ) {
        const iframeCode = `https://www.youtube.com/embed/${ videoId }`;
        return iframeCode;
    } else {
        return "error"
    }
}
