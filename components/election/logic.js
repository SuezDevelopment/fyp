import * as React from "react";

const onPressItem = (id, currentUser) => {
    if (isEditting) {
      setIdEditting(null);
      setValue('');
    } else {
      setIdEditting(id);
      setValue(currentName);
    }
};

const increseVote = id => {
    socket.emit('vote', id);
};

const addAndStopVote = id => {
    socket.on('vote', res => {
        let respVote = [];

    })
}

