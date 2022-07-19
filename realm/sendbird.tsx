


var userIds = ['John', 'Harry'];
// When 'distinct' is false
sb.GroupChannel.createChannelWithUserIds(userIds, false, NAME, COVER_IMAGE_OR_URL, DATA, function(groupChannel, error) {
    if (error) {
        // Handle error.
    }

    // A group channel of the specified users is successfully created.
    // Through the "groupChannel" parameter of the callback function,
    // you can get the group channel's data from the result object that Sendbird server has passed to the callback function.
    const channelUrl = groupChannel.url;
    ...
});