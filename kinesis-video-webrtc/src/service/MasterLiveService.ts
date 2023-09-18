import { Role, SignalingClient } from 'amazon-kinesis-video-streams-webrtc'
import { LiveBase } from './LiveBase';




export class MasterLiveService extends LiveBase {





    public async startStream(
        setClient: React.Dispatch<React.SetStateAction<SignalingClient | undefined>>,
        channelARN: string
    ) {
        try {
            await this.fetchSignalingClient(Role.MASTER, channelARN)

            const s = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: { width: 480, height: 300 }
            });
            const master = document.getElementById('master') as HTMLVideoElement;
            master.srcObject = s;
            this.stream = s;
            setClient(this.signalingClient)
            this.signalingClient?.open();
        } catch (err) {
            alert(JSON.stringify(err))
        }
    }

}