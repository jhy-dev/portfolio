import { SignalingClient } from "amazon-kinesis-video-streams-webrtc";
import { Role } from "amazon-kinesis-video-streams-webrtc/lib/Role";
import * as AWS from "aws-sdk";
import { accessKeyId, secretAccessKey } from "../config/secrets";
import { EndPointType } from "../model/PeerDTO";
import { v4 as uuidv4 } from 'uuid'

export class LiveBase {

    private videoClient: AWS.KinesisVideo;
    private iceServers: RTCIceServer[];
    protected signalingClient?: SignalingClient;
    private _iceConfig?: RTCConfiguration | undefined;
    private _stream?: MediaStream | undefined;


    public get stream(): MediaStream | undefined {
        return this._stream;
    }
    public set stream(value: MediaStream | undefined) {
        this._stream = value;
    }
    public get iceConfig(): RTCConfiguration | undefined {
        return this._iceConfig;
    }
    public set iceConfig(value: RTCConfiguration | undefined) {
        this._iceConfig = value;
    }

    constructor() {
        this.iceServers = [];
        this.videoClient = new AWS.KinesisVideo({
            region: "ap-northeast-2",
            accessKeyId,
            secretAccessKey,
            correctClockSkew: true,
        });
    }

    protected async fetchSignalingClient(role: Role, channelARN: string) {

        const getSignalingChannelEndpointResponse = await this.videoClient
            .getSignalingChannelEndpoint({
                ChannelARN: channelARN,
                SingleMasterChannelEndpointConfiguration: {
                    Protocols: ['WSS', 'HTTPS'],
                    Role: role,
                },
            })
            .promise();

        const endpointsByProtocol = getSignalingChannelEndpointResponse!.ResourceEndpointList!.reduce((endpoints, endpoint) => {
            const protocol = endpoint.Protocol as "Protocol" | "ResourceEndpoint"
            endpoints[protocol] = endpoint.ResourceEndpoint;
            return endpoints;
        }, {});

        const channelEndpoint = endpointsByProtocol as EndPointType;

        // console.log(channelEndpoint)

        this.signalingClient = new SignalingClient({
            channelARN,
            channelEndpoint: channelEndpoint.WSS,
            role,
            region: "ap-northeast-2",
            clientId: role === Role.VIEWER ? uuidv4() : undefined,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            systemClockOffset: this.videoClient.config.systemClockOffset
        });


        await this.gatherIceServers(channelEndpoint.HTTPS, channelARN)


    }

    private async gatherIceServers(endpoint: string, channelARN: string) {
        const signalingChannels = new AWS.KinesisVideoSignalingChannels({
            endpoint,
            correctClockSkew: true,
            apiVersion: "2019-12-04",
            region: "ap-northeast-2",
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        })
        const getIceServerConfigResponse = await signalingChannels.getIceServerConfig({ ChannelARN: channelARN }).promise()
        this.iceServers.push({ urls: `stun:stun.kinesisvideo.ap-northeast-2.amazonaws.com:443` });
        getIceServerConfigResponse.IceServerList?.forEach((iceServer) =>
            this.iceServers.push({
                urls: iceServer.Uris as string[],
                username: iceServer.Username,
                credential: iceServer.Password,
            })
        )

        const config: RTCConfiguration = {
            iceServers: this.iceServers,
            iceTransportPolicy: "all"
        }
        this.iceConfig = config;
    }

    // public async close() {
    //     this.signalingClient?.close();
    // }

}