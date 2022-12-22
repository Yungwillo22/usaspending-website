/**
 * VideoThumbnail.jsx
 * Created by Andrea Blackwell 12/21/22
 */

import React from "react";
import PropTypes from "prop-types";
import PlayButton from "./PlayButton";
import Duration from "./Duration";

const propTypes = {
    showPlay: PropTypes.bool,
    showDuration: PropTypes.bool,
    thumbnailUrl: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.string
};

const VideoThumbnail = ({
    showPlay, showDuration, thumbnailUrl, title, duration
}) => (
    <>
        <img src={thumbnailUrl} alt={title} />
        {showPlay && <PlayButton />}
        {showDuration && <Duration duration={duration} />}
    </>
);

VideoThumbnail.propTypes = propTypes;

export default VideoThumbnail;