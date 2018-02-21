function getVideos() {
    $.getJSON('https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&type=video&channelId=UC162cva-ksAoMiFVYn8rMig&maxResults=20&key=AIzaSyDp2jDlMFip_iwONxqESbWGuElsx9mEQnI', function(data) {
        var items = data.items;
        var ids = [];
        items.forEach(element => {
            ids.push(element.id.videoId);
        });
        placeVideos(ids);
    })
}

function placeVideos(ids) {
    ids.forEach(element => {
        $( "#youtube-videos" ).append( '<div class="col-lg-4 col-sm-6"><iframe width="650" height="350"src="https://www.youtube.com/embed/' + element + '"></iframe></div>' );
    });
}