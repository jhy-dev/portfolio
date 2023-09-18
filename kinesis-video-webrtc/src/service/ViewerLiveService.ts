



import { Role, SignalingClient } from "amazon-kinesis-video-streams-webrtc";
import { LiveBase } from "./LiveBase";

export class ViewerLiveService extends LiveBase {

    private _peerConnection?: RTCPeerConnection | undefined;

    public get peerConnection(): RTCPeerConnection | undefined {
        return this._peerConnection;
    }
    public set peerConnection(value: RTCPeerConnection | undefined) {
        this._peerConnection = value;
    }

    public async addTrack(event: RTCTrackEvent) {
        const viewer = document.getElementById('viewer') as HTMLVideoElement;
        console.log(event.streams[0])
        this.peerConnection!.addTrack(event.track)
        viewer.srcObject = event.streams[0];
    }

    public async viewStreaming(
        setClient: React.Dispatch<React.SetStateAction<SignalingClient | undefined>>,
        channelARN: string
    ) {

        try {
            this.signalingClient?.close()
            await this.fetchSignalingClient(Role.VIEWER, channelARN)

            
            setClient(this.signalingClient)
            this.signalingClient?.open();
        } catch (err) {
            alert(JSON.stringify(err))
        }
    }



}