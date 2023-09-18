export type EndPointType = AWS.KinesisVideo.ResourceEndpointListItem & { WSS: string, HTTPS: string }

export type PeerType = {
    remoteClientId: string;
    peerConnection: RTCPeerConnection
}