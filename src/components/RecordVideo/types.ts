export type Constraints = {
    audio: MediaTrackConstraints | boolean,
    video: {
        width: ConstrainULong,
        height: ConstrainULong,
        frameRate: ConstrainULong
    }
}