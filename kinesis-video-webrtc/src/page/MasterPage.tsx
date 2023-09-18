import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { PeerType } from '../model/PeerDTO';
import { MasterLiveService } from '../service/MasterLiveService'




const svc = new MasterLiveService();

export default function MasterPage() {



    const [client, setClient] = useState<SignalingClient>()

    const [remotePeers, setRemotePeers] = useState<PeerType[]>([])

    useEffect(() => {

        client?.on("open", () => {
            console.log("opened")
        })

        client?.on('sdpOffer', async (offer, remoteClientId) => {
            console.log('[MASTER] Received SDP offer from client: ' + remoteClientId);






            const peerConnection = new RTCPeerConnection(svc.iceConfig);

            const r = _.cloneDeep(remotePeers);
            r.push({
                remoteClientId,
                peerConnection
            });
            setRemotePeers(r);




            peerConnection.addEventListener('icecandidate', ({ candidate }) => {
                if (candidate) {
                    console.log('[MASTER] Generated ICE candidate for client: ' + remoteClientId);
                    client.sendIceCandidate(candidate, remoteClientId);
                }
            });

            if (svc.stream) {
                svc.stream.getTracks().forEach(track => peerConnection.addTrack(track, svc.stream!))
            }


            await peerConnection.setRemoteDescription(offer);


            // Create an SDP answer to send back to the client
            console.log('[MASTER] Creating SDP answer for client: ' + remoteClientId);
            await peerConnection.setLocalDescription(
                await peerConnection.createAnswer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                }),
            );

            console.log('[MASTER] Sending SDP answer to client: ' + remoteClientId);
            client.sendSdpAnswer(peerConnection.localDescription!, remoteClientId);
            console.log('[MASTER] Generating ICE candidates for client: ' + remoteClientId);


        })

        client?.on('iceCandidate', async (candidate, remoteClientId) => {
            console.log('[MASTER] Received ICE candidate from client: ' + remoteClientId);

            const r = _.cloneDeep(remotePeers),
                f = r.filter((val) => val.remoteClientId === remoteClientId)

            if (f.length > 0) {
                const peerConnection = f[0].peerConnection
                peerConnection.addIceCandidate(candidate);
            }



        });


        return () => {
            console.log("closed")
            client?.close()
        }
    }, [client])






    return (
        <div>


            <h2>
                MasterPage
            </h2>

            <div>
                <button onClick={() => svc.startStream(setClient, "arn:aws:kinesisvideo:ap-northeast-2:595026673882:channel/red-test/1655465857647")}>start</button>
            </div>


            <video
                width={500}
                autoPlay
                id='master'
            />


        </div>
    )
}
