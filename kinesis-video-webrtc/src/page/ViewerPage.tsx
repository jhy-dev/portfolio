import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
import React, { useEffect, useState } from 'react'
import { ViewerLiveService } from '../service/ViewerLiveService';

const svc = new ViewerLiveService();

export default function ViewerPage() {

    const [client, setClient] = useState<SignalingClient>()



    useEffect(() => {



        client?.on("open", async () => {

            console.log('[VIEWER] Creating SDP offer');
            svc.peerConnection = new RTCPeerConnection(svc.iceConfig);



            await svc.peerConnection.setLocalDescription(
                await svc.peerConnection.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                }),
            );



            client.sendSdpOffer(svc.peerConnection.localDescription!);



            svc.peerConnection?.addEventListener('track', event => {
                console.log('[VIEWER] Received remote track');
                svc.addTrack(event);
            });

            // Send any ICE candidates to the other peer
            svc.peerConnection?.addEventListener('icecandidate', ({ candidate }) => {
                if (candidate) {
                    console.log('[VIEWER] Generated ICE candidate');

                    // When trickle ICE is enabled, send the ICE candidates as they are generated.
                    client?.sendIceCandidate(candidate);
                }


            });

            console.log('[VIEWER] Generating ICE candidates');
        })

        client?.on('sdpAnswer', async (answer) => {
            // Add the SDP answer to the peer connection
            console.log('[VIEWER] Received SDP answer');
            await svc.peerConnection?.setRemoteDescription(answer);


        });

        client?.on('iceCandidate', async (candidate) => {
            // Add the ICE candidate received from the MASTER to the peer connection
            console.log('[VIEWER] Received ICE candidate');
            svc.peerConnection?.addIceCandidate(candidate);


        });


        return () => {
            console.log("closed")
            client?.close()
        }






    }, [client])




    return (
        <div>

            <h2>
                ViewerPage
            </h2>


            <button onClick={() =>
                svc.viewStreaming(setClient, "arn:aws:kinesisvideo:ap-northeast-2:595026673882:channel/red-test/1655465857647")
            }>click</button>

            <video
                width={500}
                autoPlay
                id='viewer'
            />

        </div>
    )
}





